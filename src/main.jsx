import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const container = document.getElementById('root')

const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// En production le HTML est prerendu (scripts/prerender.mjs) : on hydrate le
// markup existant. En dev le conteneur est vide, on monte normalement.
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
