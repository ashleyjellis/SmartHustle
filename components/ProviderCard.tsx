'use client'

import { Provider } from '@/lib/types'
import Image from 'next/image'

interface Props {
  provider: Provider
}

export default function ProviderCard({ provider }: Props) {
  return (
    <div className={`relative bg-white rounded-2xl border flex flex-col overflow-hidden transition-shadow hover:shadow-lg ${provider.featured ? 'border-brand-coral shadow-md' : 'border-gray-200'}`}>
      {provider.featured && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-brand-coral" />
      )}

      <div className="p-6 flex flex-col gap-4 flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
            <Image
              src={provider.logo}
              alt={`${provider.name} logo`}
              width={40}
              height={40}
              className="object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
              }}
            />
          </div>
          {provider.badge && (
            <span className="text-xs font-semibold text-brand-coral bg-red-50 px-2.5 py-1 rounded-full whitespace-nowrap">
              {provider.badge}
            </span>
          )}
        </div>

        {/* Name */}
        <div>
          <h3 className="font-semibold text-brand-navy text-base leading-snug">
            {provider.name}
          </h3>
        </div>

        {/* Fee summary */}
        {(provider.monthlyFee || provider.transferFee) && (
          <div className="flex gap-4 text-sm">
            {provider.monthlyFee && (
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wide font-medium">Monthly</p>
                <p className="font-semibold text-brand-navy">{provider.monthlyFee}</p>
              </div>
            )}
            {provider.transferFee && (
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wide font-medium">Transfers</p>
                <p className="font-semibold text-brand-navy">{provider.transferFee}</p>
              </div>
            )}
          </div>
        )}

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed flex-1">
          {provider.description}
        </p>

        {/* Tags */}
        {provider.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {provider.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-xs text-gray-500 bg-gray-100 rounded-full px-2.5 py-0.5"
              >
                {tag.replace(/-/g, ' ')}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Pros / Cons accordion (collapsed by default) */}
      {(provider.pros?.length || provider.cons?.length) && (
        <details className="border-t border-gray-100 group">
          <summary className="px-6 py-3 text-sm text-gray-500 cursor-pointer select-none flex items-center gap-1 hover:text-brand-navy">
            <span>Pros &amp; cons</span>
            <svg className="w-3.5 h-3.5 ml-auto transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-4 grid grid-cols-2 gap-4 text-sm">
            {provider.pros && (
              <div>
                <p className="font-semibold text-emerald-700 mb-1">Pros</p>
                <ul className="space-y-1">
                  {provider.pros.map((p) => (
                    <li key={p} className="text-gray-600 flex gap-1.5">
                      <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {provider.cons && (
              <div>
                <p className="font-semibold text-red-700 mb-1">Cons</p>
                <ul className="space-y-1">
                  {provider.cons.map((c) => (
                    <li key={c} className="text-gray-600 flex gap-1.5">
                      <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </details>
      )}

      {/* CTA */}
      <div className="px-6 py-4 border-t border-gray-100">
        <a
          href={provider.ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-brand-coral hover:bg-red-500 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors"
        >
          See deal
        </a>
      </div>
    </div>
  )
}
