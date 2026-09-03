import React, { useEffect, useState } from 'react'
import { SALLES, MEMBRES, OUVERTURE, FERMETURE, formaterNom } from './data'
import { listerReservations, creerReservation, supprimerReservation } from './api'

const HAUTEUR_HEURE = 56 // pixels par heure dans le planning
const DUREES = [
  [0.25, '15 min'],
  [0.5, '30 min'],
  [0.75, '45 min'],
  [1, '1 h'],
  [1.5, '1 h 30'],
  [2, '2 h'],
  [2.5, '2 h 30'],
  [3, '3 h'],
  [4, '4 h'],
]

// Le planning raisonne en heures decimales (10.75 = 10h45) ; les champs <input
// type="time"> parlent en "HH:MM". Ces deux fonctions font le pont.
const versHHMM = (h) => {
  const heures = Math.floor(h)
  const minutes = Math.round((h - heures) * 60)
  return `${String(heures).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

const depuisHHMM = (valeur) => {
  const [h, m] = valeur.split(':').map(Number)
  return h + m / 60
}

const cleDate = (d) => {
  const p = new Date(d)
  p.setMinutes(p.getMinutes() - p.getTimezoneOffset())
  return p.toISOString().slice(0, 10)
}

const libelleHeure = (h) => {
  const heures = Math.floor(h)
  const minutes = Math.round((h - heures) * 60)
  return minutes ? `${heures}h${String(minutes).padStart(2, '0')}` : `${heures}h`
}

const libelleJour = (iso) =>
  new Date(iso + 'T12:00:00').toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

export default function Reservations({ moi }) {
  const [date, setDate] = useState(() => cleDate(new Date()))
  const [reservations, setReservations] = useState([])
  const [chargement, setChargement] = useState(true)
  const [creation, setCreation] = useState(null) // { salle, debut }
  const [message, setMessage] = useState(null)
  const [version, setVersion] = useState(0)

  const rafraichir = () => setVersion((v) => v + 1)

  useEffect(() => {
    let annule = false
    // Le drapeau evite qu'une reponse lente sur un jour deja quitte vienne
    // ecraser le planning affiche.
    ;(async () => {
      setChargement(true)
      try {
        const rs = await listerReservations(date)
        if (annule) return
        setReservations(rs)
      } catch (err) {
        if (annule) return
        setReservations([])
        setMessage({ type: 'ko', texte: err.message })
      }
      if (!annule) setChargement(false)
    })()
    return () => {
      annule = true
    }
  }, [date, version])

  function decalerJour(n) {
    const d = new Date(date + 'T12:00:00')
    d.setDate(d.getDate() + n)
    setDate(cleDate(d))
  }

  const estAujourdhui = date === cleDate(new Date())
  const heures = []
  for (let h = OUVERTURE; h < FERMETURE; h++) heures.push(h)

  const libre = (salle, debut, fin) => {
    // La salle à manger n'est pas réservable de 12h à 14h (déjeuner)
    const estManger = salle === 'manger'
    const chevauche1214 = estManger && debut < 14 && fin > 12
    if (chevauche1214) return false
    return !reservations.some((r) => r.salle === salle && debut < r.fin && fin > r.debut)
  }

  async function annuler(r) {
    if (!window.confirm(`Annuler la réservation de ${libelleHeure(r.debut)} à ${libelleHeure(r.fin)} ?`)) return
    try {
      await supprimerReservation(r.id, moi)
      setMessage({ type: 'ok', texte: 'Réservation annulée.' })
    } catch (err) {
      setMessage({ type: 'ko', texte: err.message })
    }
    rafraichir()
  }

  return (
    <section className="itr-reservations">
      <header className="itr-barre-jour">
        <div className="itr-nav-jour">
          <button className="itr-btn itr-btn-icone" onClick={() => decalerJour(-1)} aria-label="Jour précédent">
            ‹
          </button>
          <div className="itr-jour-courant">
            <strong>{libelleJour(date)}</strong>
            {estAujourdhui && <span className="itr-badge-jour">Aujourd’hui</span>}
          </div>
          <button className="itr-btn itr-btn-icone" onClick={() => decalerJour(1)} aria-label="Jour suivant">
            ›
          </button>
        </div>
        <div className="itr-actions-jour">
          {!estAujourdhui && (
            <button className="itr-btn itr-btn-discret" onClick={() => setDate(cleDate(new Date()))}>
              Aujourd’hui
            </button>
          )}
          <input
            type="date"
            className="itr-date"
            value={date}
            onChange={(e) => e.target.value && setDate(e.target.value)}
            aria-label="Choisir une date"
          />
        </div>
      </header>

      {message && (
        <p className={`itr-message itr-message-${message.type}`} role="status">
          {message.texte}
          <button className="itr-fermer-message" onClick={() => setMessage(null)} aria-label="Fermer">
            ×
          </button>
        </p>
      )}

      <div className="itr-planning-defilement">
        <div className="itr-planning" style={{ '--h': `${HAUTEUR_HEURE}px` }}>
          <div className="itr-colonne-heures">
            <div className="itr-entete-colonne" />
            {heures.map((h) => (
              <div className="itr-marque-heure" key={h}>
                <span>{libelleHeure(h)}</span>
              </div>
            ))}
          </div>

          {SALLES.map((salle) => (
            <div className="itr-colonne-salle" key={salle.id}>
              <div className="itr-entete-colonne">
                <strong>{salle.nom}</strong>
                <span>{salle.capacite}</span>
              </div>
              <div className="itr-grille" style={{ height: `calc(${heures.length} * var(--h))` }}>
                {heures.map((h) => {
                  const peutReserver = libre(salle.id, h, h + 1)
                  return (
                    <button
                      key={h}
                      className={`itr-creneau-libre ${peutReserver ? '' : 'itr-creneau-bloque'}`}
                      style={{ top: `calc(${h - OUVERTURE} * var(--h))` }}
                      onClick={() => peutReserver && setCreation({ salle: salle.id, debut: h })}
                      disabled={!peutReserver}
                      aria-label={`Réserver ${salle.nom} à ${libelleHeure(h)}`}
                    >
                      <span>+ Réserver</span>
                    </button>
                  )
                })}

                {reservations
                  .filter((r) => r.salle === salle.id)
                  .map((r) => {
                    const aMoi = r.qui === moi
                    return (
                      <div
                        key={r.id}
                        className={`itr-reservation ${aMoi ? 'itr-reservation-moi' : ''}`}
                        style={{
                          top: `calc(${r.debut - OUVERTURE} * var(--h))`,
                          height: `calc(${r.fin - r.debut} * var(--h) - 4px)`,
                        }}
                      >
                        <div className="itr-reservation-corps">
                          <strong>{formaterNom(r.qui)}</strong>
                          <span className="itr-reservation-heure">
                            {libelleHeure(r.debut)} – {libelleHeure(r.fin)}
                          </span>
                          {r.objet && <span className="itr-reservation-objet">{r.objet}</span>}
                        </div>
                        {aMoi && (
                          <button
                            className="itr-annuler"
                            onClick={() => annuler(r)}
                            aria-label="Annuler ma réservation"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    )
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {chargement && <p className="itr-chargement">Chargement du planning…</p>}

      {creation && (
        <Reservation
          moi={moi}
          date={date}
          initial={creation}
          libre={libre}
          onFermer={() => setCreation(null)}
          onCree={(r) => {
            setCreation(null)
            setMessage({
              type: 'ok',
              texte: `${SALLES.find((s) => s.id === r.salle).nom} réservée de ${libelleHeure(r.debut)} à ${libelleHeure(r.fin)}.`,
            })
            rafraichir()
          }}
        />
      )}
    </section>
  )
}

function Reservation({ moi, date, initial, libre, onFermer, onCree }) {
  const [salle, setSalle] = useState(initial.salle)
  const [debut, setDebut] = useState(initial.debut)
  const [duree, setDuree] = useState(1)
  const [qui, setQui] = useState(moi)
  const [objet, setObjet] = useState('')
  const [erreur, setErreur] = useState('')
  const [envoi, setEnvoi] = useState(false)

  const fin = debut + duree
  const depasse = debut < OUVERTURE || fin > FERMETURE
  const occupe = !depasse && !libre(salle, debut, fin)

  async function soumettre(e) {
    e.preventDefault()
    setErreur('')
    setEnvoi(true)
    try {
      const r = await creerReservation({ salle, date, debut, fin, qui, objet: objet.trim() })
      onCree(r)
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
          <h2>Réserver</h2>
          <button type="button" className="itr-fermer" onClick={onFermer} aria-label="Fermer">
            ×
          </button>
        </header>

        <p className="itr-modale-date">{libelleJour(date)}</p>

        <label htmlFor="salle">Salle</label>
        <select id="salle" value={salle} onChange={(e) => setSalle(e.target.value)}>
          {SALLES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.nom} — {s.capacite}
            </option>
          ))}
        </select>

        <div className="itr-duo">
          <div>
            <label htmlFor="debut">Début</label>
            <input
              id="debut"
              type="time"
              step="900"
              min={versHHMM(OUVERTURE)}
              max={versHHMM(FERMETURE - 0.25)}
              value={versHHMM(debut)}
              onChange={(e) => e.target.value && setDebut(depuisHHMM(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="duree">Durée</label>
            <select id="duree" value={duree} onChange={(e) => setDuree(Number(e.target.value))}>
              {DUREES.map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        </div>

        <label htmlFor="pour">Pour</label>
        <select id="pour" value={qui} onChange={(e) => setQui(e.target.value)}>
          {/* Le prenom saisi a la connexion est libre : s'il n'est pas dans la
              liste du studio, on l'ajoute pour ne pas afficher un champ vide. */}
          {(MEMBRES.some((m) => m.nom === moi) ? MEMBRES : [{ nom: moi }, ...MEMBRES]).map((m) => (
            <option key={m.nom} value={m.nom}>
              {formaterNom(m.nom)}
            </option>
          ))}
        </select>

        <label htmlFor="objet">
          Objet <span className="itr-facultatif">(facultatif)</span>
        </label>
        <input
          id="objet"
          type="text"
          value={objet}
          onChange={(e) => setObjet(e.target.value)}
          placeholder="Ex. point client, entretien…"
          maxLength={80}
        />

        <p className="itr-recap">
          {depasse ? (
            <span className="itr-recap-ko">
              Le studio est ouvert de {OUVERTURE}h à {FERMETURE}h — ajustez le créneau.
            </span>
          ) : occupe ? (
            <span className="itr-recap-ko">Ce créneau chevauche une réservation existante.</span>
          ) : (
            <>
              De <strong>{libelleHeure(debut)}</strong> à <strong>{libelleHeure(fin)}</strong>
            </>
          )}
        </p>

        {erreur && (
          <p className="itr-erreur" role="alert">
            {erreur}
          </p>
        )}

        <footer>
          <button type="button" className="itr-btn itr-btn-discret" onClick={onFermer}>
            Annuler
          </button>
          <button type="submit" className="itr-btn itr-btn-primaire" disabled={envoi || depasse || occupe}>
            {envoi ? 'Enregistrement…' : 'Réserver'}
          </button>
        </footer>
      </form>
    </div>
  )
}
