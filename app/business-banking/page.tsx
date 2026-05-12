import Link from 'next/link'
import ProviderList from '@/components/ProviderList'
import PageSidebar from '@/components/PageSidebar'
import { getProviders } from '@/lib/providers'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Best Business Bank Accounts UK 2026 | Ledger',
  description: 'Compare the best business bank accounts in the UK. Honest fees, features and pros and cons — updated February 2026.',
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
  {
    q: 'Is there a minimum balance on business bank accounts?',
    a: "This varies. Some accounts charge a fee if your balance drops below a certain amount; others don't. Some features may only be available above a certain balance. Always check the terms and conditions before opening.",
  },
  {
    q: 'Do banks charge for business accounts?',
    a: "Most have fees of some kind, though they vary significantly. Some charge a setup fee and then monthly fees; others waive these for a period after opening. Then there are fees tied to specific transactions — bank transfers, cash withdrawals or overseas payments. Compare carefully with your actual usage in mind.",
  },
  {
    q: 'Are business bank accounts protected by the FSCS?',
    a: "The FSCS protects eligible deposits in business bank accounts up to £120,000 if an eligible provider fails. Some providers are e-money firms rather than banks, where different safeguarding measures apply instead of FSCS protection. Always check the protection rules on any account before opening.",
  },
  {
    q: 'Does HMRC check business bank accounts?',
    a: "HMRC can check business bank accounts if it has a justified reason — for example, to confirm your business is paying the right amount of tax. If HMRC believes it has grounds, it can approach your account provider directly for access.",
  },
]

