// Articles du site : chacun répond à une seule question, dès le chapô, avec ce
// que seul le Studio peut dire (cas réels, prix, adresse). Une clé = une page
// <path>/index.html, prérendue au build par scripts/prerender.mjs.
//
// Pour ajouter un article : une entrée ici, son index.html (copier celui d'un
// article existant), son entrée dans vite.config.js, scripts/prerender.mjs et
// public/sitemap.xml. `date` = date de mise en ligne réelle, jamais antidatée ;
// `updated` dès qu'un chiffre change.

export const AUTEUR = { name: 'Gaëtan Constant', jobTitle: 'Cofondateur de SCOPA' };

export const articles = {
    'article-appartement-trop-petit': {
        path: '/articles/teletravail-appartement-trop-petit/',
        title: "Où télétravailler quand l'appartement devient trop petit après une naissance ?",
        description: "Quand un enfant arrive, la pièce bureau devient une chambre et le télétravail se replie dans le salon. Un poste en coworking près de chez soi, dès 250 € HT par mois à Villeurbanne, rend une vraie séparation entre travail et vie de famille.",
        date: '2026-11-17',
        enBref: [
            "Le cas le plus fréquent : la pièce bureau devient la chambre du bébé.",
            "Nos parents coworkers viennent au moins la moitié de la semaine, et restent en général au moins trois mois.",
            "Un poste à Scopa Studio : 300 € HT par mois sans engagement, 250 € HT avec un engagement de 6 mois.",
            "Un couple peut se partager un seul poste.",
            "Métro A Gratte-Ciel et tram T6, à Villeurbanne.",
        ],
        sections: [
            {
                title: "Le bureau devient une chambre",
                paragraphs: [
                    "C'est presque toujours la même histoire. Un logement où l'on télétravaillait confortablement, avec une petite pièce ou un coin réservé au bureau. Puis un enfant arrive, et cette pièce devient sa chambre.",
                    "Le télétravail se replie alors au milieu du salon. On répond à ses mails entre deux biberons, on coupe sa caméra quand quelqu'un traverse la pièce, et le soir, l'ordinateur reste sur la table du dîner. La frontière entre vie familiale et vie professionnelle disparaît.",
                    "Déménager pour gagner une pièce coûte cher, et ce n'est pas toujours possible. Revenir au bureau tous les jours non plus, quand l'entreprise est loin ou n'a pas de locaux dans la ville.",
                ],
            },
            {
                title: "Ce que font nos coworkers parents",
                paragraphs: [
                    "Plusieurs de nos coworkers sont arrivés exactement pour cette raison. Ils louent un poste à Scopa Studio, à quelques stations de chez eux, et y viennent au moins la moitié de la semaine. Les autres jours, ils télétravaillent à la maison ou se rendent chez leur employeur.",
                    "La plupart s'engagent pour au moins trois mois : le temps de retrouver un rythme. Un couple a même choisi de se partager un seul poste.",
                    "Ce que ça change pour eux tient en une phrase : ils arrivent enfin à séparer leur monde professionnel de leur monde familial.",
                ],
            },
            {
                title: "Combien ça coûte, et qui paie ?",
                paragraphs: [
                    "Un poste en espace partagé coûte 300 € HT par mois sans engagement, ou 250 € HT par mois avec un engagement de 6 mois. Le prix évolue selon le nombre de postes et la durée : on en discute ensemble. Café, thé, fibre, cuisine équipée et salle de réunion sont compris.",
                    "Les salariés en télétravail peuvent demander à leur employeur de prendre le poste en charge : certains de nos coworkers le font financer ainsi. Les indépendants, eux, le financent eux-mêmes, en frais de leur activité.",
                ],
            },
            {
                title: "Pourquoi un coworking près de chez soi",
                paragraphs: [
                    "Le bon coworking pour un parent, c'est celui qu'on rejoint en quelques minutes après avoir déposé l'enfant à la crèche ou à l'école. Scopa Studio est au 41 rue Paul Verlaine à Villeurbanne, dans le quartier Gratte-Ciel, desservi par le métro A et le tram T6.",
                    "C'est un lieu à taille humaine : 8 postes en espace partagé, un bureau privatif, une salle de réunion. On se connaît, on déjeune ensemble au restaurant du quartier, on fait des apéros entre coworkers. L'accès est possible 24 h sur 24 et 7 jours sur 7.",
                ],
            },
        ],
        faq: [
            { q: "Peut-on venir seulement deux ou trois jours par semaine ?", a: "Oui. Le poste est loué au mois, et vous venez quand vous voulez. Nos coworkers parents viennent en général au moins la moitié de la semaine." },
            { q: "Peut-on partager un poste à deux ?", a: "Oui : un couple de coworkers se partage déjà un seul poste. Parlons-en pour adapter la formule." },
            { q: "Mon employeur peut-il payer mon poste en coworking ?", a: "C'est possible : certains de nos coworkers salariés le font financer par leur entreprise. La décision revient à votre employeur, demandez-lui." },
            { q: "Peut-on visiter avant de s'engager ?", a: "Oui, la visite est sur rendez-vous, par téléphone au 06 98 21 09 27 ou par email à studio@scopa.co." },
        ],
        liens: ['coworking-lyon', 'bureau-privatif'],
    },
};
