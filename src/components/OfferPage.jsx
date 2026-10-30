
import React from 'react';
import { content, offers } from '../data';
import { SiteNav, SiteFooter, Faq } from './Layout';

const SITE = 'https://studio.scopa.co';

// Données structurées propres à la page : l'offre (prix, unité) rattachée au
// lieu, et le fil d'Ariane accueil > page.
function offerSchema(offer) {
    const address = {
        "@type": "PostalAddress",
        "streetAddress": "41 rue Paul Verlaine",
        "addressLocality": "Villeurbanne",
        "postalCode": "69100",
        "addressCountry": "FR"
    };
    return [
        {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": offer.schema.name,
            "description": offer.intro,
            "url": SITE + offer.path,
            "areaServed": ["Villeurbanne", "Lyon"],
            "provider": {
                "@type": "CoworkingSpace",
                "@id": `${SITE}/`,
                "name": "Scopa Studio",
                "telephone": "+33698210927",
                "address": address
            },
            "offers": {
                "@type": "Offer",
                "price": offer.schema.price,
                "priceCurrency": "EUR",
                "eligibleQuantity": { "@type": "QuantitativeValue", "value": 1, "unitText": offer.schema.unitText }
            }
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Scopa Studio", "item": `${SITE}/` },
                { "@type": "ListItem", "position": 2, "name": offer.title, "item": SITE + offer.path }
            ]
        }
    ];
}

export default function OfferPage({ page }) {
    const offer = offers[page];
    const { contact, reviews } = content;
    const others = Object.entries(offers).filter(([key]) => key !== page);

    return (
        <div className="theme-original">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema(offer)) }} />
            <SiteNav />

            <header className="section offer-hero">
                <div className="container">
                    <div className="grid grid-2" style={{ alignItems: 'center' }}>
                        <div>
                            <p className="offer-eyebrow">{offer.eyebrow}</p>
                            <h1 className="display-1">{offer.title}</h1>
                            <p className="text-lead" style={{ marginBottom: '1.5rem' }}>{offer.intro}</p>

                            <div className="meeting-room__price">
                                <span className="meeting-room__price-amount">{offer.price.amount}</span>
                                <span className="meeting-room__price-unit">{offer.price.unit}</span>
                            </div>
                            <p style={{ color: '#777', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{offer.price.note}</p>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                                <a href={`mailto:${contact.email}?subject=${encodeURIComponent(offer.cta.subject)}`} className="btn btn-primary">
                                    {offer.cta.label}
                                </a>
                                <a href={contact.phoneHref} className="btn">Appeler le {contact.phone}</a>
                            </div>
                        </div>
                        <div>
                            <img
                                src={`/images/${offer.image.src}`}
                                alt={offer.image.alt}
                                style={{ width: '100%', height: '420px', objectFit: 'cover', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}
                            />
                        </div>
                    </div>
                </div>
            </header>

            <section className="section meeting-room">
                <div className="container">
                    <h2 className="heading-2 text-center">Ce qui est inclus</h2>
                    <ul className="meeting-room__features" style={{ maxWidth: '760px', margin: '0 auto' }}>
                        {offer.features.map((feature, i) => (
                            <li key={i}>
                                <span aria-hidden="true">{feature.icon}</span>
                                {feature.label}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="section">
                <div className="container offer-body">
                    {offer.sections.map((section, i) => (
                        <div key={i} style={{ marginBottom: '2.5rem' }}>
                            <h2 className="heading-3">{section.title}</h2>
                            {section.paragraphs.map((text, j) => (
                                <p key={j} style={{ marginBottom: '1rem' }}>{text}</p>
                            ))}
                        </div>
                    ))}
                    <p>
                        <strong>{reviews.average} / 5</strong> sur Google ({reviews.count} avis) ·{' '}
                        <a href={reviews.linkUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                            {reviews.linkLabel}
                        </a>
                    </p>
                </div>
            </section>

            <Faq title="Questions fréquentes" items={offer.faq} />

            <section className="section" style={{ background: 'var(--color-surface-hover)' }}>
                <div className="container text-center">
                    <h2 className="heading-2">Découvrir aussi</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
                        <a href="/" className="btn">Le coworking Scopa Studio</a>
                        {others.map(([key, other]) => (
                            <a key={key} href={other.path} className="btn">{other.navLabel}</a>
                        ))}
                    </div>
                </div>
            </section>

            <SiteFooter />
        </div>
    );
}
