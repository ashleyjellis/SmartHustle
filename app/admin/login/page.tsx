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
    <div className="min-h-[calc(100vh-80px)] bg-surface flex items-center justify-center px-4">
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-8 w-full max-w-md">

        {/* Header */}
        <div className="mb-8">
          <p className="text-headline-lg text-primary font-bold">Ledger</p>
          <p className="text-on-surface-variant text-body-md mt-1">Admin access</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-label-sm font-semibold text-on-surface mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              autoComplete="username"
              className="w-full border border-outline-variant rounded-lg px-4 py-3 text-body-md bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors"
            />
          </div>

          <div>
            <label className="block text-label-sm font-semibold text-on-surface mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full border border-outline-variant rounded-lg px-4 py-3 text-body-md bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors"
            />
          </div>

          {error && (
            <p className="text-body-md text-error bg-error-container px-4 py-3 rounded-lg">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-on-primary font-bold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 text-body-md mt-2"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
