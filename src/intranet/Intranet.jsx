import React, { useState } from 'react'
import Connexion from './Connexion'
import Reservations from './Reservations'
import Annuaire from './Annuaire'
import Infos from './Infos'
import { oublierJeton } from './api'
import { formaterNom } from './data'

const CLE_SESSION = 'scopa-intranet-session'

const ONGLETS = [
  { id: 'reservations', libelle: 'Réservations' },
  { id: 'annuaire', libelle: 'Annuaire' },
  { id: 'infos', libelle: 'Infos pratiques' },
]

const lireSession = () => {
  try {
    return JSON.parse(sessionStorage.getItem(CLE_SESSION))
  } catch {
    return null
  }
}

export default function Intranet() {
  // La session ne survit pas a la fermeture de l'onglet : sur un poste partage,
  // c'est le comportement le plus sain.
  const [moi, setMoi] = useState(() => lireSession()?.moi ?? null)
  const [onglet, setOnglet] = useState('reservations')

  function connecter(qui) {
    try {
      sessionStorage.setItem(CLE_SESSION, JSON.stringify({ moi: qui }))
    } catch {
      /* navigation privee */
    }
    setMoi(qui)
  }

  function deconnecter() {
    try {
      sessionStorage.removeItem(CLE_SESSION)
    } catch {
      /* navigation privee */
    }
    oublierJeton()
    setMoi(null)
  }

  if (!moi) return <Connexion onConnecte={connecter} />

  return (
    <div className="itr">
      <header className="itr-entete">
        <div className="itr-entete-contenu">
          <div className="itr-identite">
            <a className="itr-retour" href="/">
              Scopa Studio
            </a>
            <span className="itr-separateur" aria-hidden="true">
              /
            </span>
            <span className="itr-titre">Espace locataires</span>
          </div>
          <div className="itr-session">
            <span className="itr-moi">
              Bonjour <strong>{formaterNom(moi)}</strong>
            </span>
            <button className="itr-btn itr-btn-discret" onClick={deconnecter}>
              Quitter
            </button>
          </div>
        </div>
        <nav className="itr-onglets" aria-label="Sections de l’intranet">
          {ONGLETS.map((o) => (
            <button
              key={o.id}
              className={`itr-onglet ${onglet === o.id ? 'itr-onglet-actif' : ''}`}
              aria-current={onglet === o.id ? 'page' : undefined}
              onClick={() => setOnglet(o.id)}
            >
              {o.libelle}
            </button>
          ))}
        </nav>
      </header>

      <main className="itr-contenu">
        {onglet === 'reservations' && <Reservations moi={moi} />}
        {onglet === 'annuaire' && <Annuaire moi={moi} />}
        {onglet === 'infos' && <Infos />}
      </main>

      <footer className="itr-pied">
        <p>
          SCOPA Studio — 41 rue Paul Verlaine, Villeurbanne. Une question ?{' '}
          <a href="mailto:studio@scopa.co">studio@scopa.co</a>
        </p>
      </footer>
    </div>
  )
}
