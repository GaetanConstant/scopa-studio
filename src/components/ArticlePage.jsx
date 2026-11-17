import React from 'react';
import { content, offers } from '../data';
import { articles, AUTEUR } from '../articles';
import { SiteNav, SiteFooter, Faq } from './Layout';

const SITE = 'https://studio.scopa.co';

const dateLisible = (iso) =>
    new Date(`${iso}T12:00:00`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

// Article signé et daté, rattaché au lieu : les IA et les moteurs y lisent
// l'auteur, les dates et l'éditeur. Le fil d'Ariane passe par la rubrique.
function articleSchema(article) {
    return [
        {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.title,
            "description": article.description,
            "inLanguage": "fr-FR",
            "datePublished": article.date,
            "dateModified": article.updated ?? article.date,
            "mainEntityOfPage": SITE + article.path,
            "image": `${SITE}/og.jpg`,
            "author": { "@type": "Person", ...AUTEUR },
            "publisher": { "@type": "CoworkingSpace", "@id": `${SITE}/`, "name": "Scopa Studio" }
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Scopa Studio", "item": `${SITE}/` },
                { "@type": "ListItem", "position": 2, "name": "Articles", "item": `${SITE}/articles/` },
                { "@type": "ListItem", "position": 3, "name": article.title, "item": SITE + article.path }
            ]
        }
    ];
}

export default function ArticlePage({ page }) {
    const article = articles[page];
    const { contact } = content;

    return (
        <div className="theme-original">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema(article)) }} />
            <SiteNav />

            <main>
                <article>
                    <header className="section offer-hero">
                        <div className="container offer-body">
                            <p className="offer-eyebrow">
                                <a href="/articles/">Articles</a>
                            </p>
                            <h1 className="display-1">{article.title}</h1>
                            <p className="text-lead">{article.description}</p>
                            <p className="article-meta">
                                Par {AUTEUR.name}, Scopa Studio · <time dateTime={article.date}>{dateLisible(article.date)}</time>
                                {article.updated && (
                                    <> · mis à jour le <time dateTime={article.updated}>{dateLisible(article.updated)}</time></>
                                )}
                            </p>
                        </div>
                    </header>

                    <section className="section">
                        <div className="container offer-body">
                            <aside className="article-bref" aria-label="En bref">
                                <h2 className="heading-3">En bref</h2>
                                <ul>
                                    {article.enBref.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </aside>

                            {article.sections.map((section, i) => (
                                <div key={i} className="article-section">
                                    <h2 className="heading-3">{section.title}</h2>
                                    {section.paragraphs.map((text, j) => <p key={j}>{text}</p>)}
                                </div>
                            ))}

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                                <a href={`mailto:${contact.email}?subject=${encodeURIComponent('Visite de Scopa Studio')}`} className="btn btn-primary">
                                    Demander une visite
                                </a>
                                <a href={contact.phoneHref} className="btn">Appeler le {contact.phone}</a>
                            </div>
                        </div>
                    </section>
                </article>

                <Faq title="Questions fréquentes" items={article.faq} />

                <section className="section" style={{ background: 'var(--color-surface-hover)' }}>
                    <div className="container text-center">
                        <h2 className="heading-2">Découvrir aussi</h2>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
                            <a href="/" className="btn">Le coworking Scopa Studio</a>
                            {article.liens.map((key) => (
                                <a key={key} href={offers[key].path} className="btn">{offers[key].navLabel}</a>
                            ))}
                            <a href="/articles/" className="btn">Tous les articles</a>
                        </div>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </div>
    );
}

// Rubrique : la liste des articles, du plus récent au plus ancien.
export function ArticlesIndex() {
    const liste = Object.values(articles).sort((a, b) => b.date.localeCompare(a.date));

    return (
        <div className="theme-original">
            <SiteNav />
            <main>
                <header className="section offer-hero">
                    <div className="container offer-body">
                        <h1 className="display-1">Articles</h1>
                        <p className="text-lead">
                            Télétravail, coworking, bureaux : ce que nous voyons au quotidien à Scopa Studio, à Villeurbanne.
                        </p>
                    </div>
                </header>
                <section className="section">
                    <div className="container offer-body">
                        {liste.map((article) => (
                            <div key={article.path} className="article-section">
                                <h2 className="heading-3">
                                    <a href={article.path}>{article.title}</a>
                                </h2>
                                <p className="article-meta">
                                    <time dateTime={article.date}>{dateLisible(article.date)}</time>
                                </p>
                                <p>{article.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <SiteFooter />
        </div>
    );
}
