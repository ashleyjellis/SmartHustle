import HeroSection from '@/components/HeroSection'
import FilterBar from '@/components/FilterBar'
import ProviderCard from '@/components/ProviderCard'
import { getProviders } from '@/lib/providers'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const allProviders = await getProviders()
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

      <div className="max-w-[1140px] mx-auto px-6 py-14">
        {featured.length > 0 && (
          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-headline)', color: '#001814' }}
              className="text-2xl font-semibold mb-1"
            >
              Featured picks
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', color: '#717976' }} className="text-sm mb-7">
              Our top-rated accounts right now.
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((p) => (
                <ProviderCard key={p.id} provider={p} />
              ))}
            </div>
          </section>
        )}

        <section>
          <h2
            style={{ fontFamily: 'var(--font-headline)', color: '#001814' }}
            className="text-2xl font-semibold mb-1"
          >
            All categories
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', color: '#717976' }} className="text-sm mb-7">
            Filter by feature to narrow it down.
          </p>
          <FilterBar providers={allProviders} />
        </section>
      </div>
    </>
  )
}
