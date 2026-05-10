import HeroSection from '@/components/HeroSection'
import FilterBar from '@/components/FilterBar'
import ProviderCard from '@/components/ProviderCard'
import { getProviders } from '@/lib/providers'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  const allProviders = getProviders()
  const featured = allProviders.filter((p) => p.featured)

  return (
    <>
      <HeroSection
        title="Compare the best financial products for UK businesses"
        subtitle="We cut through the noise so you can find accounts, tools, and services that actually fit your business — not just the ones with the biggest marketing budget."
        highlights={[
          "Honest comparisons from providers we've vetted",
          'Fees, features and the real pros and cons',
          'Updated regularly so the data stays useful',
        ]}
      />

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Featured section */}
        {featured.length > 0 && (
          <section className="mb-14">
            <h2 className="text-xl font-bold text-brand-navy mb-6">Featured picks</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((p) => (
                <ProviderCard key={p.id} provider={p} />
              ))}
            </div>
          </section>
        )}

        {/* All providers */}
        <section>
          <h2 className="text-xl font-bold text-brand-navy mb-2">All categories</h2>
          <p className="text-gray-500 text-sm mb-6">Filter by feature to find what fits.</p>
          <FilterBar providers={allProviders} />
        </section>
      </div>
    </>
  )
}
