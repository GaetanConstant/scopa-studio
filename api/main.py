"""API de l'intranet locataires de SCOPA Studio.

Deux ressources : les reservations de salles et les fiches de l'annuaire.
Le stockage est un fichier SQLite — mono-fichier, sauvegardable par un simple
`cp`, et suffisant pour la dizaine de locataires du studio.

L'authentification repose sur un mot de passe commun a tout le studio : il ouvre
la porte mais ne dit pas qui entre. Le prenom annonce par le client n'est donc
pas une identite verifiee, seulement une convention entre gens qui se croisent
tous les jours.
"""

from __future__ import annotations

import base64
import hashlib
import hmac
import json
import logging
import os
import sqlite3
import time
import uuid
from contextlib import asynccontextmanager
from pathlib import Path
from typing import Annotated, Any, Iterator

from fastapi import Depends, FastAPI, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel, Field, field_validator

logger = logging.getLogger("scopa-studio-api")

# ---------------------------------------------------------------- configuration

MOT_DE_PASSE: str = os.environ.get("STUDIO_MOT_DE_PASSE", "studio2026")
# En production, poser STUDIO_SECRET : sans lui, les jetons deja emis sont
# invalides a chaque redemarrage, ce qui deconnecte tout le monde.
SECRET: bytes = os.environ.get("STUDIO_SECRET", uuid.uuid4().hex).encode()
DUREE_JETON: int = 12 * 3600  # une journee de travail

CHEMIN_DB: Path = Path(
    os.environ.get("STUDIO_DB", Path(__file__).parent / "data" / "intranet.db")
)

ORIGINES: list[str] = os.environ.get(
    "STUDIO_ORIGINES",
    "https://studio.scopa.co,http://localhost:5199,http://localhost:5173",
).split(",")

OUVERTURE: float = 8.0
FERMETURE: float = 20.0

# ------------------------------------------------------------------- stockage


def connexion() -> sqlite3.Connection:
    cx = sqlite3.connect(CHEMIN_DB, isolation_level=None)
    cx.row_factory = sqlite3.Row
    # WAL : plusieurs lecteurs simultanes pendant qu'un seul ecrit. C'est ce qui
    # permet a tout le studio de consulter le planning sans se bloquer.
    cx.execute("PRAGMA journal_mode = WAL")
    cx.execute("PRAGMA busy_timeout = 5000")
    cx.execute("PRAGMA foreign_keys = ON")
    return cx


def base() -> Iterator[sqlite3.Connection]:
    cx = connexion()
    try:
        yield cx
    finally:
        cx.close()


Base = Annotated[sqlite3.Connection, Depends(base)]


def initialiser() -> None:
    CHEMIN_DB.parent.mkdir(parents=True, exist_ok=True)
    with connexion() as cx:
        cx.executescript(
            """
            CREATE TABLE IF NOT EXISTS reservations (
                id     TEXT PRIMARY KEY,
                salle  TEXT NOT NULL,
                date   TEXT NOT NULL,
                debut  REAL NOT NULL,
                fin    REAL NOT NULL,
                qui    TEXT NOT NULL,
                objet  TEXT NOT NULL DEFAULT '',
                cree_a TEXT NOT NULL DEFAULT (datetime('now'))
            );

            CREATE INDEX IF NOT EXISTS idx_reservations_jour
                ON reservations (date, salle);

            CREATE TABLE IF NOT EXISTS fiches (
                nom       TEXT PRIMARY KEY,
                fonction  TEXT NOT NULL DEFAULT '',
                tel       TEXT NOT NULL DEFAULT '',
                email     TEXT NOT NULL DEFAULT '',
                modifie_a TEXT NOT NULL DEFAULT (datetime('now'))
            );
            """
        )
        # Reservation existante reprise du planning papier. On ne l'insere qu'a
        # la toute premiere initialisation, pour ne pas la faire reapparaitre
        # apres une annulation.
        vide = cx.execute("SELECT COUNT(*) FROM reservations").fetchone()[0] == 0
        if vide:
            cx.execute(
                "INSERT INTO reservations (id, salle, date, debut, fin, qui, objet)"
                " VALUES (?, 'reunion', '2026-09-16', 15.0, 16.5, 'isabel', '')",
                (uuid.uuid4().hex,),
            )
            logger.info("Réservation initiale insérée (isabel, 16/09/2026).")
        # Fiches initiales : versionnées dans le repo, chargées au démarrage.
        # On ne les insère que si la table est vide, pour ne pas écraser les
        # modifs des locataires.
        fiches_vides = cx.execute("SELECT COUNT(*) FROM fiches").fetchone()[0] == 0
        if fiches_vides:
            chemin_fiches = Path(__file__).parent / "fiches_initiales.json"
            if chemin_fiches.exists():
                fiches = json.loads(chemin_fiches.read_text())
                for nom, data in fiches.items():
                    cx.execute(
                        "INSERT INTO fiches (nom, fonction, tel, email)"
                        " VALUES (?, ?, ?, ?)",
                        (nom, data["fonction"], data["tel"], data["email"]),
                    )
                logger.info("Fiches initiales chargées (%d membres).", len(fiches))
    logger.info("Base prête : %s", CHEMIN_DB)


