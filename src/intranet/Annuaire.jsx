import React, { useEffect, useState } from 'react'
import { MEMBRES, formaterNom, FICHES_INITIALES } from './data'
import { listerFiches, enregistrerFiche } from './api'

const initiales = (nom) =>
  nom
    .split(/[\s-]+/)
    .slice(0, 2)
    .map((m) => m[0])
    .join('')
    .toUpperCase()

const VIDE = { fonction: '', tel: '', email: '' }

export default function Annuaire({ moi }) {
  const [fiches, setFiches] = useState({})
  const [chargement, setChargement] = useState(true)
  const [edition, setEdition] = useState(false)
  const [version, setVersion] = useState(0)
  const [erreur, setErreur] = useState('')

  useEffect(() => {
    let annule = false
    ;(async () => {
      setChargement(true)
      try {
        const f = await listerFiches()
        if (annule) return
        setFiches(f)
        setErreur('')
      } catch (err) {
        if (annule) return
        setErreur(err.message)
      }
      if (!annule) setChargement(false)
    })()
    return () => {
      annule = true
    }
  }, [version])

  const maFiche = { ...VIDE, ...(FICHES_INITIALES[moi] ?? {}), ...(fiches[moi] ?? {}) }
  // Le prenom saisi a la connexion est libre : s'il ne figure pas dans la
  // liste du studio, on affiche quand meme sa carte pour qu'il puisse se
  // presenter aux autres.
  const listeAffichee = MEMBRES.some((m) => m.nom === moi)
    ? MEMBRES
    : [...MEMBRES, { nom: moi, societe: '' }]
  const complete = Boolean(maFiche.fonction || maFiche.tel || maFiche.email)

  return (
    <section className="itr-annuaire">
      <div className="itr-barre-annuaire">
        <p className="itr-intro">
          Chacun remplit sa fiche — tous les champs sont facultatifs.
        </p>
        <button className="itr-btn itr-btn-primaire" onClick={() => setEdition(true)}>
          {complete ? 'Modifier ma fiche' : 'Compléter ma fiche'}
        </button>
      </div>

      {erreur && (
        <p className="itr-message itr-message-ko" role="alert">
          {erreur}
        </p>
      )}

      {!chargement && !erreur && !complete && (
        <p className="itr-invite">
          Votre fiche est vide : ajoutez votre fonction et un moyen de vous joindre pour que les
          autres locataires puissent vous contacter.
        </p>
      )}

      <ul className="itr-grille-membres">
        {listeAffichee.map((m) => {
          const fiche = { ...VIDE, ...(FICHES_INITIALES[m.nom] ?? {}), ...(fiches[m.nom] ?? {}) }
          const estMoi = m.nom === moi
          return (
            <li className={`itr-membre ${estMoi ? 'itr-membre-moi' : ''}`} key={m.nom}>
              <span className="itr-pastille" aria-hidden="true">
                {initiales(formaterNom(m.nom))}
              </span>
              <div className="itr-membre-corps">
                <strong>
                  {formaterNom(m.nom)}
                  {m.societe && <span className="itr-societe">{m.societe}</span>}
                  {estMoi && <span className="itr-badge-moi">vous</span>}
                </strong>
                <span className={fiche.fonction ? 'itr-fonction' : 'itr-vide'}>
                  {fiche.fonction || 'Fonction non renseignée'}
                </span>
                {(fiche.tel || fiche.email) && (
                  <span className="itr-contacts">
                    {fiche.tel && <a href={`tel:${fiche.tel.replace(/\s/g, '')}`}>{fiche.tel}</a>}
                    {fiche.email && <a href={`mailto:${fiche.email}`}>{fiche.email}</a>}
                  </span>
                )}
              </div>
            </li>
          )
        })}
      </ul>

      {edition && (
        <Fiche
          moi={moi}
          initiale={maFiche}
          onFermer={() => setEdition(false)}
          onEnregistre={() => {
            setEdition(false)
            setVersion((v) => v + 1)
          }}
        />
      )}
    </section>
  )
}

function Fiche({ moi, initiale, onFermer, onEnregistre }) {
  const [fonction, setFonction] = useState(initiale.fonction)
  const [tel, setTel] = useState(initiale.tel)
  const [email, setEmail] = useState(initiale.email)
  const [erreur, setErreur] = useState('')
  const [envoi, setEnvoi] = useState(false)

  async function soumettre(e) {
    e.preventDefault()
    setErreur('')
    setEnvoi(true)
    try {
      await enregistrerFiche(moi, { fonction, tel, email })
      onEnregistre()
    } catch (err) {
      setErreur(err.message)
    } finally {
      setEnvoi(false)
    }
  }

  return (
    <div className="itr-voile" onClick={onFermer}>
      <form className="itr-modale" onClick={(e) => e.stopPropagation()} onSubmit={soumettre}>
        <header>
          <h2>Ma fiche</h2>
          <button type="button" className="itr-fermer" onClick={onFermer} aria-label="Fermer">
            ×
          </button>
        </header>

        <p className="itr-modale-date">
          Visible par les locataires qui ont le mot de passe du studio.
        </p>

        <label htmlFor="fonction">
          Fonction <span className="itr-facultatif">(facultatif)</span>
        </label>
        <input
          id="fonction"
          type="text"
          value={fonction}
          onChange={(e) => setFonction(e.target.value)}
          placeholder="Ex. graphiste indépendante"
          maxLength={60}
        />

        <label htmlFor="tel">
          Téléphone <span className="itr-facultatif">(facultatif)</span>
        </label>
        <input
          id="tel"
          type="tel"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          placeholder="06 12 34 56 78"
          maxLength={20}
        />

        <label htmlFor="email">
          Email <span className="itr-facultatif">(facultatif)</span>
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="prenom@exemple.fr"
          maxLength={80}
        />

        {erreur && (
          <p className="itr-erreur" role="alert">
            {erreur}
          </p>
        )}

        <footer>
          <button type="button" className="itr-btn itr-btn-discret" onClick={onFermer}>
            Annuler
          </button>
          <button type="submit" className="itr-btn itr-btn-primaire" disabled={envoi}>
            {envoi ? 'Enregistrement…' : 'Enregistrer'}
          </button>
        </footer>
      </form>
    </div>
  )
}
