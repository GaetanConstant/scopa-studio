# Journal — scopa-studio

## 2026-10-30

**En bref** : le site tenait sur une seule page pour trois offres. Il en a
maintenant quatre, une par recherche visée (coworking, bureau privatif, salle de
réunion, coworking près de Lyon). Mergé, déployé et vérifié en ligne. L'indexation
est demandée dans Search Console.

### Constat de départ (export Search Console sur 16 mois)
- 94 clics au total sur les sous-domaines de scopa.co, dont 49 pour studio.
- Seules requêtes à intention commerciale : « coworking villeurbanne » (126
  impressions, position 10,8), « espace coworking villeurbanne » (position 12),
  « bureaux privatifs villeurbanne », « location bureau villeurbanne »
  (positions 12 à 15).
- La technique était déjà propre : prérendu, balise canonique, `CoworkingSpace`
  et `FAQPage` en JSON-LD, sitemap, vraie 404.

### Livré
| Quoi | Où | Commit |
|---|---|---|
| Pages [`/salle-de-reunion-villeurbanne/`](salle-de-reunion-villeurbanne/index.html), [`/bureau-privatif-villeurbanne/`](bureau-privatif-villeurbanne/index.html), [`/coworking-lyon/`](coworking-lyon/index.html) | `main`, PR #15 | `98518ed` |
| Composants communs [`Layout.jsx`](src/components/Layout.jsx) (menu, FAQ + JSON-LD, pied de page) et [`OfferPage.jsx`](src/components/OfferPage.jsx) | `main` | `98518ed` |
| Prérendu de plusieurs pages ([`scripts/prerender.mjs`](scripts/prerender.mjs)), sitemap à 4 URL | `main` | `98518ed` |
| Téléphone 06 98 21 09 27, coordonnées GPS précises, FAQ « poste à la journée », textes alternatifs des photos, mentions légales corrigées (email, hébergeur GitHub Pages) | `main` | `98518ed` |

Vérifié : build OK, aucune erreur console ni d'hydratation sur les 4 pages,
rendu mobile et desktop contrôlé. En ligne, les 4 pages répondent 200 avec le
HTML prérendu. Sitemap soumis et indexation demandée dans Search Console.

### Décidé
- Adresse de référence : 41 rue Paul Verlaine. La requête « 36 rue Antoine
  Primat » vue dans Search Console ne correspond pas à l'adresse du studio.
- Le poste à la journée n'a pas sa propre page : ce n'est pas la formule
  préférée. Il figure dans la FAQ, avec un tarif « sur demande ».
- La FAQ JSON-LD est générée depuis `data.js`, le texte affiché et celui lu par
  Google ne peuvent plus diverger.

### En cours / non vérifié
- Les dates des avis (« il y a 10 mois ») sont toujours écrites en dur dans
  `data.js`, elles vieillissent.
- La page bureau privatif utilise la photo du balcon faute de photo du bureau.
- 3 erreurs de lint existaient déjà dans `MinimalTheme.jsx` et `CreativeTheme.jsx`
  (thèmes inutilisés) ; elles n'ont pas été corrigées.

### Pour reprendre
- Vers le 2026-11-13 : rapport Pages de Search Console (pages indexées) et nouvel
  export des performances, à comparer au constat ci-dessus.
