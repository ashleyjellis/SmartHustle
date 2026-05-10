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
      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActive(tag)}
            className={`text-sm px-4 py-1.5 rounded-full border font-medium transition-colors ${
              active === tag
                ? 'bg-brand-coral text-white border-brand-coral'
                : 'bg-white text-gray-600 border-gray-200 hover:border-brand-coral hover:text-brand-coral'
            }`}
          >
            {tag === ALL_TAG ? tag : tag.replace(/-/g, ' ')}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <ProviderCard key={p.id} provider={p} />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="text-gray-400 text-center py-12">No providers match this filter.</p>
      )}
    </div>
  )
}
