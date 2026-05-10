interface Props {
  title: string
  subtitle: string
  updatedDate?: string
  highlights?: string[]
}

export default function HeroSection({ title, subtitle, updatedDate, highlights }: Props) {
  return (
    <section style={{ backgroundColor: '#001814' }}>
      <div className="max-w-[1140px] mx-auto px-6 py-16 md:py-24">
        {updatedDate && (
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-5"
            style={{ color: '#ff8162', fontFamily: 'var(--font-body)', letterSpacing: '0.08em' }}
          >
            Updated {updatedDate}
          </p>
        )}

        <h1
          style={{ fontFamily: 'var(--font-headline)', color: '#fbf9f5' }}
          className="text-4xl md:text-[3rem] font-semibold leading-[1.1] tracking-[-0.02em] mb-5 max-w-2xl"
        >
          {title}
        </h1>

        <p
          style={{ fontFamily: 'var(--font-body)', color: '#c1c8c5' }}
          className="text-lg leading-relaxed max-w-xl mb-10"
        >
          {subtitle}
        </p>

        {highlights && highlights.length > 0 && (
          <ul className="flex flex-col gap-3">
            {highlights.map((h) => (
              <li
                key={h}
                style={{ fontFamily: 'var(--font-body)', color: '#adcdc5' }}
                className="flex items-start gap-3 text-sm"
              >
                <span style={{ color: '#ff8162' }} className="mt-0.5 flex-shrink-0 font-semibold">
                  →
                </span>
                {h}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
