'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Provider } from '@/lib/types'

const EMPTY: Omit<Provider, 'id'> = {
  name: '',
  logo: '',
  category: 'business-banking',
  badge: '',
  description: '',
  monthlyFee: '',
  cardFee: '',
  transferFee: '',
  tags: [],
  pros: [],
  cons: [],
  featured: false,
  ctaUrl: '',
}

interface Props {
  initialProviders: Provider[]
}

export default function AdminDashboard({ initialProviders }: Props) {
  const router = useRouter()
  const [providers, setProviders] = useState<Provider[]>(initialProviders)
  const [editing, setEditing] = useState<Provider | null>(null)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState<Omit<Provider, 'id'>>(EMPTY)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleLogout() {
    await fetch('/api/auth', { method: 'DELETE' })
    router.push('/admin/login')
  }

  function openCreate() {
    setForm(EMPTY)
    setEditing(null)
    setCreating(true)
    setError('')
  }

  function openEdit(p: Provider) {
    setForm({ ...p })
    setEditing(p)
    setCreating(false)
    setError('')
  }

  function closeModal() {
    setEditing(null)
    setCreating(false)
    setError('')
  }

  async function handleSave() {
    setSaving(true)
    setError('')
    try {
      if (creating) {
        const res = await fetch('/api/providers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error('Save failed')
        const created: Provider = await res.json()
        setProviders((prev) => [...prev, created])
      } else if (editing) {
        const res = await fetch(`/api/providers/${editing.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error('Save failed')
        const updated: Provider = await res.json()
        setProviders((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
      }
      closeModal()
    } catch {
      setError('Something went wrong — check your connection and try again.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this provider? This cannot be undone.')) return
    const res = await fetch(`/api/providers/${id}`, { method: 'DELETE' })
    if (res.ok || res.status === 204) {
      setProviders((prev) => prev.filter((p) => p.id !== id))
    }
  }

  async function toggleFeatured(p: Provider) {
    const res = await fetch(`/api/providers/${p.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ featured: !p.featured }),
    })
    if (res.ok) {
      const updated: Provider = await res.json()
      setProviders((prev) => prev.map((x) => (x.id === updated.id ? updated : x)))
    }
  }

  function setField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">Admin</h1>
          <p className="text-gray-500 text-sm">Manage providers</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={openCreate}
            className="bg-brand-coral hover:bg-red-500 text-white font-semibold text-sm px-4 py-2 rounded-xl transition-colors"
          >
            + Add provider
          </button>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-brand-navy border border-gray-200 px-4 py-2 rounded-xl transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-100 bg-gray-50">
            <tr>
              <th className="text-left px-5 py-3 font-semibold text-gray-600">Name</th>
              <th className="text-left px-5 py-3 font-semibold text-gray-600">Category</th>
              <th className="text-left px-5 py-3 font-semibold text-gray-600">Featured</th>
              <th className="text-left px-5 py-3 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {providers.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3 font-medium text-brand-navy">{p.name}</td>
                <td className="px-5 py-3 text-gray-500">{p.category}</td>
                <td className="px-5 py-3">
                  <button
                    onClick={() => toggleFeatured(p)}
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full transition-colors ${
                      p.featured
                        ? 'bg-red-50 text-brand-coral hover:bg-red-100'
                        : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                    }`}
                  >
                    {p.featured ? 'Featured' : 'Not featured'}
                  </button>
                </td>
                <td className="px-5 py-3 flex gap-3">
                  <button
                    onClick={() => openEdit(p)}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-500 hover:underline font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {providers.length === 0 && (
          <p className="text-center py-12 text-gray-400">No providers yet. Add one above.</p>
        )}
      </div>

      {/* Modal */}
      {(creating || editing) && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-brand-navy">
                {creating ? 'Add provider' : 'Edit provider'}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
            </div>

            <div className="px-6 py-5 flex flex-col gap-4">
              {([
                ['name', 'Name', 'text'],
                ['logo', 'Logo path (e.g. /logos/name.svg)', 'text'],
                ['category', 'Category', 'text'],
                ['badge', 'Badge label', 'text'],
                ['ctaUrl', 'CTA URL', 'url'],
                ['monthlyFee', 'Monthly fee', 'text'],
                ['cardFee', 'Card purchase fee', 'text'],
                ['transferFee', 'Transfer fee', 'text'],
              ] as [keyof typeof form, string, string][]).map(([key, label, type]) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                  <input
                    type={type}
                    value={(form[key] as string) ?? ''}
                    onChange={(e) => setField(key, e.target.value as never)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-coral"
                  />
                </div>
              ))}

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setField('description', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-coral resize-none"
                />
              </div>

              {(['tags', 'pros', 'cons'] as const).map((key) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    {key.charAt(0).toUpperCase() + key.slice(1)} (one per line)
                  </label>
                  <textarea
                    rows={3}
                    value={(form[key] as string[]).join('\n')}
                    onChange={(e) =>
                      setField(key, e.target.value.split('\n').filter(Boolean) as never)
                    }
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-coral resize-none"
                  />
                </div>
              ))}

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setField('featured', e.target.checked)}
                  className="accent-brand-coral w-4 h-4"
                />
                <span className="text-sm font-medium text-gray-700">Featured</span>
              </label>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 px-4 py-2.5 rounded-xl">{error}</p>
              )}
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="text-sm text-gray-500 hover:text-brand-navy border border-gray-200 px-4 py-2 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-brand-coral hover:bg-red-500 text-white font-semibold text-sm px-5 py-2 rounded-xl transition-colors disabled:opacity-60"
              >
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