# --------------------------------------------------------------------- jetons


def signer(charge: dict[str, Any]) -> str:
    corps = base64.urlsafe_b64encode(json.dumps(charge).encode()).rstrip(b"=")
    sceau = hmac.new(SECRET, corps, hashlib.sha256).digest()
    return f"{corps.decode()}.{base64.urlsafe_b64encode(sceau).rstrip(b'=').decode()}"


def verifier(jeton: str) -> dict[str, Any]:
    try:
        corps, sceau = jeton.split(".")
    except ValueError:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Jeton malformé.")

    attendu = base64.urlsafe_b64encode(
        hmac.new(SECRET, corps.encode(), hashlib.sha256).digest()
    ).rstrip(b"=")
    if not hmac.compare_digest(sceau.encode(), attendu):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Jeton invalide.")

    charge = json.loads(base64.urlsafe_b64decode(corps + "=" * (-len(corps) % 4)))
    if charge.get("exp", 0) < time.time():
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Session expirée.")
    return charge


schema = HTTPBearer(auto_error=False)


def authentifier(
    identifiants: Annotated[HTTPAuthorizationCredentials | None, Depends(schema)],
) -> dict[str, Any]:
    if identifiants is None:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Authentification requise.")
    return verifier(identifiants.credentials)


Session = Annotated[dict[str, Any], Depends(authentifier)]


# --------------------------------------------------------------------- modeles


class Identifiants(BaseModel):
    mot_de_passe: str


class Jeton(BaseModel):
    jeton: str


class Reservation(BaseModel):
    id: str
    salle: str
    date: str
    debut: float
    fin: float
    qui: str
    objet: str


class NouvelleReservation(BaseModel):
    salle: str = Field(min_length=1, max_length=40)
    date: str = Field(pattern=r"^\d{4}-\d{2}-\d{2}$")
    debut: float
    fin: float
    qui: str = Field(min_length=1, max_length=60)
    objet: str = Field(default="", max_length=80)

    @field_validator("fin")
    @classmethod
    def creneau_coherent(cls, fin: float, infos) -> float:
        debut = infos.data.get("debut")
        if debut is None:
            return fin
        if fin <= debut:
            raise ValueError("La fin doit être après le début.")
        if debut < OUVERTURE or fin > FERMETURE:
            raise ValueError(f"Le studio est ouvert de {OUVERTURE:.0f}h à {FERMETURE:.0f}h.")
        return fin


class Fiche(BaseModel):
    fonction: str = Field(default="", max_length=60)
    tel: str = Field(default="", max_length=20)
    email: str = Field(default="", max_length=80)

    @field_validator("email")
    @classmethod
    def email_plausible(cls, email: str) -> str:
        email = email.strip()
        if email and ("@" not in email or "." not in email.split("@")[-1]):
            raise ValueError("Cette adresse email ne semble pas valide.")
        return email


# ------------------------------------------------------------------ application


@asynccontextmanager
async def cycle_de_vie(app: FastAPI):
    initialiser()
    yield


app = FastAPI(
    title="SCOPA Studio — intranet",
    version="0.1.0",
    lifespan=cycle_de_vie,
    root_path=os.environ.get("STUDIO_ROOT_PATH", ""),
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in ORIGINES if o.strip()],
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)


@app.get("/sante")
def sante() -> dict[str, str]:
    return {"etat": "ok"}


