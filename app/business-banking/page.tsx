import Link from 'next/link'
import ProviderStrip from '@/components/ProviderStrip'
import PageSidebar from '@/components/PageSidebar'
import { getProviders } from '@/lib/providers'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Best Business Bank Accounts UK 2026 | KingPage',
  description:
    'Compare the best business bank accounts in the UK. Honest fees, features and pros and cons — updated February 2026.',
}

const FAQ = [
  {
    q: 'Do I need a business bank account as a sole trader?',
    a: "No legal requirement — but there are plenty of good reasons to have one. It makes it easier to monitor payments and performance, simplifies your bookkeeping and tax return, and makes your business look more professional.",
  },
  {
    q: 'Can I use a personal bank account for my business?',
    a: "If you're a sole trader or in a general partnership, possibly — if your account provider allows it. But if your business is a limited company or you're part of a limited liability partnership, a separate business account is always required.",
  },
  {
    q: 'How long does it take to open a business bank account?',
    a: "With some online providers, minutes. With others, several days or even weeks. Sole traders and general partnerships tend to find it quicker, as providers need to carry out fewer checks than on limited companies.",
  },
  {
    q: 'Can you open a business account with bad credit?',
    a: "Usually yes, though you may find fewer options. Many digital providers don't run a hard credit check, though how much this matters depends on your business credit score and the provider's eligibility requirements.",
  },
]

const FINDING = [
  {
    heading: 'Are a startup',
    body: 'Look for low or no monthly fees, ease of use and great customer service. Fee-free accounts from digital providers like Tide and Monzo often appeal to startups.',
  },
  {
    heading: 'Are self-employed or a sole trader',
    body: 'A separate business account keeps your finances apart, making accounting and tax significantly easier. Features like automatic receipt capture and invoicing tools are worth prioritising.',
  },
  {
    heading: 'Want an overdraft facility',
    body: 'Barclays, NatWest and The Co-operative Bank all offer business overdrafts if you need a financial buffer for cashflow.',
  },
  {
    heading: 'Make international payments',
    body: 'Digital providers like Revolut and WorldFirst offer multi-currency accounts designed primarily for international businesses.',
  },
  {
    heading: 'Want a high-street bank',
    body: "Lloyds, Barclays, The Co-operative Bank and Virgin Money all have branch networks if in-person banking matters to you.",
  },
  {
    heading: 'Need to deposit cash',
    body: 'Most major banks with branches are the obvious starting point. Some online providers also allow cash and cheque deposits via the Post Office or PayPoint.',
  },
]

