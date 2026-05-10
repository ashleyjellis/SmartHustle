import fs from 'fs'
import path from 'path'
import { Provider } from './types'

const DATA_PATH = path.join(process.cwd(), 'data', 'providers.json')

export function getProviders(): Provider[] {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8')
  return JSON.parse(raw) as Provider[]
}

export function getProvider(id: string): Provider | undefined {
  return getProviders().find((p) => p.id === id)
}

export function saveProviders(providers: Provider[]): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(providers, null, 2), 'utf-8')
}

export function createProvider(data: Omit<Provider, 'id'>): Provider {
  const providers = getProviders()
  const id = data.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  const provider: Provider = { id, ...data }
  saveProviders([...providers, provider])
  return provider
}

export function updateProvider(id: string, data: Partial<Provider>): Provider | null {
  const providers = getProviders()
  const idx = providers.findIndex((p) => p.id === id)
  if (idx === -1) return null
  providers[idx] = { ...providers[idx], ...data, id }
  saveProviders(providers)
  return providers[idx]
}

export function deleteProvider(id: string): boolean {
  const providers = getProviders()
  const filtered = providers.filter((p) => p.id !== id)
  if (filtered.length === providers.length) return false
  saveProviders(filtered)
  return true
}
