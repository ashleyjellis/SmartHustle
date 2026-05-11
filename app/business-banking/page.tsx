import Link from 'next/link'
import ProviderList from '@/components/ProviderList'
import PageSidebar from '@/components/PageSidebar'
import { getProviders } from '@/lib/providers'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Best Business Bank Accounts UK 2026 | Ledger',
  description: 'Compare the best business bank accounts in the UK. Honest fees, features and pros and cons — updated May 2026.',
}

const FAQ = [
  {
    q: 'Do I need a business account as a sole trader?',
    a: "Legally, no. You can use your personal account for business transactions if you're a sole trader. However, many personal banks explicitly forbid business use in their terms and conditions, which could lead to your account being closed. It's almost always better to have a dedicated account.",
  },
  {
    q: 'What documents do I need to open an account?',
    a: "Typically, you'll need proof of identity (passport/driving licence), proof of address, your business address, and your Companies House registration number if you're a limited company. Some banks may also ask for an estimate of your annual turnover.",
  },
  {
    q: 'Are digital banks safe?',
    a: "Yes, provided they are regulated. Most digital banks like Monzo and Starling have full UK banking licences, meaning your deposits are protected up to £85,000 by the FSCS. Platforms like Tide are e-money institutions which use safeguarding to protect your funds.",
  },
]

