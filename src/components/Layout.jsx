
import React, { useState } from 'react';
import { content, offers } from '../data';

// Navigation commune à toutes les pages : liens réels vers les pages d'offre
// (maillage interne lu par Google), ancres vers l'accueil pour le reste.
export function SiteNav() {
    return (
        <nav className="site-nav">
            <a href="/" className="site-nav__brand">SCOPA STUDIO</a>
            <div className="site-nav__links">
                <a href="/">Coworking</a>
                <a href={offers["bureau-privatif"].path}>{offers["bureau-privatif"].navLabel}</a>
                <a href={offers["salle-reunion"].path}>{offers["salle-reunion"].navLabel}</a>
                <a href="/#tarifs">Tarifs</a>
                <a href="#contact" className="btn btn-primary">Contact</a>
            </div>
        </nav>
    );
}

// FAQ affichée, doublée de ses données structurées FAQPage : une seule source,
// le contenu visible et le JSON-LD ne peuvent pas diverger.
export function Faq({ title, description, items }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": items.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": { "@type": "Answer", "text": item.a }
        }))
    };

    return (
        <section id="faq" className="section faq">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <div className="container">
                <div className="text-center" style={{ marginBottom: '3rem' }}>
                    <h2 className="heading-2">{title}</h2>
                    {description && <p>{description}</p>}
                </div>

                <div className="faq__list">
                    {items.map((item, i) => (
                        <details key={i} className="faq__item">
                            <summary className="faq__question">{item.q}</summary>
                            <p className="faq__answer">{item.a}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function SiteFooter() {
    const { contact } = content;
    const [showLegal, setShowLegal] = useState(false);

    return (
        <>
            <footer id="contact" className="section site-footer" style={{ background: 'var(--color-secondary)', color: 'white', padding: '1.5rem 0' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0 2rem' }}>
                        <p style={{ margin: 0, fontSize: '1rem' }}>
                            {contact.address[0]} {contact.address[1]}
                        </p>
                        <a href={contact.phoneHref} style={{ color: 'white' }}>{contact.phone}</a>
                        <a href={`mailto:${contact.email}`} style={{ color: 'white' }}>{contact.email}</a>
                        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Scopa Studio sur LinkedIn" style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </a>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <a href={offers["coworking-lyon"].path} style={{ color: 'white', opacity: 0.7, fontSize: '0.9rem' }}>
                            {offers["coworking-lyon"].navLabel}
                        </a>
                        <a href={contact.website} target="_blank" rel="noopener noreferrer" style={{ color: 'white', opacity: 0.7, textDecoration: 'none', fontSize: '0.9rem' }}>
                            Designed by {contact.design}
                        </a>
                        <button
                            onClick={() => setShowLegal(true)}
                            style={{ background: 'none', border: 'none', color: 'white', opacity: 0.5, cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline' }}
                        >
                            Mentions Légales
                        </button>
                    </div>
                </div>
            </footer>

            {showLegal && (
                <div
                    style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 10000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    onClick={() => setShowLegal(false)}
                >
                    <div
                        style={{ background: 'white', padding: '2rem', borderRadius: '8px', maxWidth: '600px', width: '90%', maxHeight: '80vh', overflowY: 'auto' }}
                        onClick={e => e.stopPropagation()}
                    >
                        <h2 style={{ marginBottom: '1rem' }}>Mentions Légales</h2>
                        <p><strong>Éditeur du site :</strong> Scopa Studio</p>
                        <p><strong>Adresse :</strong> 41 rue Paul Verlaine, 69100 Villeurbanne</p>
                        <p><strong>Contact :</strong> {contact.email}</p>
                        <p><strong>Hébergement :</strong> GitHub Pages (GitHub, Inc.).</p>
                        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
                            Les informations recueillies font l’objet d’un traitement informatique destiné à la gestion de la clientèle.
                            Conformément à la loi « informatique et libertés », vous bénéficiez d’un droit d’accès et de rectification aux informations qui vous concernent.
                        </p>
                        <button
                            onClick={() => setShowLegal(false)}
                            style={{ marginTop: '2rem', padding: '0.5rem 1rem', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
