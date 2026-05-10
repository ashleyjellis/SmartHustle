import HeroSection from '@/components/HeroSection'
import FilterBar from '@/components/FilterBar'
import { getProviders } from '@/lib/providers'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Best Business Bank Accounts UK 2026 | KingPage',
  description: 'Compare the best business bank accounts in the UK. Honest fees, features and pros and cons — updated February 2026.',
}

export default function BusinessBankingPage() {
  const providers = getProviders().filter((p) => p.category === 'business-banking')

  return (
    <>
      <HeroSection
        title="Best Business Bank Accounts UK 2026"
        subtitle="Finding the right business bank account can make running a small business easier and save you real time when managing your money."
        updatedDate="17 February 2026"
        highlights={[
          'Compare business current accounts from trusted providers',
          'See fees, features, and the honest pros and cons',
          'Find the account that actually suits your business',
        ]}
      />

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h2 className="text-xl font-bold text-brand-navy mb-2">Our top 10 business bank accounts</h2>
          <p className="text-gray-500 text-sm">
            Each of these products may be one of a range offered by the provider. Always check terms and
            conditions before applying. Only affiliated products are shown — other products are available.
          </p>
        </div>

        <FilterBar providers={providers} />

        {/* Long-form editorial content */}
        <article className="mt-16 prose prose-gray max-w-none">
          <h2>What is a business bank account?</h2>
          <p>
            Business bank accounts are essentially current accounts for businesses. They work the same way as
            personal accounts — it's just that they're built around what businesses actually need. At a basic
            level, you can receive payments from customers, send money to suppliers, pay wages and pay bills.
          </p>
          <p>
            You'll typically be able to set up direct debits and standing orders, withdraw or deposit cash,
            and make card payments if your account comes with a business debit card. Most accounts also offer
            extras like accounting software integration and invoicing and payment tools — things designed to
            save you time, not just move your money.
          </p>

          <h2>Do I need a business bank account?</h2>
          <p>
            If your business is set up as a limited company, the answer is yes — it's a legal requirement.
            Same goes for limited liability partnerships.
          </p>
          <p>
            If you're a sole trader or in a general partnership, there's no legal obligation to have a
            separate business account. You could use your personal account instead. But even if you don't
            have to, there are plenty of reasons it makes sense — especially if you want to keep things
            clean and save yourself time come tax season.
          </p>

          <blockquote>
            <p>
              "I opened a business bank account out of necessity, to make my life easier. It means I can
              separate my business expenses from my personal bills, which helps when I'm doing my tax or
              sending documents to my accountant. Overall it makes things a lot more clear cut."
            </p>
            <footer>— Christopher Kelly, founder of Kelly's Coaching</footer>
          </blockquote>

          <h2>How to find the right business account</h2>
          <p>The best business bank account depends on your business. What to consider:</p>
          <ul>
            <li><strong>Fees</strong> — monthly fees, transaction charges and overseas fees. Many accounts waive fees for a period when first opening.</li>
            <li><strong>Features</strong> — payments, transactions, deposits and international banking.</li>
            <li><strong>Extras</strong> — accounting software integration, overdraft access.</li>
            <li><strong>Customer support</strong> — app-only, phone or in-branch. Know which you prefer.</li>
            <li><strong>Eligibility</strong> — minimum turnover, trading history, business type.</li>
          </ul>

          <h2>Business banking insights</h2>
          <ul>
            <li>71% of small business owners use a separate business bank account, according to the Current Account Switch Service (CASS).</li>
            <li>70% of business owners would consider an online-only business bank account, according to our own NerdWallet UK survey.</li>
            <li>Account features valued most: accounting software integration (65%), mobile banking (54%) and fee-free banking (44%).</li>
          </ul>

          <h2>Are business bank accounts protected by the FSCS?</h2>
          <p>
            The FSCS protects eligible deposits in business bank accounts up to £120,000 if an eligible
            provider fails. Some providers are e-money firms rather than banks, where different safeguarding
            measures apply instead of FSCS protection. Always check the protection rules on any account
            before opening.
          </p>
        </article>
      </div>
    </>
  )
}
