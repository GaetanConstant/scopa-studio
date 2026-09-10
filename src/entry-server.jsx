import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'

// Rendu du site vitrine en HTML statique, injecte dans dist/index.html au build
// par scripts/prerender.mjs. Sans ca, le HTML servi ne contient qu'un div vide :
// les moteurs de recherche doivent executer le JS pour voir le contenu.
export function render() {
    return renderToString(
        <StrictMode>
            <App />
        </StrictMode>
    )
}
