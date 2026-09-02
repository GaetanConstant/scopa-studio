
import React from 'react';
import { content } from '../data';
import { LocationCard, ServiceCard, PricingCard } from '../components/Cards';

export default function CreativeTheme() {
    const { hero, concept, location, services, pricing, contact } = content;
    const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;

    return (
        <div className="theme-creative">
            <style>{`
        .theme-creative {
           --color-bg: #FFF9ED; /* Creamy Yellow */
           --color-text: #2D2D2D;
           --color-primary: #FF6B6B; /* Coral */
           --color-secondary: #4ECDC4; /* Teal */
           --color-accent: #FFE66D; /* Yellow */
           --color-surface: #FFFFFF;
           --radius-md: 20px;
           --radius-lg: 40px;
           --font-heading: 'Comic Sans MS', 'Chalkboard SE', sans-serif;
           --font-body: 'Verdana', sans-serif;
        }
        .theme-creative nav {
           background: rgba(255,255,255,0.8);
           backdrop-filter: blur(10px);
           border-radius: 50px;
           margin: 1rem;
           box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .theme-creative .btn {
           background: var(--color-primary);
           border-radius: 50px;
           box-shadow: 0 5px 15px rgba(255,107,107,0.4);
           transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        .theme-creative .btn:hover {
           transform: scale(1.1);
        }
        .theme-creative img {
           border-radius: var(--radius-lg);
           transform: rotate(-1deg);
           transition: transform 0.3s ease;
        }
        .theme-creative img:hover {
           transform: rotate(0deg) scale(1.02);
        }
        .theme-creative .card {
           background: white;
           border-radius: var(--radius-md);
           border: 2px solid var(--color-bg);
           box-shadow: 10px 10px 0 var(--color-secondary);
           transition: all 0.3s ease;
        }
        .theme-creative .card:hover {
           transform: translate(-5px, -5px);
           box-shadow: 15px 15px 0 var(--color-primary);
        }
        .theme-creative .hero {
           background-image: radial-gradient(var(--color-secondary) 1px, transparent 1px);
           background-size: 20px 20px;
        }
      `}</style>

            {/* Search Bar Nav Style */}
            <nav style={{ padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                    ✨ SCOPA
                </div>
                <div>
                    {['Concept', 'Services', 'Tarifs'].map(link => (
                        <a key={link} href={`#${link.toLowerCase()}`} style={{ margin: '0 10px', fontWeight: 'bold' }}>{link}</a>
                    ))}
                </div>
            </nav>

            {/* Hero */}
            <header className="hero section" style={{ textAlign: 'center', padding: '100px 0' }}>
                <div className="container">
                    <h1 className="display-1" style={{ color: 'var(--color-text)', textShadow: '4px 4px 0 var(--color-accent)' }}>
                        {hero.title}
                    </h1>
                    <p className="text-lead" style={{ background: 'white', display: 'inline-block', padding: '1rem', borderRadius: '20px', transform: 'rotate(2deg)' }}>
                        {hero.description}
                    </p>
                    <br /><br />
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                        <img src={`${base}images/${hero.image}`} style={{ width: '600px', borderRadius: '40px', border: '5px solid white' }} />
                        <div style={{ position: 'absolute', bottom: '-30px', right: '-30px', background: 'var(--color-accent)', padding: '2rem', borderRadius: '50%', transform: 'rotate(15deg)', fontWeight: 'bold' }}>
                            Open<br />Now!
                        </div>
                    </div>
                </div>
            </header>

            {/* Services Grid (Bubbles) */}
            <section id="services" className="section">
                <div className="container">
                    <h2 className="heading-2 text-center">Services Fun & Pro</h2>
                    <div className="grid grid-3">
                        {services.items.map((item, i) => (
                            <div key={i} className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{item.icon}</div>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="tarifs" className="section">
                <div className="container">
                    <h2 className="heading-2 text-center">Combien ça coûte ?</h2>
                    <div className="grid grid-3">
                        {pricing.items.map((item, i) => (
                            <PricingCard key={i} {...item} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="section" style={{ background: 'var(--color-secondary)', borderRadius: '50px 50px 0 0', padding: '4rem 2rem', color: 'white', marginTop: '4rem' }}>
                <div className="container text-center">
                    <h2>See you soon!</h2>
                    <a className="btn" style={{ background: 'white', color: 'var(--color-secondary)' }} href={`mailto:${contact.email}`}>Say Hello</a>
                </div>
            </footer>
        </div>
    );
}
