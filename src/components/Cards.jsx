
import React from 'react';

// Location Card
export function LocationCard({ img, title, className = "" }) {
    const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
    const imagePath = `${base}images/${img}`;

    return (
        <div className={`location-card ${className}`} style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px', height: '200px' }}>
            <img
                src={imagePath}
                alt={title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1.0)'}
            />
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                color: 'white', padding: '1rem', paddingTop: '2rem'
            }}>
                <h3 style={{ fontWeight: 500, fontSize: '1rem', margin: 0, color: 'white' }}>{title}</h3>
            </div>
        </div>
    )
}

// Service Card
export function ServiceCard({ icon, title, desc, className = "" }) {
    return (
        <div className={`service-card card ${className}`} style={{ border: 'none', background: 'transparent', boxShadow: 'none' }}>
            <div className="feature-icon">{icon}</div>
            <h3 className="heading-3" style={{ fontSize: '1.25rem' }}>{title}</h3>
            <p style={{ color: '#666' }}>{desc}</p>
        </div>
    );
}

// Pricing Card
export function PricingCard({ title, price, subtitle, desc, highlight, className = "" }) {
    return (
        <div className={`pricing-card card ${className}`} style={{
            borderColor: highlight ? 'var(--color-primary)' : 'var(--color-border)',
            borderWidth: highlight ? '2px' : '1px',
            position: 'relative',
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--color-surface)'
        }}>
            {highlight && (
                <span style={{
                    position: 'absolute', top: '-12px', right: '20px',
                    background: 'var(--color-primary)', color: 'white',
                    padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold'
                }}>
                    Recommandé
                </span>
            )}
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{title}</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-secondary)' }}>
                {price}
            </div>
            <div style={{ color: '#888', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{subtitle}</div>
            <p style={{ marginBottom: 'auto' }}>{desc}</p>
            <a
                href={`mailto:studio@scopa.co?subject=Demande de disponibilité - Formule ${title}&body=Bonjour,%0D%0A%0D%0AJe suis intéressé(e) par la formule ${title} pour les dates suivantes : %0D%0A%0D%0ANom : %0D%0APrénom : %0D%0AEntreprise (si applicable) : %0D%0ATéléphone : %0D%0A%0D%0AMerci.`}
                className={`btn ${highlight ? 'btn-primary' : ''}`}
                style={{ marginTop: '2rem', width: '100%', textAlign: 'center', background: highlight ? '' : '#eee', color: highlight ? '' : '#333', textDecoration: 'none', display: 'block' }}
            >
                Choisir
            </a>
        </div>
    );
}

// Review Card
const AVATAR_COLORS = ['#E63946', '#2C3E50', '#4E8098', '#C1666B', '#5C8001'];

export function ReviewCard({ author, rating, date, text, index = 0 }) {
    const initials = author
        .split(' ')
        .map(part => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

    return (
        <div className="review-card">
            <div className="review-card__head">
                <div className="review-card__avatar" style={{ background: AVATAR_COLORS[index % AVATAR_COLORS.length] }}>
                    {initials}
                </div>
                <div>
                    <div className="review-card__author">{author}</div>
                    <div className="review-card__date">{date}</div>
                </div>
            </div>
            <div className="review-card__stars" aria-label={`${rating} sur 5`}>
                {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
            </div>
            <p className="review-card__text">{text}</p>
        </div>
    );
}