export default function BusinessBankingPage() {
  const providers = getProviders().filter((p) => p.category === 'business-banking')

  return (
    <div className="bg-surface">

      {/* ── Dark Hero ────────────────────────────────────────── */}
      <section className="bg-primary text-white py-12">
        <div className="max-w-[1200px] mx-auto px-4 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 mb-6 text-label-sm font-medium uppercase tracking-wider text-white/60">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-white">Business Banking</span>
              </nav>

              <h1 className="text-display-xl-mobile md:text-display-xl mb-6">
                Best Business Bank Accounts in the UK
              </h1>

              <p className="text-body-lg text-white/80 mb-6 leading-relaxed max-w-2xl">
                Choosing the right banking partner is a pivotal decision for your company's growth.
                We've analysed over 60 providers to bring you an honest, kind, and jargon-free guide
                to the accounts that actually support small businesses.
              </p>

              <div className="flex flex-wrap gap-3 items-center">
                <span className="border border-white/20 font-semibold px-3 py-1 rounded-full text-label-sm bg-secondary-container text-primary">
                  Updated May 2026
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main content ─────────────────────────────────────── */}
      <main className="max-w-[1200px] mx-auto px-4 md:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* ── Left/main column ─────────────────────────────── */}
          <div className="lg:col-span-8 space-y-6">

            <ProviderList providers={providers} />

            {/* ── Editorial sections ───────────────────────── */}
            <div className="mt-16 space-y-16">

              {/* What is a business bank account? */}
              <section id="what-is-it">
                <h2 className="text-headline-lg text-primary mb-6 border-l-4 border-secondary pl-6">
                  What is a business bank account?
                </h2>
                <p className="text-body-lg text-on-surface-variant mb-8 leading-relaxed">
                  A business bank account is specifically designed for your company's financial transactions. While sole traders aren't legally required to have one, keeping your personal and professional finances separate is a hallmark of good business management.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant">
                    <h4 className="text-headline-md text-primary mb-4 flex items-center gap-2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#006783"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
                      Advantages
                    </h4>
                    <ul className="space-y-4">
                      {[
                        ['Professionalism', 'Pay suppliers and receive payments in your business name.'],
                        ['Tax Clarity', 'Simplifies your annual tax return by clearly separating business expenses.'],
                        ['Credit Building', 'Establishes a financial history for your company, essential for future loans.'],
                      ].map(([title, body]) => (
                        <li key={title} className="flex items-start gap-3">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="#006783" className="flex-shrink-0 mt-0.5">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                          <span className="text-body-md text-on-surface-variant">
                            <strong>{title}:</strong> {body}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant">
                    <h4 className="text-headline-md text-primary mb-4 flex items-center gap-2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#ba1a1a"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
                      Drawbacks
                    </h4>
                    <ul className="space-y-4">
                      {[
                        ['Fees', 'Many traditional accounts charge monthly fees or per-transaction costs.'],
                        ['Stricter Checks', 'Opening an account often requires more documentation than a personal one.'],
                        ['Complexity', 'More features can mean a steeper learning curve for some platforms.'],
                      ].map(([title, body]) => (
                        <li key={title} className="flex items-start gap-3">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="#ba1a1a" className="flex-shrink-0 mt-0.5">
                            <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
                          </svg>
                          <span className="text-body-md text-on-surface-variant">
                            <strong>{title}:</strong> {body}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* How to find the right account */}
              <section id="how-to-find">
                <h2 className="text-headline-lg text-primary mb-6 border-l-4 border-secondary pl-6">
                  How to find the right business account
                </h2>
                <div className="space-y-8">
                  <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant">
                    <h3 className="text-headline-md text-primary mb-4">What to consider</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        ['Daily Operations', 'How many transactions do you expect? High-volume businesses need accounts with low per-transaction fees.'],
                        ['Global Reach', 'If you trade internationally, look for competitive exchange rates and low international transfer fees.'],
                        ['Tech Integrations', 'Does the bank sync with your accounting software like Xero, QuickBooks, or FreeAgent?'],
                        ['Customer Support', 'Do you need a physical branch or are you happy with 24/7 in-app support?'],
                      ].map(([title, body]) => (
                        <div key={title} className="space-y-2">
                          <p className="font-semibold text-primary text-body-md">{title}</p>
                          <p className="text-body-md text-on-surface-variant">{body}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dark "Finding the best account" block */}
                  <div className="bg-primary text-white rounded-xl p-6">
                    <h3 className="text-headline-md mb-6">Finding the best account if you...</h3>
                    <div className="space-y-6">
                      {[
                        ['...are a Sole Trader', 'Look for fee-free accounts. Digital challengers like Starling often provide the best value for individuals.'],
                        ['...handle a lot of Cash', 'Traditional high-street banks or Starling (via the Post Office) are your best bets for physical deposits.'],
                        ['...have a bad Credit History', "Explore e-money platforms like Tide or Cashplus, which typically don't require full credit checks for opening."],
                      ].map(([heading, body]) => (
                        <div key={heading as string} className="border-l-2 border-secondary pl-4">
                          <p className="font-semibold text-secondary-container mb-1 text-body-md">{heading}</p>
                          <p className="text-white/80 text-body-md">{body}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Can I switch? */}
              <section id="can-i-switch">
                <div className="bg-surface-container-high p-6 rounded-xl border border-outline-variant">
                  <h2 className="text-headline-lg text-primary mb-6">Can I switch my business account?</h2>
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="md:w-2/3">
                      <p className="text-body-lg text-on-surface-variant mb-6 leading-relaxed">
                        Yes, and it's simpler than you might think. Most UK banks are part of the <strong>Current Account Switch Service (CASS)</strong>. This guarantees your switch will be finished within seven working days, and it's completely free to use.
                      </p>
                      <div className="space-y-4">
                        {[
                          'Choose your new bank and apply for an account.',
                          'Request a switch through CASS once approved.',
                          'Relax. Your old bank transfers everything automatically.',
                        ].map((step, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <span className="bg-primary text-secondary-container w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 mt-1 font-bold">
                              {i + 1}
                            </span>
                            <p className="text-body-md text-on-surface-variant">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="md:w-1/3 bg-surface-container-lowest p-6 rounded-lg border border-outline-variant text-center shadow-sm">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="#006783" className="mx-auto mb-4">
                        <path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
                      </svg>
                      <h4 className="text-headline-md text-primary mb-2">7 Days</h4>
                      <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Switch Guarantee</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* FAQs */}
              <section id="faqs">
                <h2 className="text-headline-lg text-primary mb-8 border-l-4 border-secondary pl-6">
                  Business bank account FAQs
                </h2>
                <div className="space-y-4">
                  {FAQ.map(({ q, a }) => (
                    <details key={q} className="group bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
                      <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-surface-container-low transition-colors list-none">
                        <span className="text-headline-md text-primary">{q}</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                          className="flex-shrink-0 ml-4 transition-transform group-open:rotate-180">
                          <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </summary>
                      <div className="px-6 pb-6 pt-2">
                        <p className="text-body-md text-on-surface-variant leading-relaxed">{a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* ── Sidebar ──────────────────────────────────────── */}
          <PageSidebar />
        </div>
      </main>
    </div>
  )
}