export default async function BusinessBankingPage() {
  const providers = (await getProviders()).filter((p) => p.category === 'business-banking')

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

              <h1 className="text-display-xl-mobile md:text-display-xl mb-4">
                Best Business Bank Accounts UK 2026
              </h1>

              <p className="text-body-lg text-white/80 mb-6 leading-relaxed max-w-2xl">
                Finding the right business bank account can make running a small business easier and save you real time when managing your money.
              </p>

              <span className="inline-block border border-white/20 font-semibold px-3 py-1 rounded-full text-label-sm bg-secondary-container text-primary mb-8">
                Updated 17 February 2026
              </span>

              {/* What this page covers */}
              <div className="mb-8 space-y-2">
                <p className="text-label-sm font-bold uppercase tracking-wider text-white/60 mb-3">What this page covers:</p>
                {[
                  'Compare business current accounts from trusted providers',
                  'See fees, features, and the honest pros and cons',
                  'Find the account that actually suits your business',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#80d9ff" className="flex-shrink-0 mt-0.5">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span className="text-body-md text-white/80">{item}</span>
                  </div>
                ))}
              </div>

              {/* Hero CTAs */}
              <div className="flex flex-wrap gap-4">
                <a href="#top-accounts" className="bg-secondary-container text-primary px-8 py-3 rounded-lg font-bold text-body-md hover:opacity-90 transition-opacity">
                  Compare Accounts
                </a>
                <a href="#what-is-it" className="border-2 border-secondary-container text-secondary-container px-8 py-3 rounded-lg font-bold text-body-md hover:bg-secondary-container/10 transition-colors">
                  Find Out More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Intro strip ──────────────────────────────────────── */}
      <div className="bg-surface-container-low border-b border-outline-variant">
        <div className="max-w-[1200px] mx-auto px-4 md:px-16 py-8">
          <p className="text-body-lg text-on-surface-variant leading-relaxed max-w-3xl">
            A business bank account is a standalone current account built for businesses. Whether you&apos;re a sole trader, a partnership, a limited company, or a charity, a business account helps you keep track of everything coming in and going out. Keep it separate from your personal finances and you&apos;ll find it easier to see how your business is actually doing, stay on top of your taxes, and manage your money obligations without the chaos.
          </p>
        </div>
      </div>

      {/* ── Main content ─────────────────────────────────────── */}
      <main className="max-w-[1200px] mx-auto px-4 md:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* ── Left/main column ─────────────────────────────── */}
          <div className="lg:col-span-8 space-y-6">

            {/* Provider list heading */}
            <div>
              <h2 className="text-headline-lg text-primary mb-2">Our top 10 business bank accounts</h2>
              <p className="text-body-md text-on-surface-variant">
                Each of these products may be one of a range offered by the provider. Always check terms and conditions before applying. Only affiliated products are shown — other products are available.
              </p>
            </div>

            {/* Provider list with filters */}
            <ProviderList providers={providers} />

            {/* ── Editorial sections ───────────────────────── */}
            <div className="mt-16 space-y-16">

              {/* What is a business bank account? */}
              <section id="what-is-it">
                <h2 className="text-headline-lg text-primary mb-6 border-l-4 border-secondary pl-6">
                  What is a business bank account?
                </h2>
                <div className="space-y-4 text-body-lg text-on-surface-variant leading-relaxed">
                  <p>
                    Business bank accounts are essentially current accounts for businesses. They work the same way as personal accounts — it&apos;s just that they&apos;re built around what businesses actually need. At a basic level, you can receive payments from customers, send money to suppliers, pay wages and pay bills.
                  </p>
                  <p>
                    You&apos;ll typically be able to set up direct debits and standing orders, withdraw or deposit cash, and make card payments if your account comes with a business debit card. Most accounts also offer extras like accounting software integration and invoicing and payment tools — things designed to save you time, not just move your money.
                  </p>
                </div>
              </section>

              {/* Do I need one? */}
              <section id="do-i-need-it">
                <h2 className="text-headline-lg text-primary mb-6 border-l-4 border-secondary pl-6">
                  Do I need a business bank account?
                </h2>
                <div className="space-y-4 text-body-lg text-on-surface-variant leading-relaxed mb-8">
                  <p>
                    If your business is set up as a limited company, the answer is yes — it&apos;s a legal requirement. Same goes for limited liability partnerships.
                  </p>
                  <p>
                    If you&apos;re a sole trader or in a general partnership, there&apos;s no legal obligation to have a separate business account. You could use your personal account instead. But even if you don&apos;t have to, there are plenty of reasons it makes sense — especially if you want to keep things clean and save yourself time come tax season.
                  </p>
                </div>

                {/* Pros and cons */}
                <div className="mt-8">
                  <h3 className="text-headline-md text-primary mb-6">What are the pros and cons of a business account for a small business?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant">
                      <p className="text-label-sm text-secondary font-bold uppercase tracking-wider mb-4">Advantages</p>
                      <ul className="space-y-3">
                        {[
                          ['Separates your finances', 'Keeps your personal and business money apart, making both easier to manage.'],
                          ['Simpler to keep track', 'Payments, cashflow, income and expenditure all in one place.'],
                          ['Tailor-made', 'Built for business owners, with features and support that actually fit.'],
                          ['Saves time', 'Separate business records make bookkeeping, accounting and tax filing faster.'],
                          ['Accounting integration', 'Most accounts include or connect to accounting software.'],
                          ['Access to credit', 'Providers often offer overdrafts and business loans to account holders.'],
                          ['Looks professional', 'Your company name on payments and invoices builds credibility.'],
                          ['Builds credit score', 'A dedicated business account helps build your business\'s financial track record.'],
                        ].map(([title, body]) => (
                          <li key={title as string} className="flex items-start gap-2">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="#006783" className="flex-shrink-0 mt-0.5">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                            <span className="text-body-md text-on-surface-variant"><strong>{title}:</strong> {body}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant">
                      <p className="text-label-sm text-error font-bold uppercase tracking-wider mb-4">Potential drawbacks</p>
                      <ul className="space-y-3">
                        {[
                          ['Monthly fees', 'Some accounts charge just for holding one.'],
                          ['Transaction charges', 'There can be fees per transaction, or limits before charges kick in.'],
                          ['Eligibility', 'Different requirements mean you may not qualify for every account.'],
                          ['Low interest', 'Interest on business account balances is often minimal.'],
                          ['More admin', 'You\'ll need to gather the information and paperwork to apply.'],
                        ].map(([title, body]) => (
                          <li key={title as string} className="flex items-start gap-2">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="#ba1a1a" className="flex-shrink-0 mt-0.5">
                              <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
                            </svg>
                            <span className="text-body-md text-on-surface-variant"><strong>{title}:</strong> {body}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* How to find the right account */}
              <section id="how-to-find">
                <h2 className="text-headline-lg text-primary mb-6 border-l-4 border-secondary pl-6">
                  How to find the right business account
                </h2>
                <p className="text-body-lg text-on-surface-variant mb-8 leading-relaxed">
                  The best business bank account depends on your business. Some are aimed at sole traders and startups, others at limited companies. Some suit high-transaction businesses with low per-transaction fees. Others offer overdraft access, or features for international payments.
                </p>

                <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant mb-8">
                  <h3 className="text-headline-md text-primary mb-5">What to consider</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[
                      ['Fees', 'Take all relevant charges into account — monthly fees, transaction charges and overseas fees. Many accounts waive fees for a period when first opening.'],
                      ['Features', 'Make sure the account offers what you actually need around payments, transactions, deposits and international banking.'],
                      ['Extras', 'Check whether it integrates with your accounting software, or offers overdraft access.'],
                      ['Customer support', 'Some accounts are completely app-based, others offer phone or in-branch support. Know which you prefer.'],
                      ['Eligibility', 'Check the qualifying criteria to make sure you have the right type of business and meet any requirements, like minimum turnover or trading history.'],
                    ].map(([title, body]) => (
                      <div key={title as string} className="space-y-1">
                        <p className="font-semibold text-primary text-body-md">{title}</p>
                        <p className="text-body-md text-on-surface-variant">{body}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dark "Finding the best account" block */}
                <div className="bg-primary text-white rounded-xl p-6 mb-8">
                  <h3 className="text-headline-md mb-6">Finding the best account if you&hellip;</h3>
                  <div className="space-y-5">
                    {[
                      ['Are a startup', 'Look for low or no monthly fees, ease of use and great customer service. Keeping costs down matters most when you\'re just getting going. Fee-free accounts from digital providers like Tide and Monzo often appeal to startups for exactly this reason.'],
                      ['Are self-employed or a sole trader', 'A separate business account keeps your personal and business finances apart, making accounting and tax significantly easier. It also looks more professional to customers and suppliers. Features like automatic receipt capture, invoicing tools and categorised expenses are worth prioritising. Accounts from Virgin Money and Monzo, among others, tend to fit the bill.'],
                      ['Are in a partnership', 'A joint business account means everyone can help manage the finances. There\'s openness and transparency between partners, and the burden of managing invoices and expenses is shared. Virgin Money, Barclays and NatWest are among the providers offering joint business accounts.'],
                      ['Have an established business', 'You may benefit from more advanced features — financial management tools, payroll services, dedicated relationship managers, and access to business loans, credit cards or lines of credit. High-street providers like Barclays, NatWest and The Co-operative Bank offer accounts aimed specifically at growing businesses.'],
                      ['Want an overdraft facility', 'Barclays, NatWest and Monzo all offer business overdrafts if you need a financial buffer for cashflow.'],
                      ['Make international payments', 'Digital providers like Revolut and WorldFirst offer multi-currency accounts designed primarily for international businesses.'],
                      ['Want a high-street business bank account', 'Lloyds, Barclays, The Co-operative Bank and Virgin Money all have branch networks if in-person banking matters to you.'],
                      ['Need to deposit cash', 'Most major banks with branches are the obvious starting point. Some online providers also allow cash and cheque deposits via the Post Office or PayPoint — including Monzo and Tide — though charges may apply.'],
                      ['Want a low-cost account', 'There are plenty of business accounts with no monthly fees, including Monzo, Virgin Money and Tide. That said, you\'re unlikely to find one that\'s entirely free across the board — most have charges for certain transactions or if you exceed limits.'],
                    ].map(([heading, body]) => (
                      <div key={heading as string} className="border-l-2 border-secondary pl-4">
                        <p className="font-semibold text-secondary-container mb-1 text-body-md">{heading}</p>
                        <p className="text-white/80 text-body-md">{body}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* How to apply */}
                <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant mb-8">
                  <h3 className="text-headline-md text-primary mb-5">How to apply for a business bank account</h3>
                  <div className="space-y-4 mb-6">
                    {[
                      'Choose the account that best suits your needs from the options above.',
                      'Click \'See Deal\' to head over to your chosen provider.',
                      'Apply directly with the provider — you don\'t need to fill in any forms with us.',
                    ].map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="bg-primary text-secondary-container w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">{i + 1}</span>
                        <p className="text-body-md text-on-surface-variant">{step}</p>
                      </div>
                    ))}
                  </div>
                  <h4 className="text-headline-md text-primary mb-4">What you&apos;ll need to open a business account</h4>
                  <ul className="space-y-2">
                    {[
                      'Proof of your identity: typically your driving licence or passport',
                      'Proof of your address: a recent utility bill, bank statement or council tax bill',
                      'Proof of your business\'s address: usually a utility bill or similar, showing your business trading address',
                      'Contact details: your own and those of your business',
                      'Partner/other director details: names, dates of birth and contact details',
                      'Business details: start date, actual or predicted turnover, and tax information',
                      'Registration documents: tax return or self-assessment registration if you\'re a sole trader, or your Companies House registration number and certificate of incorporation if you\'re a limited company',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-body-md text-on-surface-variant">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#006783" className="flex-shrink-0 mt-0.5">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Business banking insights */}
                <div className="bg-surface-container-high rounded-xl p-6 border border-outline-variant">
                  <h3 className="text-headline-md text-primary mb-5">Business banking insights</h3>
                  <div className="space-y-4">
                    {[
                      '71% of small business owners use a separate business bank account rather than their personal account for their business finances, according to the Current Account Switch Service (CASS).',
                      '70% of small business owners say they would consider switching to a digital-only business bank account.',
                      'Account features that business owners value most include accounting software integration (65%), mobile banking (54%) and fee-free banking (44%), according to CASS.',
                    ].map((stat) => (
                      <div key={stat} className="flex items-start gap-3">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#006783" className="flex-shrink-0 mt-0.5">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        <p className="text-body-md text-on-surface-variant">{stat}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Can I switch? */}
              <section id="can-i-switch">
                <h2 className="text-headline-lg text-primary mb-6 border-l-4 border-secondary pl-6">
                  Can I switch my business account?
                </h2>
                <div className="bg-surface-container-high p-6 rounded-xl border border-outline-variant">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="md:w-2/3 space-y-4">
                      <p className="text-body-lg text-on-surface-variant leading-relaxed">
                        Yes — and it&apos;s worth it if a different account would suit your business better or save you money.
                      </p>
                      <div>
                        <p className="text-body-md font-semibold text-primary mb-2">The main reasons people switch:</p>
                        <ul className="space-y-1">
                          {['Reduce fees', 'Access different features', 'Access other services', 'Earn more interest'].map((r) => (
                            <li key={r} className="flex items-center gap-2 text-body-md text-on-surface-variant">
                              <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <p className="text-body-md text-on-surface-variant leading-relaxed">
                        Switching takes no longer than seven working days through the <strong>Current Account Switch Service (CASS)</strong>. Your new bank handles the heavy lifting — your account balance, regular incoming and outgoing payments, direct debits and standing orders all automatically move across.
                      </p>
                    </div>
                    <div className="md:w-1/3 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant text-center shadow-sm">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="#006783" className="mx-auto mb-4">
                        <path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
                      </svg>
                      <h4 className="text-headline-md text-primary mb-2">7 Days</h4>
                      <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Switch Guarantee</p>
                    </div>
                  </div>
                </div>

                {/* Provider review links */}
                <div className="mt-6 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant">
                  <p className="text-body-md font-semibold text-primary mb-4">Not sure which account suits you? Here are our full reviews:</p>
                  <div className="flex flex-wrap gap-3">
                    {['Barclays', 'Monzo', 'NatWest', 'Revolut', 'The Co-operative Bank', 'Tide', 'Virgin Money', 'Lloyds Bank'].map((name) => (
                      <span key={name} className="bg-surface-container-high text-on-surface-variant text-body-md px-4 py-2 rounded-lg border border-outline-variant hover:border-secondary hover:text-secondary cursor-pointer transition-colors">
                        {name}
                      </span>
                    ))}
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
                        <span className="text-headline-md text-primary pr-4">{q}</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                          className="flex-shrink-0 transition-transform group-open:rotate-180">
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
          <PageSidebar showQuiz={false} showAd={false} />
        </div>
      </main>
    </div>
  )
}
