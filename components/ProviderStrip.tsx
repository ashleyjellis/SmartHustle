'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Provider } from '@/lib/types'

type Tab = 'overview' | 'promo' | 'eligibility' | 'pros-cons'

const TABS: { id: Tab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'promo', label: 'Welcome Promo' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'pros-cons', label: 'Pros & Cons' },
]

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating)
  const partial = rating - full
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="none">
          <defs>
            <linearGradient id={`star-${rating}-${i}`} x1="0" x2="1" y1="0" y2="0">
              <stop offset={i <= full ? '100%' : i === full + 1 ? `${partial * 100}%` : '0%'} stopColor="#cca830" />
              <stop offset={i <= full ? '100%' : i === full + 1 ? `${partial * 100}%` : '0%'} stopColor="#e4e2de" />
            </linearGradient>
          </defs>
          <path
            d="M6 1l1.2 3.6H11L8.2 6.8l1 3.2L6 8.2 2.8 10l1-3.2L1 4.6h3.8z"
            fill={i <= full ? '#cca830' : i === full + 1 && partial > 0.5 ? '#cca830' : '#e4e2de'}
          />
        </svg>
      ))}
    </span>
  )
}

export default function ProviderStrip({ provider }: { provider: Provider }) {
  const [tab, setTab] = useState<Tab>('overview')

  const isFeatured = provider.featured

  return (
    <article
      style={{
        backgroundColor: '#ffffff',
        border: isFeatured ? '2px solid #001814' : '1px solid rgba(0,24,20,0.12)',
        borderRadius: '0.25rem',
        overflow: 'hidden',
      }}
    >
      {isFeatured && (
        <div style={{ height: 3, background: 'linear-gradient(90deg, #ff8162, #a43d23)' }} />
      )}

      {/* Main row */}
      <div className="flex flex-col md:flex-row md:items-start gap-4 p-5">

        {/* Logo + name col */}
        <div className="flex items-start gap-3 md:w-52 flex-shrink-0">
          <div
            style={{
              width: 44, height: 44, flexShrink: 0,
              border: '1px solid #efeeea', borderRadius: '0.25rem',
              backgroundColor: '#fbf9f5',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <Image
              src={provider.logo} alt={`${provider.name} logo`}
              width={36} height={36} className="object-contain"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          </div>
          <div className="min-w-0">
            <p
              style={{ fontFamily: 'var(--font-headline)', color: '#001814', fontSize: '0.9375rem', lineHeight: 1.3 }}
              className="font-semibold"
            >
              {provider.name}
            </p>
            {isFeatured && (
              <span
                style={{
                  display: 'inline-block', marginTop: 4,
                  fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.04em',
                  color: '#ffffff', backgroundColor: '#001814',
                  borderRadius: '0.125rem', padding: '0.15rem 0.5rem',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Ledger Trusted
              </span>
            )}
            {provider.rating && (
              <div className="flex items-center gap-1.5 mt-1.5">
                <StarRating rating={provider.rating} />
                <span style={{ fontFamily: 'var(--font-body)', color: '#717976', fontSize: '0.75rem' }}>
                  {provider.rating} / 5 Ledger Rating
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Fee stats */}
        <div className="flex gap-5 md:gap-8 flex-shrink-0">
          {provider.monthlyFee && (
            <div>
              <p style={{ fontFamily: 'var(--font-body)', color: '#717976', fontSize: '0.6875rem', letterSpacing: '0.05em' }}
                className="uppercase font-semibold mb-0.5">Monthly Fee</p>
              <p style={{ fontFamily: 'var(--font-body)', color: '#001814' }} className="text-sm font-bold">{provider.monthlyFee}</p>
            </div>
          )}
          {provider.bestFor && (
            <div>
              <p style={{ fontFamily: 'var(--font-body)', color: '#717976', fontSize: '0.6875rem', letterSpacing: '0.05em' }}
                className="uppercase font-semibold mb-0.5">Best For</p>
              <p style={{ fontFamily: 'var(--font-body)', color: '#001814' }} className="text-sm font-bold">{provider.bestFor}</p>
            </div>
          )}
          {provider.transferFee && (
            <div>
              <p style={{ fontFamily: 'var(--font-body)', color: '#717976', fontSize: '0.6875rem', letterSpacing: '0.05em' }}
                className="uppercase font-semibold mb-0.5">Free Transfers</p>
              <p style={{ fontFamily: 'var(--font-body)', color: '#001814' }} className="text-sm font-bold">{provider.transferFee}</p>
            </div>
          )}
        </div>

        {/* CTA (desktop) */}
        <div className="ml-auto flex-shrink-0 hidden md:flex flex-col gap-2 items-end">
          <a
            href={provider.ctaUrl}
            target="_blank" rel="noopener noreferrer"
            style={{
              backgroundColor: '#001814', color: '#fbf9f5',
              fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.8125rem',
              padding: '0.5rem 1.25rem', borderRadius: '0.25rem',
              whiteSpace: 'nowrap', display: 'inline-block',
            }}
            className="hover:bg-[#0f2d28] transition-colors"
          >
            Visit Bank
          </a>
          <button
            style={{
              fontFamily: 'var(--font-body)', color: '#a43d23',
              fontSize: '0.8125rem', fontWeight: 500, background: 'none', border: 'none',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
            }}
            onClick={() => setTab('pros-cons')}
          >
            Read Ledger Verdict
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ borderTop: '1px solid #efeeea' }}>
        <div className="flex" style={{ borderBottom: '1px solid #efeeea' }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                fontWeight: tab === t.id ? 600 : 400,
                color: tab === t.id ? '#001814' : '#717976',
                padding: '0.625rem 1rem',
                background: 'none', border: 'none', cursor: 'pointer',
                borderBottom: tab === t.id ? '2px solid #001814' : '2px solid transparent',
                marginBottom: -1,
                transition: 'color 0.1s',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-5">
          {tab === 'overview' && (
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
              {(provider.features ?? provider.tags).map((f) => (
                <li key={f} style={{ fontFamily: 'var(--font-body)', color: '#414846', fontSize: '0.875rem' }}
                  className="flex items-start gap-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 mt-0.5">
                    <circle cx="7" cy="7" r="7" fill="#0f2d28" fillOpacity="0.1" />
                    <path d="M4 7l2 2 4-4" stroke="#0f2d28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {typeof f === 'string' ? f.replace(/-/g, ' ') : f}
                </li>
              ))}
            </ul>
          )}

          {tab === 'promo' && (
            <div style={{ backgroundColor: '#fbf9f5', borderRadius: '0.25rem', padding: '1rem' }}>
              {provider.welcomePromo ? (
                <p style={{ fontFamily: 'var(--font-body)', color: '#1b1c1a', fontSize: '0.9375rem' }}>
                  🎁 {provider.welcomePromo}
                </p>
              ) : (
                <p style={{ fontFamily: 'var(--font-body)', color: '#717976', fontSize: '0.875rem' }}>
                  No current welcome promotion.
                </p>
              )}
            </div>
          )}

          {tab === 'eligibility' && (
            <p style={{ fontFamily: 'var(--font-body)', color: '#414846', fontSize: '0.875rem', lineHeight: 1.6 }}>
              {provider.eligibility ?? 'Check provider website for eligibility criteria.'}
            </p>
          )}

          {tab === 'pros-cons' && (
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p style={{ fontFamily: 'var(--font-body)', color: '#2d6a4f', fontSize: '0.75rem', letterSpacing: '0.06em' }}
                  className="uppercase font-semibold mb-2">Pros</p>
                <ul className="space-y-1.5">
                  {(provider.pros ?? []).map((p) => (
                    <li key={p} style={{ fontFamily: 'var(--font-body)', color: '#414846', fontSize: '0.875rem' }}
                      className="flex gap-2 items-start">
                      <span style={{ color: '#2d6a4f', flexShrink: 0, marginTop: 2 }}>✓</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', color: '#a43d23', fontSize: '0.75rem', letterSpacing: '0.06em' }}
                  className="uppercase font-semibold mb-2">Cons</p>
                <ul className="space-y-1.5">
                  {(provider.cons ?? []).map((c) => (
                    <li key={c} style={{ fontFamily: 'var(--font-body)', color: '#414846', fontSize: '0.875rem' }}
                      className="flex gap-2 items-start">
                      <span style={{ color: '#a43d23', flexShrink: 0, marginTop: 2 }}>✗</span>{c}
                    </li>
                  ))}
                </ul>
              </div>
              {provider.verdict && (
                <div className="sm:col-span-2" style={{ borderTop: '1px solid #efeeea', paddingTop: '1rem' }}>
                  <p style={{ fontFamily: 'var(--font-body)', color: '#717976', fontSize: '0.75rem', letterSpacing: '0.06em' }}
                    className="uppercase font-semibold mb-1.5">Ledger Verdict</p>
                  <p style={{ fontFamily: 'var(--font-headline)', color: '#1b1c1a', fontSize: '0.9375rem', fontStyle: 'italic', lineHeight: 1.6 }}>
                    "{provider.verdict}"
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile CTA */}
      <div style={{ borderTop: '1px solid #efeeea' }} className="p-4 flex gap-3 md:hidden">
        <a
          href={provider.ctaUrl} target="_blank" rel="noopener noreferrer"
          style={{
            flex: 1, textAlign: 'center',
            backgroundColor: '#001814', color: '#fbf9f5',
            fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem',
            padding: '0.625rem 1rem', borderRadius: '0.25rem', display: 'block',
          }}
        >
          Visit Bank
        </a>
      </div>
    </article>
  )
}
