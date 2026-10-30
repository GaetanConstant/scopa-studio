import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const ssrDir = resolve(root, 'dist-ssr')

// Chaque page HTML et la page d'offre qu'elle sert (null = accueil).
// Doit rester aligné sur les entrées de vite.config.js et sur `offers` (src/data.js).
const pages = [
    { file: 'index.html', page: null },
    { file: 'bureau-privatif-villeurbanne/index.html', page: 'bureau-privatif' },
    { file: 'salle-de-reunion-villeurbanne/index.html', page: 'salle-reunion' },
    { file: 'coworking-lyon/index.html', page: 'coworking-lyon' },
]

const { render } = await import(resolve(ssrDir, 'entry-server.js'))

for (const { file, page } of pages) {
    const target = resolve(root, 'dist', file)
    const placeholder = page ? `<div id="root" data-page="${page}"></div>` : '<div id="root"></div>'
    const template = readFileSync(target, 'utf8')

    if (!template.includes(placeholder)) {
        throw new Error(`Placeholder ${placeholder} introuvable dans dist/${file}`)
    }

    const opening = placeholder.replace('></div>', '>')
    writeFileSync(target, template.replace(placeholder, `${opening}${render(page)}</div>`))
    console.log(`prerender: dist/${file} contient desormais le HTML de la page`)
}

rmSync(ssrDir, { recursive: true, force: true })
