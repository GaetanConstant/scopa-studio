
import React, { useState } from 'react';
import { content, offers } from '../data';
import { LocationCard, ServiceCard, PricingCard, ReviewCard } from '../components/Cards';
import { SiteNav, SiteFooter, Faq } from '../components/Layout';

export default function OriginalTheme() {
    const { hero, concept, reviews, location, services, meetingRoom, pricing, faq, contact } = content;
    const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;

    const [lightboxImg, setLightboxImg] = useState(null);

    const openLightbox = (img) => setLightboxImg(img);
    const closeLightbox = () => setLightboxImg(null);

    return (
        <div className="theme-original">
            <SiteNav />

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
                                        alt={concept.imageAlts[i]}
                                        loading="lazy"
                                        decoding="async"
                                        style={{ width: '150px', height: '100px', objectFit: 'cover', borderRadius: '8px', cursor: 'pointer' }}
                                        onClick={() => openLightbox(img)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div>
                            <img
                                src={`${base}images/${concept.mainImage}`}
                                alt="Open space du coworking Scopa Studio à Villeurbanne Gratte-Ciel"
                                loading="lazy"
                                decoding="async"
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
                        <p style={{ marginBottom: '2rem' }}>
                            Une équipe de 2 à 4 personnes ?{' '}
                            <a href={offers["bureau-privatif"].path} style={{ textDecoration: 'underline' }}>Découvrez le bureau privatif</a>.
                        </p>
                        <a href={`mailto:${contact.email}`} className="btn btn-primary">{pricing.note.cta}</a>
                    </div>
                </div>
            </section>

            {/* Meeting Room Section */}
            <section id="salle-reunion" className="section meeting-room">
                <div className="container">
                    <div className="grid grid-2" style={{ alignItems: 'center' }}>
                        <div>
                            <img
                                src={`${base}images/${meetingRoom.mainImage}`}
                                alt="Salle de réunion 8 personnes à louer - Scopa Studio Villeurbanne"
                                loading="lazy"
                                style={{ width: '100%', height: '420px', objectFit: 'cover', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', cursor: 'pointer' }}
                                onClick={() => openLightbox(meetingRoom.mainImage)}
                            />
                        </div>

                        <div>
                            <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '0.75rem', color: 'var(--color-primary)' }}>
                                {meetingRoom.subtitle}
                            </p>
                            <h2 className="heading-2">{meetingRoom.title}</h2>
                            <p className="text-lead" style={{ marginBottom: '1.5rem' }}>{meetingRoom.description}</p>

                            <div className="meeting-room__price">
                                <span className="meeting-room__price-amount">{meetingRoom.price}</span>
                                <span className="meeting-room__price-unit">{meetingRoom.priceUnit}</span>
                            </div>
                            <p style={{ color: '#777', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{meetingRoom.priceNote}</p>

                            <ul className="meeting-room__features">
                                {meetingRoom.features.map((feature, i) => (
                                    <li key={i}>
                                        <span aria-hidden="true">{feature.icon}</span>
                                        {feature.label}
                                    </li>
                                ))}
                            </ul>

                            <a
                                href={`mailto:${contact.email}?subject=Réservation salle de réunion - Scopa Studio&body=Bonjour,%0D%0A%0D%0AJe souhaite réserver la salle de réunion (8 personnes, 100€ HT la demi-journée).%0D%0A%0D%0ADate souhaitée : %0D%0ACréneau (matin / après-midi) : %0D%0ANombre de participants : %0D%0A%0D%0ANom : %0D%0AEntreprise : %0D%0ATéléphone : %0D%0A%0D%0AMerci.`}
                                className="btn btn-primary"
                                style={{ marginTop: '2rem' }}
                            >
                                {meetingRoom.cta}
                            </a>
                            <p style={{ marginTop: '1rem' }}>
                                <a href={offers["salle-reunion"].path} style={{ textDecoration: 'underline' }}>
                                    Tout savoir sur la location de la salle de réunion
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Faq {...faq} />

            <SiteFooter />

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

        </div>
    );
}
