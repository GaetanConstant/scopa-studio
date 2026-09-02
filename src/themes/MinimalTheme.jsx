
import React from 'react';
import { content } from '../data';
import { LocationCard, ServiceCard, PricingCard } from '../components/Cards';

export default function MinimalTheme() {
    const { hero, concept, location, services, pricing, contact } = content;
    const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;

    // Custom styles shim for Minimal Theme scope
    const minimalStyles = {
        fontFamily: "'Courier New', Courier, monospace",
        color: '#000',
        backgroundColor: '#fff'
    };

    return (
        <div className="theme-minimal" style={minimalStyles}>
            <style>{`
        .theme-minimal {
          --color-bg: #ffffff;
          --color-text: #000000;
          --color-primary: #000000;
          --color-secondary: #000000;
          --color-surface: #ffffff;
          --color-border: #000000;
          --radius-md: 0px;
          --radius-lg: 0px;
          --radius-round: 0px;
          --font-heading: 'Times New Roman', Times, serif;
          --font-body: 'Arial', sans-serif;
        }
        .theme-minimal .btn {
           border: 1px solid black;
           background: white;
           color: black;
           text-transform: uppercase;
           letter-spacing: 1px;
           border-radius: 0;
           box-shadow: 4px 4px 0px 0px rgba(0,0,0,1);
        }
        .theme-minimal .btn:hover {
           transform: translate(2px, 2px);
           box-shadow: 2px 2px 0px 0px rgba(0,0,0,1);
           background: white;
        }
        .theme-minimal .card {
           border: 1px solid black;
           border-radius: 0;
           box-shadow: none;
        }
        .theme-minimal .pricing-card {
           border-width: 1px !important;
        }
        .theme-minimal img {
           border-radius: 0 !important;
           filter: grayscale(100%);
        }
        .theme-minimal .hero { 
           background: white !important;
           border-bottom: 2px solid black;
        }
      `}</style>

            {/* Navigation */}
            <nav style={{ padding: '2rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid black' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)', textTransform: 'uppercase' }}>
                    SCOPA STUDIO
                </div>
                <div>
                    <a href="#concept" style={{ margin: '0 1rem', textDecoration: 'underline' }}>Concept</a>
                    <a href="#services" style={{ margin: '0 1rem', textDecoration: 'underline' }}>Services</a>
                    <a href="#tarifs" style={{ margin: '0 1rem', textDecoration: 'underline' }}>Tarifs</a>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="hero section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
                <div className="container">
                    <div className="grid grid-2" style={{ alignItems: 'center' }}>
                        <div>
                            <h1 className="display-1" style={{ fontSize: '4rem', fontWeight: 'lighter' }}>SCOPA<br />STUDIO.</h1>
                            <p className="text-lead" style={{ borderLeft: '4px solid black', paddingLeft: '1rem', fontStyle: 'italic' }}>
                                {hero.description}
                            </p>
                            <br />
                            <a href="#tarifs" className="btn">Réserver</a>
                        </div>
                        <div>
                            <img src={`${base}images/${hero.image}`} style={{ width: '100%', height: '400px', objectFit: 'cover', border: '1px solid black' }} />
                        </div>
                    </div>
                </div>
            </header>

            {/* Concept Section */}
            <section id="concept" className="section" style={{ borderTop: '1px solid black' }}>
                <div className="container">
                    <h2 className="display-1" style={{ textAlign: 'center', marginBottom: '4rem' }}>LE CONCEPT</h2>
                    <div className="grid grid-2">
                        <div style={{ borderRight: '1px solid black', paddingRight: '2rem' }}>
                            <p className="text-lead">{concept.description}</p>
                        </div>
                        <div style={{ paddingLeft: '2rem' }}>
                            <img src={`${base}images/${concept.mainImage}`} style={{ width: '100%', border: '1px solid black' }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="section" style={{ background: '#f4f4f4', borderTop: '1px solid black' }}>
                <div className="container">
                    <h2 className="heading-2" style={{ borderBottom: '1px solid black', display: 'inline-block', paddingRight: '2rem' }}>SERVICES</h2>
                    <br /><br />
                    <div className="grid grid-3">
                        {services.items.map((item, i) => (
                            <div key={i} style={{ border: '1px solid black', padding: '1rem', background: 'white' }}>
                                <span style={{ fontSize: '2rem' }}>{item.icon}</span>
                                <h3 style={{ textTransform: 'uppercase', marginTop: '1rem' }}>{item.title}</h3>
                                <p style={{ fontSize: '0.9rem' }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="tarifs" className="section" style={{ borderTop: '1px solid black' }}>
                <div className="container">
                    <h2 className="heading-2 text-center" style={{ marginBottom: '3rem' }}>TARIFICATION</h2>
                    <div className="grid grid-3">
                        {pricing.items.map((item, i) => (
                            <PricingCard key={i} {...item} className="" />
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="section" style={{ background: 'black', color: 'white', padding: '4rem 0' }}>
                <div className="container text-center">
                    <h2 style={{ color: 'white' }}>SCOPA</h2>
                    <p>{contact.address.join(' ')}</p>
                    <br />
                    <p>{contact.email}</p>
                </div>
            </footer>
        </div>
    );
}