@app.post("/auth/connexion", response_model=Jeton)
def connecter(identifiants: Identifiants) -> Jeton:
    if not hmac.compare_digest(identifiants.mot_de_passe, MOT_DE_PASSE):
        logger.warning("Tentative de connexion avec un mot de passe incorrect.")
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Mot de passe incorrect.")
    return Jeton(jeton=signer({"exp": time.time() + DUREE_JETON}))


# ---------------------------------------------------------------- reservations


@app.get("/reservations", response_model=list[Reservation])
def lister_reservations(
    _: Session,
    cx: Base,
    date: Annotated[str, Query(pattern=r"^\d{4}-\d{2}-\d{2}$")],
) -> list[Reservation]:
    lignes = cx.execute(
        "SELECT id, salle, date, debut, fin, qui, objet"
        " FROM reservations WHERE date = ? ORDER BY debut",
        (date,),
    ).fetchall()
    return [Reservation(**dict(l)) for l in lignes]


@app.post("/reservations", response_model=Reservation, status_code=status.HTTP_201_CREATED)
def creer_reservation(_: Session, cx: Base, demande: NouvelleReservation) -> Reservation:
    # Le chevauchement est verifie ici, dans la meme transaction que l'insertion :
    # c'est la seule place ou deux locataires qui cliquent en meme temps ne
    # peuvent pas reserver la meme salle.
    cx.execute("BEGIN IMMEDIATE")
    try:
        conflit = cx.execute(
            "SELECT qui, debut, fin FROM reservations"
            " WHERE salle = ? AND date = ? AND ? < fin AND ? > debut",
            (demande.salle, demande.date, demande.debut, demande.fin),
        ).fetchone()
        if conflit is not None:
            raise HTTPException(
                status.HTTP_409_CONFLICT, f"Créneau déjà pris par {conflit['qui']}."
            )

        reservation = Reservation(id=uuid.uuid4().hex, **demande.model_dump())
        cx.execute(
            "INSERT INTO reservations (id, salle, date, debut, fin, qui, objet)"
            " VALUES (:id, :salle, :date, :debut, :fin, :qui, :objet)",
            reservation.model_dump(),
        )
        cx.execute("COMMIT")
    except Exception:
        cx.execute("ROLLBACK")
        raise

    logger.info("Réservation %s : %s le %s", reservation.salle, reservation.qui, reservation.date)
    return reservation


@app.delete("/reservations/{identifiant}", status_code=status.HTTP_204_NO_CONTENT)
def supprimer_reservation(
    _: Session,
    cx: Base,
    identifiant: str,
    qui: Annotated[str, Query(min_length=1, max_length=60)],
) -> None:
    ligne = cx.execute(
        "SELECT qui FROM reservations WHERE id = ?", (identifiant,)
    ).fetchone()
    if ligne is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Réservation introuvable.")
    # Garde-fou de courtoisie : le mot de passe etant commun, le serveur ne peut
    # pas prouver qui appelle. Cela evite les annulations par megarde, pas la
    # mauvaise foi.
    if ligne["qui"] != qui:
        raise HTTPException(
            status.HTTP_403_FORBIDDEN,
            f"Cette réservation est au nom de {ligne['qui']}.",
        )
    cx.execute("DELETE FROM reservations WHERE id = ?", (identifiant,))


# ---------------------------------------------------------------------- fiches


@app.get("/fiches", response_model=dict[str, Fiche])
def lister_fiches(_: Session, cx: Base) -> dict[str, Fiche]:
    lignes = cx.execute("SELECT nom, fonction, tel, email FROM fiches").fetchall()
    return {l["nom"]: Fiche(fonction=l["fonction"], tel=l["tel"], email=l["email"]) for l in lignes}


@app.put("/fiches/{nom}", response_model=Fiche)
def enregistrer_fiche(_: Session, cx: Base, nom: str, fiche: Fiche) -> Fiche:
    cx.execute(
        "INSERT INTO fiches (nom, fonction, tel, email) VALUES (?, ?, ?, ?)"
        " ON CONFLICT(nom) DO UPDATE SET"
        " fonction = excluded.fonction, tel = excluded.tel,"
        " email = excluded.email, modifie_a = datetime('now')",
        (nom, fiche.fonction.strip(), fiche.tel.strip(), fiche.email.strip()),
    )
    return fiche
