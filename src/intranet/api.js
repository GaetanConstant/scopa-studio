// Couche d'acces aux donnees de l'intranet : un client de l'API FastAPI qui
// tourne devant la base SQLite (dossier api/ du depot).
//
// En local : `cd api && uv run uvicorn main:app --port 5504 --reload`
// En production, l'API sera servie sous https://plouf.scopa.co/studio-api.
// L'URL se surcharge par la variable d'environnement VITE_API_URL.

const RACINE = import.meta.env.VITE_API_URL ?? 'http://localhost:5504'
const CLE_JETON = 'scopa-intranet-jeton'

const lireJeton = () => {
  try {
    return sessionStorage.getItem(CLE_JETON)
  } catch {
    return null
  }
}

const ecrireJeton = (jeton) => {
  try {
    if (jeton === null) sessionStorage.removeItem(CLE_JETON)
    else sessionStorage.setItem(CLE_JETON, jeton)
  } catch {
    /* navigation privee : la session ne survivra pas au rechargement */
  }
}

export const oublierJeton = () => ecrireJeton(null)

async function appeler(chemin, { methode = 'GET', corps, authentifie = true } = {}) {
  const entetes = {}
  if (corps !== undefined) entetes['Content-Type'] = 'application/json'
  if (authentifie) {
    const jeton = lireJeton()
    if (!jeton) throw new Error('Session expirée. Reconnectez-vous.')
    entetes.Authorization = `Bearer ${jeton}`
  }

  let reponse
  try {
    reponse = await fetch(`${RACINE}${chemin}`, {
      method: methode,
      headers: entetes,
      body: corps === undefined ? undefined : JSON.stringify(corps),
    })
  } catch {
    // Panne reseau ou API arretee : le distinguer d'une erreur metier evite de
    // faire croire a l'utilisateur qu'il a mal rempli le formulaire.
    throw new Error('Impossible de joindre le serveur du studio.')
  }

  if (reponse.status === 401 && authentifie) {
    oublierJeton()
    throw new Error('Session expirée. Reconnectez-vous.')
  }

  if (!reponse.ok) {
    let detail = `Erreur ${reponse.status}.`
    try {
      const donnees = await reponse.json()
      if (typeof donnees.detail === 'string') detail = donnees.detail
      else if (Array.isArray(donnees.detail) && donnees.detail[0]?.msg) {
        detail = donnees.detail[0].msg.replace(/^Value error, /, '')
      }
    } catch {
      /* reponse sans corps JSON : on garde le message par defaut */
    }
    throw new Error(detail)
  }

  return reponse.status === 204 ? null : reponse.json()
}

// ---------- authentification ----------

export async function seConnecter(motDePasse) {
  const { jeton } = await appeler('/auth/connexion', {
    methode: 'POST',
    corps: { mot_de_passe: motDePasse },
    authentifie: false,
  })
  ecrireJeton(jeton)
  return { jeton }
}

// ---------- reservations ----------

export function listerReservations(date) {
  return appeler(`/reservations?date=${encodeURIComponent(date)}`)
}

export function creerReservation({ salle, date, debut, fin, qui, objet }) {
  return appeler('/reservations', {
    methode: 'POST',
    corps: { salle, date, debut, fin, qui, objet },
  })
}

export function supprimerReservation(id, qui) {
  return appeler(`/reservations/${id}?qui=${encodeURIComponent(qui)}`, { methode: 'DELETE' })
}

// ---------- annuaire ----------

export function listerFiches() {
  return appeler('/fiches')
}

export function enregistrerFiche(nom, { fonction, tel, email }) {
  return appeler(`/fiches/${encodeURIComponent(nom)}`, {
    methode: 'PUT',
    corps: { fonction, tel, email },
  })
}