export default function BusinessBankingPage() {
  const providers = getProviders().filter((p) => p.category === 'business-banking')

  return (
    <div style={{ backgroundColor: '#fbf9f5' }}>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #efeeea' }}>
        <div className="max-w-[1140px] mx-auto px-6 py-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-5" aria-label="Breadcrumb">
            <Link
              href="/"
              style={{ fontFamily: 'var(--font-body)', color: '#717976', fontSize: '0.75rem', letterSpacing: '0.06em' }}
              className="uppercase font-semibold hover:text-[#001814] transition-colors"
            >
              Home
            </Link>
            <span style={{ color: '#c1c8c5' }}>›</span>
            <span
              style={{ fontFamily: 'var(--font-body)', color: '#001814', fontSize: '0.75rem', letterSpacing: '0.06em' }}
              className="uppercase font-semibold"
            >
              Business Banking
            </span>
          </nav>

          <h1
            style={{ fontFamily: 'var(--font-headline)', color: '#001814' }}
            className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight mb-4 max-w-2xl"
          >
            Best Business Bank Accounts in the UK
          </h1>

          <p
            style={{ fontFamily: 'var(--font-body)', color: '#414846', fontSize: '1.0625rem', lineHeight: 1.7 }}
            className="max-w-xl mb-5"
          >
            Choosing the right banking partner is a pivotal decision for your company's growth.
            We've analysed over 60 providers to bring you an honest, kind, and jargon-free guide
            to the accounts that actually support small businesses.
          </p>

          <span
            style={{
              display: 'inline-block',
              backgroundColor: '#ff8162', color: '#ffffff',
              fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.75rem',
              padding: '0.3rem 0.875rem', borderRadius: '9999px',
            }}
          >
            Updated May 2026
          </span>
        </div>
      </section>

      {/* ── Two-column layout ────────────────────────────────── */}
      <div className="max-w-[1140px] mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Main column ──────────────────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* Filter + sort bar */}
            <div id="top-accounts" className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex flex-wrap gap-2">
                {['All Accounts', 'Free Monthly Fee', 'Fintech Only', 'High Street'].map((f, i) => (
                  <button
                    key={f}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8125rem', fontWeight: i === 0 ? 600 : 400,
                      padding: '0.35rem 0.875rem',
                      borderRadius: '9999px',
                      border: `1px solid ${i === 0 ? '#001814' : 'rgba(0,24,20,0.2)'}`,
                      backgroundColor: i === 0 ? '#001814' : 'transparent',
                      color: i === 0 ? '#fbf9f5' : '#414846',
                      cursor: 'pointer',
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <select
                style={{
                  fontFamily: 'var(--font-body)', color: '#414846', fontSize: '0.8125rem',
                  border: '1px solid rgba(0,24,20,0.2)', borderRadius: '0.25rem',
                  padding: '0.35rem 0.75rem', backgroundColor: '#ffffff', cursor: 'pointer',
                }}
                aria-label="Sort by"
              >
                <option>Sort by: Ledger Rating</option>
                <option>Sort by: Monthly Fee</option>
                <option>Sort by: Name</option>
              </select>
            </div>

            {/* Provider strips */}
            <div className="flex flex-col gap-4">
              {providers.map((p) => (
                <ProviderStrip key={p.id} provider={p} />
              ))}
            </div>

            {/* ── Editorial: What is a business bank account ── */}
            <section id="what-is" className="mt-14">
              <h2
                style={{ fontFamily: 'var(--font-headline)', color: '#001814' }}
                className="text-2xl font-semibold mb-4"
              >
                What is a business bank account?
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', color: '#414846', lineHeight: 1.75, fontSize: '1.0625rem' }} className="mb-4">
                A business bank account is a standalone current account built for businesses. Whether you're a sole trader,
                a partnership, a limited company, or a charity, a business account helps you keep track of everything coming
                in and going out. Keep it separate from your personal finances and you'll find it easier to see how your
                business is actually doing, stay on top of your taxes, and manage your money obligations without the chaos.
              </p>

              {/* Pros / cons grid */}
              <div className="grid sm:grid-cols-2 gap-5 mt-6">
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #efeeea', borderRadius: '0.25rem', padding: '1.25rem' }}>
                  <p style={{ fontFamily: 'var(--font-body)', color: '#2d6a4f', fontSize: '0.75rem', letterSpacing: '0.06em' }}
                    className="uppercase font-semibold mb-3">Advantages</p>
                  <ul className="flex flex-col gap-2">
                    {['Separates your finances', 'Simpler to keep track', 'Tailor-made for businesses', 'Saves time on bookkeeping', 'Access to credit', 'Looks more professional'].map((a) => (
                      <li key={a} style={{ fontFamily: 'var(--font-body)', color: '#414846', fontSize: '0.875rem' }}
                        className="flex items-start gap-2">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 mt-0.5">
                          <circle cx="7" cy="7" r="7" fill="#2d6a4f" fillOpacity="0.1" />
                          <path d="M4 7l2 2 4-4" stroke="#2d6a4f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #efeeea', borderRadius: '0.25rem', padding: '1.25rem' }}>
                  <p style={{ fontFamily: 'var(--font-body)', color: '#a43d23', fontSize: '0.75rem', letterSpacing: '0.06em' }}
                    className="uppercase font-semibold mb-3">Drawbacks</p>
                  <ul className="flex flex-col gap-2">
                    {['Monthly fees on some accounts', 'Transaction charges may apply', 'Eligibility requirements vary', 'Low interest on balances', 'More admin to open one'].map((d) => (
                      <li key={d} style={{ fontFamily: 'var(--font-body)', color: '#414846', fontSize: '0.875rem' }}
                        className="flex items-start gap-2">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 mt-0.5">
                          <circle cx="7" cy="7" r="7" fill="#a43d23" fillOpacity="0.1" />
                          <path d="M5 5l4 4M9 5l-4 4" stroke="#a43d23" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* ── How to find the right account ─────────────── */}
            <section id="how-to-find" className="mt-12">
              <h2 style={{ fontFamily: 'var(--font-headline)', color: '#001814' }} className="text-2xl font-semibold mb-4">
                How to find the right business account
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {[
                  { label: 'Daily Operations', body: 'How many transactions do you expect? High-volume businesses need accounts with low per-transaction costs.' },
                  { label: 'Global Reach', body: 'If you trade internationally, look for competitive exchange rates and low international transfer fees.' },
                  { label: 'Tech Integrations', body: 'Does the bank sync with your accounting software like Xero, QuickBooks, or FreeAgent?' },
                  { label: 'Customer Support', body: 'Do you need a physical branch or are you happy with 24/7 in-app support?' },
                ].map(({ label, body }) => (
                  <div key={label} style={{ backgroundColor: '#ffffff', border: '1px solid #efeeea', borderRadius: '0.25rem', padding: '1.25rem' }}>
                    <p style={{ fontFamily: 'var(--font-body)', color: '#001814', fontSize: '0.875rem' }} className="font-semibold mb-1">{label}</p>
                    <p style={{ fontFamily: 'var(--font-body)', color: '#414846', fontSize: '0.875rem', lineHeight: 1.6 }}>{body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Finding the best account if you... (DARK) ─── */}
            <section id="switching" className="mt-12 -mx-6">
              <div style={{ backgroundColor: '#001814', padding: '3rem 1.5rem' }}>
                <div className="max-w-none">
                  <h2 style={{ fontFamily: 'var(--font-headline)', color: '#fbf9f5' }} className="text-2xl font-semibold mb-2">
                    Finding the best account if you…
                  </h2>
                  <p style={{ fontFamily: 'var(--font-body)', color: '#adcdc5', fontSize: '0.9375rem' }} className="mb-8">
                    Different businesses have very different needs. Here's how to narrow it down.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-5">
                    {FINDING.map(({ heading, body }) => (
                      <div
                        key={heading}
                        style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '0.25rem', padding: '1.25rem', border: '1px solid rgba(255,255,255,0.08)' }}
                      >
                        <p style={{ fontFamily: 'var(--font-headline)', color: '#ff8162', fontSize: '0.9375rem' }} className="font-semibold mb-1.5">
                          {heading}
                        </p>
                        <p style={{ fontFamily: 'var(--font-body)', color: '#c1c8c5', fontSize: '0.875rem', lineHeight: 1.6 }}>
                          {body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ── FAQs ──────────────────────────────────────── */}
            <section id="faqs" className="mt-12">
              <h2 style={{ fontFamily: 'var(--font-headline)', color: '#001814' }} className="text-2xl font-semibold mb-5">
                Business bank account FAQs
              </h2>
              <div className="flex flex-col" style={{ border: '1px solid #efeeea', borderRadius: '0.25rem', overflow: 'hidden' }}>
                {FAQ.map(({ q, a }, i) => (
                  <details
                    key={q}
                    style={{ borderTop: i > 0 ? '1px solid #efeeea' : 'none' }}
                    className="group"
                  >
                    <summary
                      style={{ fontFamily: 'var(--font-body)', color: '#001814', fontSize: '0.9375rem' }}
                      className="flex items-center justify-between px-5 py-4 cursor-pointer font-medium list-none hover:bg-[#fbf9f5] transition-colors"
                    >
                      {q}
                      <svg className="w-4 h-4 flex-shrink-0 ml-3 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-5 pb-4">
                      <p style={{ fontFamily: 'var(--font-body)', color: '#414846', fontSize: '0.9375rem', lineHeight: 1.7 }}>{a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          </div>

          {/* ── Sidebar ────────────────────────────────────── */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="lg:sticky lg:top-20">
              <PageSidebar />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
