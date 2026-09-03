import React, { useState } from 'react'
import { MEMBRES, normaliserNom } from './data'
import { seConnecter } from './api'

// Le mot de passe est commun a tout le studio : il ouvre la porte mais ne dit
// pas qui entre. On demande donc le prenom dans la foulee, pour pre-remplir les
// reservations et savoir qui peut annuler quoi.
export default function Connexion({ onConnecte }) {
  const [motDePasse, setMotDePasse] = useState('')
  const [qui, setQui] = useState('')
  const [erreur, setErreur] = useState('')
  const [envoi, setEnvoi] = useState(false)

  async function soumettre(e) {
    e.preventDefault()
    const prenom = normaliserNom(qui)
    if (!prenom) {
      setErreur('Indiquez votre prénom.')
      return
    }
    setErreur('')
    setEnvoi(true)
    try {
      await seConnecter(motDePasse)
      onConnecte(prenom)
    } catch (err) {
      setErreur(err.message)
      setMotDePasse('')
    } finally {
      setEnvoi(false)
    }
  }

  return (
    <div className="itr-connexion">
      <form className="itr-carte-connexion" onSubmit={soumettre}>
        <p className="itr-surtitre">Scopa Studio</p>
        <h1>Espace locataires</h1>
        <p className="itr-intro">
          Réservez une salle, retrouvez l’annuaire du studio et les infos pratiques.
        </p>

        <label htmlFor="qui">Vous êtes</label>
        <input
          id="qui"
          type="text"
          list="itr-membres"
          value={qui}
          onChange={(e) => setQui(e.target.value)}
          placeholder="votre prénom"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck="false"
          maxLength={40}
          required
        />
        <datalist id="itr-membres">
          {MEMBRES.map((m) => (
            <option key={m.nom} value={m.nom} />
          ))}
        </datalist>

        <label htmlFor="mdp">Mot de passe du studio</label>
        <input
          id="mdp"
          type="password"
          autoComplete="current-password"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          placeholder="••••••••"
          required
        />

        {erreur && (
          <p className="itr-erreur" role="alert">
            {erreur}
          </p>
        )}

        <button type="submit" className="itr-btn itr-btn-primaire" disabled={envoi}>
          {envoi ? 'Vérification…' : 'Entrer'}
        </button>

        <p className="itr-aide">
          Mot de passe oublié ? Écrivez à <a href="mailto:studio@scopa.co">studio@scopa.co</a>.
        </p>
      </form>
    </div>
  )
}
