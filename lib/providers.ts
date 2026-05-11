import fs from 'fs'
import path from 'path'
import { Provider } from './types'

const DATA_PATH = path.join(process.cwd(), 'data', 'providers.json')
const USE_DB = Boolean(process.env.TURSO_DATABASE_URL)

// ── Local JSON fallback (dev only) ─────────────────────────────────────────

function readJsonFile(): Provider[] {
  return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8')) as Provider[]
}

function writeJsonFile(providers: Provider[]): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(providers, null, 2), 'utf-8')
}

// ── Turso HTTP API ─────────────────────────────────────────────────────────
// Uses the /v2/pipeline REST endpoint directly — no client library needed.

type Arg = { type: 'text'; value: string } | { type: 'null' }
type TursoCell = { type: string; value: string | null }

function text(v: string): Arg { return { type: 'text', value: v } }

function stmt(sql: string, args: Arg[] = []) {
  return { type: 'execute' as const, stmt: { sql, args } }
}

async function sql(statements: ReturnType<typeof stmt>[]) {
  const url = process.env.TURSO_DATABASE_URL!.replace(/^libsql:\/\//, 'https://')

  const res = await fetch(`${url}/v2/pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.TURSO_AUTH_TOKEN ?? ''}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ requests: [...statements, { type: 'close' }] }),
  })

  if (!res.ok) throw new Error(`Turso ${res.status}: ${await res.text()}`)

  const data = await res.json() as {
    results: { type: string; response?: { result: { rows: TursoCell[][] } } }[]
  }

  return data.results
    .filter((r) => r.type === 'ok')
    .map((r) => r.response?.result?.rows ?? [])
}

async function setup() {
  await sql([stmt(`CREATE TABLE IF NOT EXISTS providers (id TEXT PRIMARY KEY, data TEXT NOT NULL)`)])
}

async function getRows(): Promise<TursoCell[][]> {
  const results = await sql([stmt('SELECT data FROM providers ORDER BY rowid')])
  return results[0] ?? []
}

// ── Public API ─────────────────────────────────────────────────────────────

export async function getProviders(): Promise<Provider[]> {
  if (!USE_DB) return readJsonFile()

  await setup()
  const rows = await getRows()

  if (rows.length === 0) {
    const seed = readJsonFile()
    await sql(seed.map((p) => stmt(
      'INSERT OR REPLACE INTO providers (id, data) VALUES (?, ?)',
      [text(p.id), text(JSON.stringify(p))]
    )))
    return seed
  }

  return rows.map((row) => JSON.parse(row[0].value!) as Provider)
}

export async function createProvider(data: Omit<Provider, 'id'>): Promise<Provider> {
  const id = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  const provider: Provider = { id, ...data }

  if (!USE_DB) { writeJsonFile([...readJsonFile(), provider]); return provider }

  await setup()
  await sql([stmt('INSERT OR REPLACE INTO providers (id, data) VALUES (?, ?)', [text(id), text(JSON.stringify(provider))])])
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

  await setup()
  const rows = await sql([stmt('SELECT data FROM providers WHERE id = ?', [text(id)])])
  const existing = rows[0]?.[0]?.[0]?.value
  if (!existing) return null

  const updated: Provider = { ...JSON.parse(existing) as Provider, ...data, id }
  await sql([stmt('INSERT OR REPLACE INTO providers (id, data) VALUES (?, ?)', [text(id), text(JSON.stringify(updated))])])
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

  await setup()
  const before = (await getRows()).length
  await sql([stmt('DELETE FROM providers WHERE id = ?', [text(id)])])
  const after = (await getRows()).length
  return after < before
}
