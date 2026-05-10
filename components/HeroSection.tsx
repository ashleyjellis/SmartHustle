interface Props {
  title: string
  subtitle: string
  updatedDate?: string
  highlights?: string[]
}

export default function HeroSection({ title, subtitle, updatedDate, highlights }: Props) {
  return (
    <section className="bg-brand-navy text-white">
      <div className="max-w-5xl mx-auto px-6 py-14 md:py-20">
        {updatedDate && (
          <p className="text-sm text-gray-400 mb-3">Updated {updatedDate}</p>
        )}
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4 max-w-2xl">
          {title}
        </h1>
        <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mb-8">
          {subtitle}
        </p>
        {highlights && highlights.length > 0 && (
          <ul className="flex flex-col gap-2">
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-gray-200 text-sm">
                <span className="text-brand-coral mt-0.5 flex-shrink-0">→</span>
                {h}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
