'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Provider } from '@/lib/types'

const EMPTY: Omit<Provider, 'id'> = {
  name: '', logo: '', category: 'business-banking', badge: '',
  description: '', monthlyFee: '', cardFee: '', transferFee: '',
  tags: [], pros: [], cons: [], featured: false, ctaUrl: '',
}

const S = {
  input: {
    display: 'block', width: '100%', boxSizing: 'border-box' as const,
    padding: '10px 14px', fontSize: '14px', color: '#011921',
    backgroundColor: '#faf9f9', border: '1px solid #c2c7ca',
    borderRadius: '8px', outline: 'none',
  },
  label: {
    display: 'block', fontSize: '12px', fontWeight: 600,
    color: '#42484a', marginBottom: '6px',
  },
}

export default function AdminDashboard({ initialProviders }: { initialProviders: Provider[] }) {
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

  function openCreate() { setForm(EMPTY); setEditing(null); setCreating(true); setError('') }
  function openEdit(p: Provider) { setForm({ ...p }); setEditing(p); setCreating(false); setError('') }
  function closeModal() { setEditing(null); setCreating(false); setError('') }
  function setField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSave() {
    setSaving(true); setError('')
    try {
      if (creating) {
        const res = await fetch('/api/providers', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error()
        const created: Provider = await res.json()
        setProviders((prev) => [...prev, created])
      } else if (editing) {
        const res = await fetch(`/api/providers/${editing.id}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error()
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
    if (res.ok || res.status === 204) setProviders((prev) => prev.filter((p) => p.id !== id))
  }

  async function toggleFeatured(p: Provider) {
    const res = await fetch(`/api/providers/${p.id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ featured: !p.featured }),
    })
    if (res.ok) {
      const updated: Provider = await res.json()
      setProviders((prev) => prev.map((x) => (x.id === updated.id ? updated : x)))
    }
  }

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#011921', marginBottom: '4px' }}>Admin</h1>
          <p style={{ fontSize: '14px', color: '#42484a' }}>Manage providers</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={openCreate}
            style={{ backgroundColor: '#011921', color: '#ffffff', fontWeight: 700, fontSize: '14px', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
          >
            + Add provider
          </button>
          <button
            onClick={handleLogout}
            style={{ fontSize: '14px', color: '#42484a', border: '1px solid #c2c7ca', padding: '10px 20px', borderRadius: '8px', backgroundColor: 'transparent', cursor: 'pointer' }}
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #c2c7ca', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead style={{ borderBottom: '1px solid #e9e8e8', backgroundColor: '#f5f3f4' }}>
            <tr>
              {['Name', 'Category', 'Featured', 'Actions'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '12px 20px', fontWeight: 600, color: '#42484a' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {providers.map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid #f5f3f4' }}>
                <td style={{ padding: '12px 20px', fontWeight: 600, color: '#011921' }}>{p.name}</td>
                <td style={{ padding: '12px 20px', color: '#42484a' }}>{p.category}</td>
                <td style={{ padding: '12px 20px' }}>
                  <button
                    onClick={() => toggleFeatured(p)}
                    style={{
                      fontSize: '12px', fontWeight: 700, padding: '4px 12px', borderRadius: '99px', border: 'none', cursor: 'pointer',
                      backgroundColor: p.featured ? '#80d9ff' : '#e9e8e8',
                      color: p.featured ? '#011921' : '#42484a',
                    }}
                  >
                    {p.featured ? 'Featured' : 'Not featured'}
                  </button>
                </td>
                <td style={{ padding: '12px 20px' }}>
                  <button onClick={() => openEdit(p)} style={{ color: '#006783', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', marginRight: '16px' }}>Edit</button>
                  <button onClick={() => handleDelete(p.id)} style={{ color: '#ba1a1a', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {providers.length === 0 && (
          <p style={{ textAlign: 'center', padding: '48px', color: '#42484a' }}>No providers yet. Add one above.</p>
        )}
      </div>

      {/* Modal */}
      {(creating || editing) && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '16px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', width: '100%', maxWidth: '560px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            {/* Modal header */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e9e8e8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#011921' }}>{creating ? 'Add provider' : 'Edit provider'}</h2>
              <button onClick={closeModal} style={{ fontSize: '20px', color: '#42484a', background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1 }}>✕</button>
            </div>

            {/* Modal body */}
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {([
                ['name', 'Name', 'text'],
                ['logo', 'Logo path (e.g. /logos/name.svg)', 'text'],
                ['category', 'Category', 'text'],
                ['badge', 'Badge label', 'text'],
                ['ctaUrl', 'CTA URL', 'url'],
                ['monthlyFee', 'Monthly fee', 'text'],
                ['cardFee', 'Card purchase fee', 'text'],
                ['transferFee', 'Transfer / free transfers', 'text'],
              ] as [keyof typeof form, string, string][]).map(([key, label]) => (
                <div key={key}>
                  <label style={S.label}>{label}</label>
                  <input
                    type="text"
                    value={(form[key] as string) ?? ''}
                    onChange={(e) => setField(key, e.target.value as never)}
                    style={S.input}
                    onFocus={(e) => { e.target.style.borderColor = '#006783'; e.target.style.boxShadow = '0 0 0 2px rgba(0,103,131,0.2)' }}
                    onBlur={(e) => { e.target.style.borderColor = '#c2c7ca'; e.target.style.boxShadow = 'none' }}
                  />
                </div>
              ))}

              <div>
                <label style={S.label}>Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setField('description', e.target.value)}
                  style={{ ...S.input, resize: 'vertical' }}
                  onFocus={(e) => { e.target.style.borderColor = '#006783'; e.target.style.boxShadow = '0 0 0 2px rgba(0,103,131,0.2)' }}
                  onBlur={(e) => { e.target.style.borderColor = '#c2c7ca'; e.target.style.boxShadow = 'none' }}
                />
              </div>

              {(['tags', 'pros', 'cons'] as const).map((key) => (
                <div key={key}>
                  <label style={S.label}>{key.charAt(0).toUpperCase() + key.slice(1)} (one per line)</label>
                  <textarea
                    rows={3}
                    value={(form[key] as string[]).join('\n')}
                    onChange={(e) => setField(key, e.target.value.split('\n').filter(Boolean) as never)}
                    style={{ ...S.input, resize: 'vertical' }}
                    onFocus={(e) => { e.target.style.borderColor = '#006783'; e.target.style.boxShadow = '0 0 0 2px rgba(0,103,131,0.2)' }}
                    onBlur={(e) => { e.target.style.borderColor = '#c2c7ca'; e.target.style.boxShadow = 'none' }}
                  />
                </div>
              ))}

              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setField('featured', e.target.checked)}
                  style={{ width: '16px', height: '16px', accentColor: '#011921' }}
                />
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#011921' }}>Featured</span>
              </label>

              {error && (
                <p style={{ fontSize: '14px', color: '#ba1a1a', backgroundColor: '#fff8f7', border: '1px solid #ffdad6', padding: '12px 16px', borderRadius: '8px' }}>
                  {error}
                </p>
              )}
            </div>

            {/* Modal footer */}
            <div style={{ padding: '16px 24px', borderTop: '1px solid #e9e8e8', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                onClick={closeModal}
                style={{ fontSize: '14px', color: '#42484a', border: '1px solid #c2c7ca', padding: '10px 20px', borderRadius: '8px', backgroundColor: 'transparent', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                style={{ backgroundColor: '#011921', color: '#ffffff', fontWeight: 700, fontSize: '14px', padding: '10px 24px', borderRadius: '8px', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.6 : 1 }}
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
