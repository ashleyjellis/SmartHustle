import fs from 'fs'
import path from 'path'
import { kv } from '@vercel/kv'
import { Provider } from './types'

const KV_KEY = 'providers'
const DATA_PATH = path.join(process.cwd(), 'data', 'providers.json')

// Use KV when running on Vercel (KV_REST_API_URL is auto-injected by the KV store)
const USE_KV = Boolean(process.env.KV_REST_API_URL)

function readJsonFile(): Provider[] {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8')
  return JSON.parse(raw) as Provider[]
}

function writeJsonFile(providers: Provider[]): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(providers, null, 2), 'utf-8')
}

export async function getProviders(): Promise<Provider[]> {
  if (!USE_KV) return readJsonFile()

  const stored = await kv.get<Provider[]>(KV_KEY)
  if (stored && stored.length > 0) return stored

  // First run: seed KV from the bundled JSON file
  const seed = readJsonFile()
  await kv.set(KV_KEY, seed)
  return seed
}

async function saveProviders(providers: Provider[]): Promise<void> {
  if (!USE_KV) {
    writeJsonFile(providers)
    return
  }
  await kv.set(KV_KEY, providers)
}

export async function createProvider(data: Omit<Provider, 'id'>): Promise<Provider> {
  const providers = await getProviders()
  const id = data.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  const provider: Provider = { id, ...data }
  await saveProviders([...providers, provider])
  return provider
}

export async function updateProvider(id: string, data: Partial<Provider>): Promise<Provider | null> {
  const providers = await getProviders()
  const idx = providers.findIndex((p) => p.id === id)
  if (idx === -1) return null
  providers[idx] = { ...providers[idx], ...data, id }
  await saveProviders(providers)
  return providers[idx]
}

export async function deleteProvider(id: string): Promise<boolean> {
  const providers = await getProviders()
  const filtered = providers.filter((p) => p.id !== id)
  if (filtered.length === providers.length) return false
  await saveProviders(filtered)
  return true
}
