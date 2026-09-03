# API — intranet locataires

FastAPI + SQLite. Sert les réservations de salles et les fiches de l'annuaire
de [`src/intranet/`](../src/intranet/).

## Lancer en local

```bash
cd api
uv run uvicorn main:app --port 5504 --reload
```

La base est créée au premier démarrage dans `api/data/intranet.db` (non versionnée).

## Variables d'environnement

| Variable | Défaut | Rôle |
|---|---|---|
| `STUDIO_MOT_DE_PASSE` | `studio2026` | Mot de passe commun du studio |
| `STUDIO_SECRET` | aléatoire | Clé de signature des jetons — **à fixer en production**, sinon chaque redémarrage déconnecte tout le monde |
| `STUDIO_DB` | `api/data/intranet.db` | Chemin de la base |
| `STUDIO_ORIGINES` | `studio.scopa.co` + localhost | Origines autorisées en CORS |
| `STUDIO_ROOT_PATH` | vide | Préfixe derrière le proxy (`/studio-api` en production) |

## Sauvegarde

Un seul fichier : `cp api/data/intranet.db sauvegarde.db`. En mode WAL, faire la
copie avec l'API arrêtée, ou utiliser `sqlite3 intranet.db ".backup ..."`.
