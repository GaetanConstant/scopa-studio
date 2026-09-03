// Contenu editorial de l'intranet. Comme pour le site vitrine, tout se modifie
// ici : on edite, on pousse sur main, c'est en ligne.

export const SALLES = [
  { id: 'reunion', nom: 'Salle de réunion', capacite: '8 personnes' },
  { id: 'manger', nom: 'Salle à manger', capacite: '8 personnes' },
  { id: 'minibox', nom: 'Bureau Minibox', capacite: '1 personne' },
]

// La societe est portee par le studio (c'est Gaetan qui ouvre et ferme les
// acces), contrairement a la fonction et aux coordonnees que chacun renseigne
// lui-meme depuis l'annuaire. Laisser `societe` vide n'affiche rien.
// Les prenoms s'ecrivent sans accent ni majuscule : ils servent d'identifiant,
// et toute saisie libre est ramenee a cette forme (voir normaliserNom) pour que
// « Gaëtan » et « gaetan » designent bien la meme personne.
export const MEMBRES = [
  { nom: 'alison', societe: 'SCOPA' },
  { nom: 'gaetan', societe: 'SCOPA' },
  { nom: 'js', societe: 'SCOPA' },
  { nom: 'orkun', societe: 'SCOPA' },
  { nom: 'isabel', societe: 'Ferest Energies' },
  { nom: 'raphael', societe: 'Ferest Energies' },
  { nom: 'nicolas', societe: 'CustomLib' },
  { nom: 'yassir', societe: 'Freelance Dev' },
  { nom: 'marianne', societe: '' },
  { nom: 'simon', societe: '' },
]

// Exceptions d'affichage : les prenoms qui ne prennent pas simplement une
// majuscule initiale (initiales, particules...).
const AFFICHAGE = { js: 'JS' }

// Le prenom est stocke en minuscules sans accent, mais s'affiche normalement.
export const formaterNom = (nom) =>
  AFFICHAGE[nom] ?? nom.replace(/(^|[\s-])(\p{Ll})/gu, (_, avant, lettre) => avant + lettre.toUpperCase())

export const normaliserNom = (nom) =>
  nom
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')

// Amplitude du planning : premier creneau reservable, et heure de fermeture.
export const OUVERTURE = 8
export const FERMETURE = 20

// Blocs d'infos pratiques. Chaque entree accepte un `type` :
//   'secret' — masque par defaut, revele au clic (mots de passe)
//   'tel'    — rendu en lien tel:, `numero` porte le numero appele
//   'email'  — rendu en lien mailto:
// Sans type, la valeur est affichee telle quelle.
export const AREMPLIR = 'à compléter'

// Fiches pré-remplies pour les membres de SCOPA. Chacun peut modifier ses infos
// depuis l'onglet Annuaire. Les fiches non listées ici partent vides.
export const FICHES_INITIALES = {
  alison: { fonction: 'Formatrice Data IA', tel: '06 88 65 65 69', email: '' },
  gaetan: { fonction: 'Developpeur Data IA', tel: '06 98 21 09 27', email: '' },
  orkun: { fonction: 'Developpeur Data IA', tel: '', email: '' },
  js: { fonction: 'Apprenti Developpeur Data IA', tel: '', email: '' },
}

export const INFOS = [
  {
    titre: 'Accès au studio',
    entrees: [
      { cle: 'Adresse', valeur: '41 rue Paul Verlaine, 69100 Villeurbanne' },
      { cle: 'Horaires', valeur: 'Du lundi au vendredi, 8h – 20h' },
      { cle: 'Interphone', valeur: 'SCOPA Studio' },
    ],
  },
  {
    titre: 'Wifi',
    entrees: [
      { cle: 'Réseau', valeur: 'SCOPA Studio' },
      { cle: 'Mot de passe', valeur: 'scopastudio', type: 'secret' },
    ],
  },
  {
    titre: 'Contacts',
    entrees: [
      { cle: 'Email du studio', valeur: 'studio@scopa.co', type: 'email' },
      { cle: 'Gestionnaire', valeur: 'Gaëtan', type: 'tel', numero: '0698210927' },
      { cle: 'Urgence', valeur: 'Alison', type: 'tel', numero: '0688656569' },
    ],
  },
]
