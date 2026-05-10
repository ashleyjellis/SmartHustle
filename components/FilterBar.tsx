'use client'

import { useState, useMemo } from 'react'
import { Provider } from '@/lib/types'
import ProviderCard from './ProviderCard'

interface Props {
  providers: Provider[]
}

const ALL_TAG = 'All'

export default function FilterBar({ providers }: Props) {
  const [active, setActive] = useState(ALL_TAG)

  const tags = useMemo(() => {
    const set = new Set<string>()
    providers.forEach((p) => p.tags.forEach((t) => set.add(t)))
    return [ALL_TAG, ...Array.from(set)]
  }, [providers])

  const visible = active === ALL_TAG
    ? providers
    : providers.filter((p) => p.tags.includes(active))

  return (
    <div>
      {/* Filter chips – Forest Deep outline → solid on active */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tags.map((tag) => {
          const isActive = active === tag
          return (
            <button
              key={tag}
              onClick={() => setActive(tag)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                padding: '0.3rem 0.875rem',
                borderRadius: '9999px',
                border: `1px solid ${isActive ? '#001814' : 'rgba(0,24,20,0.25)'}`,
                backgroundColor: isActive ? '#001814' : 'transparent',
                color: isActive ? '#fbf9f5' : '#414846',
                cursor: 'pointer',
                transition: 'all 0.12s ease',
                letterSpacing: '0.01em',
              }}
            >
              {tag === ALL_TAG ? tag : tag.replace(/-/g, ' ')}
            </button>
          )
        })}
      </div>

      {/* Card grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <ProviderCard key={p.id} provider={p} />
        ))}
      </div>

      {visible.length === 0 && (
        <p
          style={{ fontFamily: 'var(--font-body)', color: '#717976' }}
          className="text-center py-14"
        >
          No providers match this filter.
        </p>
      )}
    </div>
  )
}
