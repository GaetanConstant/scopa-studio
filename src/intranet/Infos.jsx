import React, { useState } from 'react'
import { INFOS, AREMPLIR } from './data'

export default function Infos() {
  return (
    <section className="itr-infos">
      <p className="itr-intro">
        Tout ce qu’il faut savoir pour vivre au studio. Une information manquante ou erronée ?
        Signalez-la à <a href="mailto:studio@scopa.co">studio@scopa.co</a>.
      </p>
      <div className="itr-grille-infos">
        {INFOS.map((bloc) => (
          <article className="itr-bloc-info" key={bloc.titre}>
            <h2>{bloc.titre}</h2>
            <dl>
              {bloc.entrees.map((entree) => (
                <div key={entree.cle}>
                  <dt>{entree.cle}</dt>
                  <dd>
                    <Valeur entree={entree} />
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}

function Valeur({ entree }) {
  const { valeur, type, numero } = entree

  if (type === 'secret') return <Secret valeur={valeur} />

  if (type === 'email') {
    return <a href={`mailto:${valeur}`}>{valeur}</a>
  }

  if (type === 'tel') {
    // Sans numero renseigne, on affiche le contact sans promettre un appel qui
    // ne partirait nulle part.
    if (!numero || numero === AREMPLIR) {
      return (
        <>
          {valeur} <span className="itr-vide">— numéro {AREMPLIR}</span>
        </>
      )
    }
    return (
      <a href={`tel:${numero.replace(/\s/g, '')}`}>
        {valeur} <span className="itr-numero">{numero}</span>
      </a>
    )
  }

  return valeur === AREMPLIR ? <span className="itr-vide">{valeur}</span> : valeur
}

function Secret({ valeur }) {
  const [visible, setVisible] = useState(false)

  return (
    <button
      type="button"
      className={`itr-secret ${visible ? 'itr-secret-visible' : ''}`}
      onClick={() => setVisible((v) => !v)}
      aria-label={visible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
    >
      <span className="itr-secret-valeur">{visible ? valeur : '••••••••'}</span>
      <span className="itr-secret-action">{visible ? 'Masquer' : 'Afficher'}</span>
    </button>
  )
}
