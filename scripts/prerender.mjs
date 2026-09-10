import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const ssrDir = resolve(root, 'dist-ssr')
const target = resolve(root, 'dist/index.html')
const placeholder = '<div id="root"></div>'

const { render } = await import(resolve(ssrDir, 'entry-server.js'))
const template = readFileSync(target, 'utf8')

if (!template.includes(placeholder)) {
    throw new Error(`Placeholder ${placeholder} introuvable dans dist/index.html`)
}

writeFileSync(target, template.replace(placeholder, `<div id="root">${render()}</div>`))
rmSync(ssrDir, { recursive: true, force: true })

console.log('prerender: dist/index.html contient desormais le HTML du site')
