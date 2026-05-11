'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const form = new FormData(e.currentTarget)
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: form.get('username'),
        password: form.get('password'),
      }),
    })

    if (res.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      setError('Username or password is wrong. Try again.')
    }
    setLoading(false)
  }

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        backgroundColor: '#faf9f9',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #c2c7ca',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          padding: '40px',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <p style={{ fontSize: '24px', fontWeight: 800, color: '#011921', marginBottom: '4px' }}>
            Ledger
          </p>
          <p style={{ fontSize: '14px', color: '#42484a' }}>Admin access</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label
              htmlFor="username"
              style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#011921', marginBottom: '8px' }}
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              autoComplete="username"
              style={{
                display: 'block',
                width: '100%',
                boxSizing: 'border-box',
                padding: '12px 16px',
                fontSize: '15px',
                color: '#011921',
                backgroundColor: '#faf9f9',
                border: '1px solid #c2c7ca',
                borderRadius: '8px',
                outline: 'none',
              }}
              onFocus={(e) => { e.target.style.borderColor = '#006783'; e.target.style.boxShadow = '0 0 0 2px rgba(0,103,131,0.2)' }}
              onBlur={(e) => { e.target.style.borderColor = '#c2c7ca'; e.target.style.boxShadow = 'none' }}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#011921', marginBottom: '8px' }}
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              style={{
                display: 'block',
                width: '100%',
                boxSizing: 'border-box',
                padding: '12px 16px',
                fontSize: '15px',
                color: '#011921',
                backgroundColor: '#faf9f9',
                border: '1px solid #c2c7ca',
                borderRadius: '8px',
                outline: 'none',
              }}
              onFocus={(e) => { e.target.style.borderColor = '#006783'; e.target.style.boxShadow = '0 0 0 2px rgba(0,103,131,0.2)' }}
              onBlur={(e) => { e.target.style.borderColor = '#c2c7ca'; e.target.style.boxShadow = 'none' }}
            />
          </div>

          {error && (
            <p style={{ fontSize: '14px', color: '#ba1a1a', backgroundColor: '#fff8f7', border: '1px solid #ffdad6', padding: '12px 16px', borderRadius: '8px' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              backgroundColor: '#011921',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '15px',
              padding: '14px',
              borderRadius: '8px',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
              marginTop: '8px',
            }}
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
