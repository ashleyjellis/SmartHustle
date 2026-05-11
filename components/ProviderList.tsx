'use client'

import { useState } from 'react'
import ProviderStrip from './ProviderStrip'
import { Provider } from '@/lib/types'

type Filter = { label: string; match: (p: Provider) => boolean }

const FILTERS: Filter[] = [
  { label: 'All Accounts',    match: () => true },
  { label: 'Free Monthly Fee', match: (p) => p.tags?.includes('no-monthly-fee') ?? false },
  { label: 'Fintech Only',    match: (p) => !(p.tags?.includes('branch-banking') ?? false) },
  { label: 'High Street',     match: (p) => p.tags?.includes('branch-banking') ?? false },
]

export default function ProviderList({ providers }: { providers: Provider[] }) {
  const [activeIdx, setActiveIdx] = useState(0)

  const filtered = providers.filter(FILTERS[activeIdx].match)

  return (
    <div className="space-y-6">
      {/* Filter + sort bar */}
      <div id="top-accounts" className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          {FILTERS.map((f, i) => (
            <button
              key={f.label}
              onClick={() => setActiveIdx(i)}
              className={`px-4 md:px-6 py-2 rounded-full font-bold text-label-sm md:text-body-md whitespace-nowrap transition-colors ${
                i === activeIdx
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-outline-variant'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-on-surface-variant text-body-md">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M8 12h8M11 18h2" strokeLinecap="round"/>
          </svg>
          <span className="font-bold text-label-sm md:text-body-md">Sort by: Ledger Rating</span>
        </div>
      </div>

      {/* Provider cards */}
      {filtered.length === 0 && (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 text-center">
          <p className="text-body-md text-on-surface-variant">No accounts match this filter.</p>
        </div>
      )}

      {filtered.map((p, idx) => (
        <div key={p.id}>
          <ProviderStrip provider={p} />

          {/* Editorial callout after 1st visible provider */}
          {idx === 0 && (
            <div className="bg-surface-container-high p-8 rounded-xl border-l-4 border-secondary mt-6">
              <div className="flex items-start gap-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#011921" className="flex-shrink-0 mt-1">
                  <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/>
                </svg>
                <div>
                  <h4 className="text-headline-md text-primary mb-2">The Honest Truth: Switching</h4>
                  <p className="text-body-md text-on-surface-variant">
                    Switching business bank accounts is no longer the nightmare it used to be. The Current Account Switch Service (CASS) handles the transfer of all your standing orders and direct debits automatically within 7 working days. Don&apos;t stay with a sub-par bank just because you fear the paperwork.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
