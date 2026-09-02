import React, { useState } from 'react';
import OriginalTheme from './themes/OriginalTheme';
import MinimalTheme from './themes/MinimalTheme';
import CreativeTheme from './themes/CreativeTheme';

// Landing Page for Theme Selection
function ThemeSelector({ onSelect }) {
  const themes = [
    { id: 'original', name: 'Original', desc: 'Chaleureux & Cozy', color: '#D97757' },
    { id: 'minimal', name: 'Minimal', desc: 'Épuré & Noir/Blanc', color: '#000000' },
    { id: 'creative', name: 'Creative', desc: 'Pop & Ludique', color: '#4ECDC4' }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Choisissez votre style</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', maxWidth: '1000px', width: '100%', padding: '0 2rem' }}>
        {themes.map(theme => (
          <button
            key={theme.id}
            onClick={() => onSelect(theme.id)}
            style={{
              border: 'none',
              borderRadius: '20px',
              padding: '3rem 2rem',
              background: 'white',
              boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
              textAlign: 'center'
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: theme.color, margin: '0 auto 1.5rem auto' }}></div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{theme.name}</h2>
            <p style={{ color: '#666' }}>{theme.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function App() {
  // Default to 'original' effectively disabling the switcher for the user
  const [currentTheme, setCurrentTheme] = useState('original');

  const renderTheme = () => {
    switch (currentTheme) {
      case 'original': return <OriginalTheme />;
      case 'minimal': return <MinimalTheme />;
      case 'creative': return <CreativeTheme />;
      default: return <ThemeSelector onSelect={setCurrentTheme} />;
    }
  };

  return (
    <div>
      {/* Theme Switcher Button Hidden 
      {currentTheme && (
        <button
          onClick={() => setCurrentTheme(null)}
          style={{
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            zIndex: 9999,
            padding: '8px 16px',
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          ← Changer de style
        </button>
      )}
      */}
      {renderTheme()}
    </div>
  );
}

export default App;
