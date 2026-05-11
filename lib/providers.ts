import fs from 'fs'
import path from 'path'
import { createClient } from '@libsql/client/http'
import { Provider } from './types'

const DATA_PATH = path.join(process.cwd(), 'data', 'providers.json')

// ── Local JSON fallback (used when TURSO_DATABASE_URL is not set) ──────────

function readJsonFile(): Provider[] {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8')
  return JSON.parse(raw) as Provider[]
}

function writeJsonFile(providers: Provider[]): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(providers, null, 2), 'utf-8')
}

// ── Turso client ────────────────────────────────────────────────────────────

function db() {
  const url = (process.env.TURSO_DATABASE_URL ?? '').replace(/^libsql:\/\//, 'https://')
  return createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN })
}

async function ensureTable(client: ReturnType<typeof db>) {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS providers (
      id   TEXT PRIMARY KEY,
      data TEXT NOT NULL
    )
  `)
}

// ── Public API ──────────────────────────────────────────────────────────────

const USE_DB = Boolean(process.env.TURSO_DATABASE_URL)

export async function getProviders(): Promise<Provider[]> {
  if (!USE_DB) return readJsonFile()

  const client = db()
  await ensureTable(client)

  const result = await client.execute('SELECT data FROM providers ORDER BY rowid')

  // Empty DB on first run — seed from the bundled JSON
  if (result.rows.length === 0) {
    const seed = readJsonFile()
    await Promise.all(
      seed.map((p) =>
        client.execute({
          sql: 'INSERT OR REPLACE INTO providers (id, data) VALUES (?, ?)',
          args: [p.id, JSON.stringify(p)],
        })
      )
    )
    return seed
  }

  return result.rows.map((r) => JSON.parse(r.data as string) as Provider)
}

async function saveProvider(client: ReturnType<typeof db>, provider: Provider) {
  await client.execute({
    sql: 'INSERT OR REPLACE INTO providers (id, data) VALUES (?, ?)',
    args: [provider.id, JSON.stringify(provider)],
  })
}

export async function createProvider(data: Omit<Provider, 'id'>): Promise<Provider> {
  const id = data.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  const provider: Provider = { id, ...data }

  if (!USE_DB) {
    const all = readJsonFile()
    writeJsonFile([...all, provider])
    return provider
  }

  const client = db()
  await ensureTable(client)
  await saveProvider(client, provider)
  return provider
}

export async function updateProvider(id: string, data: Partial<Provider>): Promise<Provider | null> {
  if (!USE_DB) {
    const all = readJsonFile()
    const idx = all.findIndex((p) => p.id === id)
    if (idx === -1) return null
    all[idx] = { ...all[idx], ...data, id }
    writeJsonFile(all)
    return all[idx]
  }

  const client = db()
  await ensureTable(client)

  const existing = await client.execute({
    sql: 'SELECT data FROM providers WHERE id = ?',
    args: [id],
  })
  if (existing.rows.length === 0) return null

  const current = JSON.parse(existing.rows[0].data as string) as Provider
  const updated: Provider = { ...current, ...data, id }
  await saveProvider(client, updated)
  return updated
}

export async function deleteProvider(id: string): Promise<boolean> {
  if (!USE_DB) {
    const all = readJsonFile()
    const filtered = all.filter((p) => p.id !== id)
    if (filtered.length === all.length) return false
    writeJsonFile(filtered)
    return true
  }

  const client = db()
  await ensureTable(client)

  const result = await client.execute({
    sql: 'DELETE FROM providers WHERE id = ?',
    args: [id],
  })
  return (result.rowsAffected ?? 0) > 0
}
