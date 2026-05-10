'use client'

import { Provider } from '@/lib/types'
import Image from 'next/image'

interface Props {
  provider: Provider
}

export default function ProviderCard({ provider }: Props) {
  /* Ledger "High-Light" state for featured: 2px Forest Deep border + coral header bar */
  const featuredBorder = provider.featured
    ? '2px solid #001814'
    : '1px solid rgba(0,24,20,0.10)'

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        border: featuredBorder,
        borderRadius: '0.25rem', /* 4px – architectural */
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'box-shadow 0.15s ease',
      }}
      className="hover:shadow-[0_4px_20px_rgba(0,24,20,0.08)]"
    >
      {/* Coral header bar for featured cards */}
      {provider.featured && (
        <div style={{ height: '3px', backgroundColor: '#ff8162' }} />
      )}

      <div className="p-5 flex flex-col gap-4 flex-1">
        {/* Logo + badge row */}
        <div className="flex items-start justify-between gap-3">
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '0.25rem',
              border: '1px solid #efeeea',
              backgroundColor: '#fbf9f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              overflow: 'hidden',
            }}
          >
            <Image
              src={provider.logo}
              alt={`${provider.name} logo`}
              width={36}
              height={36}
              className="object-contain"
              onError={(e) => {
                const t = e.target as HTMLImageElement
                t.style.display = 'none'
              }}
            />
          </div>

          {provider.badge && (
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: '#a43d23',
                backgroundColor: 'rgba(164,61,35,0.08)',
                borderRadius: '0.25rem',
                padding: '0.25rem 0.625rem',
                whiteSpace: 'nowrap',
              }}
            >
              {provider.badge}
            </span>
          )}
        </div>

        {/* Name */}
        <h3
          style={{ fontFamily: 'var(--font-headline)', color: '#001814' }}
          className="text-[1.0625rem] font-semibold leading-snug"
        >
          {provider.name}
        </h3>

        {/* Fee stats – "comparison strip" style */}
        {(provider.monthlyFee || provider.transferFee) && (
          <div
            style={{ borderTop: '1px solid #efeeea', borderBottom: '1px solid #efeeea', padding: '0.625rem 0' }}
            className="flex gap-6"
          >
            {provider.monthlyFee && (
              <div>
                <p
                  style={{ fontFamily: 'var(--font-body)', color: '#717976', fontSize: '0.6875rem', letterSpacing: '0.05em' }}
                  className="uppercase font-semibold mb-0.5"
                >
                  Monthly
                </p>
                <p style={{ fontFamily: 'var(--font-body)', color: '#001814' }} className="text-sm font-semibold">
                  {provider.monthlyFee}
                </p>
              </div>
            )}
            {provider.cardFee && (
              <div>
                <p
                  style={{ fontFamily: 'var(--font-body)', color: '#717976', fontSize: '0.6875rem', letterSpacing: '0.05em' }}
                  className="uppercase font-semibold mb-0.5"
                >
                  Card
                </p>
                <p style={{ fontFamily: 'var(--font-body)', color: '#001814' }} className="text-sm font-semibold">
                  {provider.cardFee}
                </p>
              </div>
            )}
            {provider.transferFee && (
              <div>
                <p
                  style={{ fontFamily: 'var(--font-body)', color: '#717976', fontSize: '0.6875rem', letterSpacing: '0.05em' }}
                  className="uppercase font-semibold mb-0.5"
                >
                  Transfers
                </p>
                <p style={{ fontFamily: 'var(--font-body)', color: '#001814' }} className="text-sm font-semibold">
                  {provider.transferFee}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Editorial verdict / description – italic Newsreader */}
        <p
          style={{ fontFamily: 'var(--font-headline)', color: '#414846', fontStyle: 'italic' }}
          className="text-[0.9375rem] leading-relaxed flex-1"
        >
          {provider.description}
        </p>

        {/* Tags */}
        {provider.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {provider.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.6875rem',
                  fontWeight: 500,
                  color: '#414846',
                  backgroundColor: '#efeeea',
                  borderRadius: '9999px',
                  padding: '0.2rem 0.6rem',
                }}
              >
                {tag.replace(/-/g, ' ')}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Pros / cons accordion */}
      {(provider.pros?.length || provider.cons?.length) ? (
        <details style={{ borderTop: '1px solid #efeeea' }} className="group">
          <summary
            style={{ fontFamily: 'var(--font-body)', color: '#717976', fontSize: '0.8125rem' }}
            className="px-5 py-3 cursor-pointer select-none flex items-center gap-1 hover:text-[#001814]"
          >
            <span>Pros &amp; cons</span>
            <svg
              className="w-3.5 h-3.5 ml-auto transition-transform group-open:rotate-180"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-5 pb-4 grid grid-cols-2 gap-4">
            {provider.pros && (
              <div>
                <p style={{ fontFamily: 'var(--font-body)', color: '#2d6a4f', fontSize: '0.75rem', letterSpacing: '0.05em' }}
                  className="font-semibold uppercase mb-1.5">
                  Pros
                </p>
                <ul className="space-y-1">
                  {provider.pros.map((p) => (
                    <li key={p} style={{ fontFamily: 'var(--font-body)', color: '#414846' }}
                      className="flex gap-1.5 text-xs leading-relaxed">
                      <span style={{ color: '#2d6a4f' }} className="flex-shrink-0 mt-0.5">✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {provider.cons && (
              <div>
                <p style={{ fontFamily: 'var(--font-body)', color: '#a43d23', fontSize: '0.75rem', letterSpacing: '0.05em' }}
                  className="font-semibold uppercase mb-1.5">
                  Cons
                </p>
                <ul className="space-y-1">
                  {provider.cons.map((c) => (
                    <li key={c} style={{ fontFamily: 'var(--font-body)', color: '#414846' }}
                      className="flex gap-1.5 text-xs leading-relaxed">
                      <span style={{ color: '#a43d23' }} className="flex-shrink-0 mt-0.5">✗</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </details>
      ) : null}

      {/* CTA – Solid Forest Deep, cream text */}
      <div style={{ borderTop: '1px solid #efeeea' }} className="px-5 py-4">
        <a
          href={provider.ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            width: '100%',
            textAlign: 'center',
            backgroundColor: '#001814',
            color: '#fbf9f5',
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            fontSize: '0.875rem',
            padding: '0.625rem 1rem',
            borderRadius: '0.25rem',
            transition: 'background-color 0.15s ease',
          }}
          className="hover:bg-[#0f2d28]"
        >
          Open account
        </a>
      </div>
    </div>
  )
}
