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
    'article-coworking-cooperatif': {
        path: '/articles/coworking-cooperatif/',
        title: "Un coworking coopératif, qu'est-ce que ça change pour ceux qui y travaillent ?",
        description: "Dans un coworking coopératif, on ne loue pas seulement un poste : on rejoint un petit groupe qui se connaît, où chacun peut proposer un apéro ou un déjeuner, et qui discute de son prix au lieu de subir une grille. À Scopa Studio, à Villeurbanne Gratte-Ciel : 8 postes partagés, un tarif de base qui s'ajuste.",
        date: '2026-11-24',
        enBref: [
            "8 postes en espace partagé, un bureau privatif et une salle de réunion : un lieu à taille humaine.",
            "Un apéro, un déjeuner : chacun peut en proposer, vient qui veut.",
            "Un tarif de base (300 € HT par mois sans engagement, 250 € HT sur 6 mois), puis une discussion selon le nombre de postes et de mois.",
            "Un couple de coworkers se partage un seul poste.",
            "Note Google de 5,0 (9 avis).",
        ],
        sections: [
            {
                title: "Que veut dire « coopératif » à Scopa Studio ?",
                paragraphs: [
                    "À Scopa Studio, « coopératif » ne désigne pas un statut juridique : c'est la façon dont le lieu s'organise. Chaque coworker peut proposer une activité, un aménagement, une idée sur l'organisation du lieu, et donner son avis sur les bureaux. On va même jusqu'à faire décider ensemble les travaux envisagés.",
                    "Au quotidien, ça change surtout une chose. Un coworking coopératif n'est pas une usine à bureaux où l'on loue une place et où l'on ne connaît personne. C'est un lieu où la vie commune compte autant que le poste de travail.",
                ],
            },
            {
                title: "Un lieu à taille humaine, où l'on se connaît",
                paragraphs: [
                    "Scopa Studio compte 8 postes en espace partagé, un bureau privatif pour 4 personnes au plus et une salle de réunion pour 8. À cette échelle, on connaît ses voisins de bureau.",
                    "On y croise trois profils : des indépendants qui travaillent seuls, des salariés en télétravail et des dirigeants de petites structures. Ils n'ont pas le même métier, mais ils partagent la cuisine, le café et les pauses.",
                ],
            },
            {
                title: "Une vie commune, sans obligation",
                paragraphs: [
                    "Ici, personne n'organise la vie commune à la place des coworkers. Quand l'un d'eux propose un apéro ou un déjeuner au restaurant du quartier, les autres viennent s'ils en ont envie. Chacun peut lancer l'invitation.",
                    "Rien n'est obligatoire. Personne n'est tenu de venir tous les jours : le poste est loué au mois, et l'accès est ouvert 24 h sur 24, 7 jours sur 7. Ce que vous payez, c'est l'accès à un lieu de travail convivial.",
                ],
            },
            {
                title: "Un prix qui se discute plutôt qu'une grille",
                paragraphs: [
                    "Il y a un tarif de base. Le poste Standard coûte 300 € HT par mois, sans engagement. Le poste Engagé coûte 250 € HT par mois, avec un engagement de 6 mois. Le bureau privatif coûte 800 € HT par mois, jusqu'à 4 personnes.",
                    "Ensuite, on discute selon le nombre de postes et le nombre de mois. Le tarif est un point de départ, pas une règle figée. C'est ce qui permet des formules qu'aucune grille ne prévoit.",
                ],
            },
            {
                title: "Plusieurs façons d'habiter le même lieu",
                paragraphs: [
                    "Un couple de coworkers se partage un seul poste. Ils viennent à tour de rôle et se partagent l'abonnement.",
                    "Des parents en télétravail, dont la pièce bureau est devenue la chambre de leur enfant, viennent au moins la moitié de la semaine. La plupart s'engagent pour au moins trois mois.",
                    "Des besoins très différents, un même lieu : c'est ce que permet un coworking où l'on se parle avant de signer.",
                ],
            },
        ],
        faq: [
            { q: "Faut-il devenir membre ou associé pour louer un poste ?", a: "Non. Vous louez un poste au mois, comme dans tout coworking. « Coopératif » décrit la façon dont le lieu s'organise, pas un statut : votre voix compte dès que vous arrivez, sans parts à prendre." },
            { q: "Les tarifs sont-ils négociables ?", a: "Le tarif de base est de 300 € HT par mois et par poste sans engagement, ou 250 € HT avec un engagement de 6 mois. Il évolue ensuite selon le nombre de postes et la durée : on en discute ensemble." },
            { q: "Faut-il participer à la vie du lieu ?", a: "Non. Quand un coworker propose un apéro ou un déjeuner, vient qui veut, et vous pouvez en proposer vous aussi. Vous venez travailler quand vous voulez." },
            { q: "Combien de personnes travaillent au Studio ?", a: "L'espace partagé compte 8 postes, auxquels s'ajoutent un bureau privatif pour 4 personnes au plus et une salle de réunion pour 8." },
            { q: "Peut-on visiter avant de s'engager ?", a: "Oui. Écrivez-nous à studio@scopa.co ou appelez le 06 98 21 09 27 pour convenir d'une visite ou d'une journée d'essai." },
        ],
        liens: ['coworking-lyon', 'bureau-privatif', 'salle-reunion'],
    },
};
