
import React, { useState } from 'react';
import { content } from '../data';
import { LocationCard, ServiceCard, PricingCard, ReviewCard } from '../components/Cards';

export default function OriginalTheme() {
    const { hero, concept, reviews, location, services, pricing, contact } = content;
    const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;

    // State for Lightbox and Legal Modal
    const [lightboxImg, setLightboxImg] = useState(null);
    const [showLegal, setShowLegal] = useState(false);

    const openLightbox = (img) => setLightboxImg(img);
    const closeLightbox = () => setLightboxImg(null);

    return (
        <div className="theme-original">
            {/* Navigation */}
            <nav className="site-nav">
                <div className="site-nav__brand">SCOPA STUDIO</div>
                <div className="site-nav__links">
                    <a href="#concept">Le Concept</a>
                    <a href="#services">Services</a>
                    <a href="#tarifs">Tarifs</a>
                    <a href="#contact" className="btn btn-primary">Contact</a>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="hero section" style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.8)), url(${base}images/${hero.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <div className="container animate-fade-in">
                    <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>
                        {hero.subtitle}
                    </p>
                    <h1 className="display-1" style={{ whiteSpace: 'pre-line' }}>{hero.title}</h1>
                    <p className="text-lead" style={{ margin: '0 auto 2rem auto' }}>
                        {hero.description}
                    </p>
                    <a href="#tarifs" className="btn btn-primary">{hero.cta}</a>
                </div>
            </header>

            {/* Concept Section */}
            <section id="concept" className="section">
                <div className="container">
                    <div className="grid grid-2" style={{ alignItems: 'center' }}>
                        <div>
                            <h2 className="heading-2">{concept.title}</h2>
                            <p className="text-lead" style={{ marginBottom: '1.5rem' }}>
                                {concept.description}
                            </p>
                            <p dangerouslySetInnerHTML={{ __html: concept.highlight.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />

                            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }}>
                                {concept.images.map((img, i) => (
                                    <img
                                        key={i}
                                        src={`${base}images/${img}`}
                                        alt={`Espace coworking Scopa Studio - vue ${i + 1}`}
                                        style={{ width: '150px', height: '100px', objectFit: 'cover', borderRadius: '8px', cursor: 'pointer' }}
                                        onClick={() => openLightbox(img)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div>
                            <img
                                src={`${base}images/${concept.mainImage}`}
                                alt="Espace principal coworking Villeurbanne"
                                style={{ width: '100%', height: '500px', objectFit: 'cover', borderRadius: '24px', boxShadow: 'var(--shadow-md)', cursor: 'pointer' }}
                                onClick={() => openLightbox(concept.mainImage)}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            <section id="avis" className="section" style={{ background: 'var(--color-surface-hover)' }}>
                <div className="container">
                    <div className="text-center" style={{ marginBottom: '2rem' }}>
                        <h2 className="heading-2" style={{ marginBottom: '0.75rem' }}>{reviews.title}</h2>
                        <div className="reviews-rating">
                            <span className="reviews-rating__score">{reviews.average}</span>
                            <span className="review-card__stars" aria-hidden="true">★★★★★</span>
                            <span style={{ color: '#777' }}>· {reviews.count} avis</span>
                        </div>
                        <p style={{ color: '#777' }}>{reviews.source}</p>
                    </div>

                    <div className="reviews-strip">
                        {reviews.items.map((review, i) => (
                            <ReviewCard key={i} {...review} index={i} />
                        ))}
                    </div>

                    <div className="text-center" style={{ marginTop: '2rem' }}>
                        <a href={reviews.linkUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                            {reviews.linkLabel}
                        </a>
                    </div>
                </div>
            </section>

            {/* Location Section */}
            <section className="section" style={{ background: 'var(--color-surface)' }}>
                <div className="container">
                    <div className="text-center" style={{ marginBottom: '3rem' }}>
                        <h2 className="heading-2">{location.title}</h2>
                        <p className="text-lead" style={{ margin: '0 auto' }}>
                            {location.description}
                        </p>
                    </div>

                    <div className="location-strip">
                        {location.items.map((item, i) => (
                            <LocationCard key={i} {...item} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="section">
                <div className="container">
                    <h2 className="heading-2 text-center" style={{ marginBottom: '4rem' }}>{services.title}</h2>
                    <div className="grid grid-3">
                        {services.items.map((item, i) => (
                            <ServiceCard key={i} {...item} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="tarifs" className="section" style={{ background: 'var(--color-surface)' }}>
                <div className="container">
                    <div className="text-center" style={{ marginBottom: '3rem' }}>
                        <h2 className="heading-2">{pricing.title}</h2>
                        <p>{pricing.description}</p>
                    </div>

                    <div className="grid grid-3">
                        {pricing.items.map((item, i) => (
                            <PricingCard key={i} {...item} />
                        ))}
                    </div>

                    <div style={{
                        marginTop: '3rem',
                        padding: '2.5rem',
                        background: 'var(--color-surface-hover)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-lg)',
                        textAlign: 'center',
                        maxWidth: '760px',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}>
                        <h3 className="heading-3" style={{ marginBottom: '1rem' }}>{pricing.note.title}</h3>
                        <p
                            style={{ marginBottom: '1rem' }}
                            dangerouslySetInnerHTML={{ __html: pricing.note.description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                        />
                        <p style={{ marginBottom: '2rem' }}>{pricing.note.highlight}</p>
                        <a href={`mailto:${contact.email}`} className="btn btn-primary">{pricing.note.cta}</a>
                    </div>
                </div>
            </section>

            {/* Footer / Contact */}
            <footer id="contact" className="section site-footer" style={{ background: 'var(--color-secondary)', color: 'white', padding: '1.5rem 0' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                        <p style={{ margin: 0, fontSize: '1rem' }}>
                            {contact.address[0]} {contact.address[1]}
                        </p>
                        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </a>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <a href={contact.website} target="_blank" rel="noopener noreferrer" style={{ color: 'white', opacity: 0.7, textDecoration: 'none', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
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

            {/* Lightbox Modal */}
            {lightboxImg && (
                <div
                    style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', zIndex: 10000, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'zoom-out' }}
                    onClick={closeLightbox}
                >
                    <img
                        src={`${base}images/${lightboxImg}`}
                        alt="Agrandissement"
                        style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }}
                    />
                </div>
            )}

            {/* Mentions Légales Modal */}
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
                        <p><strong>Contact :</strong> contact@scopa-studio.fr</p>
                        <p><strong>Hébergement :</strong> Ce site est hébergé via Vercel.</p>
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
        </div>
    );
}
