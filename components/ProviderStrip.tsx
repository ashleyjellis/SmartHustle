'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Provider } from '@/lib/types'

type Tab = 'overview' | 'promo' | 'eligibility' | 'pros-cons'

const TABS: { id: Tab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'promo', label: 'Promo' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'pros-cons', label: 'Pros & Cons' },
]

export default function ProviderStrip({ provider }: { provider: Provider }) {
  const [tab, setTab] = useState<Tab>('overview')

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
      <div className="p-6">
        {/* Header row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="w-16 h-16 bg-surface-container-low rounded-lg flex items-center justify-center p-2 flex-shrink-0">
              <Image
                src={provider.logo} alt={`${provider.name} logo`}
                width={48} height={48} className="object-contain"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            </div>
            <div>
              <h3 className="text-headline-md text-primary">{provider.name}</h3>
              {provider.badge && (
                <span className="bg-secondary-container text-primary px-2 py-0.5 rounded text-label-sm font-semibold">
                  {provider.badge}
                </span>
              )}
            </div>
          </div>
          {provider.rating && (
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1 text-primary mb-1">
                {/* Filled star */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#011921">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="text-headline-md">{provider.rating}</span>
                <span className="text-on-surface-variant text-body-md">/ 5</span>
              </div>
              <span className="text-label-sm text-on-surface-variant">Ledger Rating</span>
            </div>
          )}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {provider.monthlyFee && (
            <div className="bg-surface-container-low p-4 rounded-lg">
              <span className="text-label-sm text-on-surface-variant block mb-1">Monthly Fee</span>
              <span className="text-headline-md text-primary">{provider.monthlyFee}</span>
            </div>
          )}
          {provider.cardFee && (
            <div className="bg-surface-container-low p-4 rounded-lg">
              <span className="text-label-sm text-on-surface-variant block mb-1">UK Card Fee</span>
              <span className="text-headline-md text-primary">{provider.cardFee}</span>
            </div>
          )}
          {provider.transferFee && (
            <div className="bg-surface-container-low p-4 rounded-lg">
              <span className="text-label-sm text-on-surface-variant block mb-1">UK Transfers</span>
              <span className="text-headline-md text-primary">{provider.transferFee}</span>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="border-b border-outline-variant mb-6">
          <nav className="flex">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-1 pb-2 pt-1 text-center text-label-sm md:text-body-md transition-colors whitespace-nowrap ${
                  tab === t.id
                    ? 'border-b-2 border-primary text-primary font-semibold'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab content */}
        <div className="mb-6">
          {tab === 'overview' && (
            <ul className="space-y-3">
              {(provider.features ?? []).map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#006783" className="flex-shrink-0 mt-0.5">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span className="text-body-md text-on-surface-variant">{f}</span>
                </li>
              ))}
            </ul>
          )}
          {tab === 'promo' && (
            <div className="bg-secondary-container/10 rounded-lg p-4 border border-secondary-container/30">
              <p className="text-body-md text-on-surface leading-relaxed">
                {provider.welcomePromo ?? 'No current welcome promotion for this account.'}
              </p>
            </div>
          )}
          {tab === 'eligibility' && (
            <p className="text-body-md text-on-surface-variant leading-relaxed">
              {provider.eligibility ?? 'Check provider website for eligibility criteria.'}
            </p>
          )}
          {tab === 'pros-cons' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-label-sm text-secondary font-bold uppercase tracking-wider mb-3">Pros</p>
                <ul className="space-y-2">
                  {(provider.pros ?? []).map((p) => (
                    <li key={p} className="flex items-start gap-2 text-body-md text-on-surface-variant">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#006783" className="flex-shrink-0 mt-0.5">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-label-sm text-error font-bold uppercase tracking-wider mb-3">Cons</p>
                <ul className="space-y-2">
                  {(provider.cons ?? []).map((c) => (
                    <li key={c} className="flex items-start gap-2 text-body-md text-on-surface-variant">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#ba1a1a" className="flex-shrink-0 mt-0.5">
                        <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
                      </svg>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* CTA row */}
        <div className="flex flex-col md:flex-row gap-4 items-center border-t border-outline-variant pt-6">
          <a
            href={provider.ctaUrl} target="_blank" rel="noopener noreferrer"
            className="w-full md:w-auto bg-primary text-on-primary px-8 py-3 rounded-lg text-body-md font-semibold hover:opacity-90 transition-opacity text-center"
          >
            Visit Bank
          </a>
          <details className="w-full md:w-auto group">
            <summary className="flex items-center justify-center gap-2 cursor-pointer text-primary font-bold list-none py-3 px-6 hover:bg-surface-container-low rounded-lg transition-all text-body-md">
              Read Ledger Verdict
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className="transition-transform group-open:rotate-180">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </summary>
            <div className="mt-4 p-4 bg-secondary-container/10 rounded-lg border border-secondary-container/30">
              <p className="text-body-md text-on-surface leading-relaxed">{provider.verdict ?? provider.description}</p>
            </div>
          </details>
        </div>
      </div>
    </div>
  )
}
