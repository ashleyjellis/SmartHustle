const TOC = [
  { label: 'Top Recommendations', href: '#top-accounts' },
  { label: 'What is a Business Account?', href: '#what-is' },
  { label: 'How to find the right account', href: '#how-to-find' },
  { label: 'How to switch', href: '#switching' },
  { label: 'Frequently Asked Questions', href: '#faqs' },
]

export default function PageSidebar() {
  return (
    <aside className="flex flex-col gap-5">
      {/* On this page */}
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid rgba(0,24,20,0.10)',
          borderRadius: '0.25rem',
          padding: '1.25rem',
        }}
      >
        <p
          style={{ fontFamily: 'var(--font-body)', color: '#717976', fontSize: '0.6875rem', letterSpacing: '0.07em' }}
          className="uppercase font-semibold mb-3"
        >
          On this page
        </p>
        <ul className="flex flex-col gap-2">
          {TOC.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                style={{ fontFamily: 'var(--font-body)', color: '#414846', fontSize: '0.875rem' }}
                className="hover:text-[#001814] transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Quiz CTA */}
      <div
        style={{ backgroundColor: '#001814', borderRadius: '0.25rem', padding: '1.25rem' }}
      >
        <p
          style={{ fontFamily: 'var(--font-body)', color: '#adcdc5', fontSize: '0.6875rem', letterSpacing: '0.07em' }}
          className="uppercase font-semibold mb-2"
        >
          Start a tailored search
        </p>
        <p
          style={{ fontFamily: 'var(--font-headline)', color: '#ffffff', fontSize: '1rem', lineHeight: 1.4 }}
          className="font-semibold mb-4"
        >
          Take our 5-minute quiz to find the perfect bank for your specific business size and industry.
        </p>
        <a
          href="#"
          style={{
            display: 'block', textAlign: 'center',
            backgroundColor: '#ff8162', color: '#ffffff',
            fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.875rem',
            padding: '0.625rem 1rem', borderRadius: '0.25rem',
          }}
          className="hover:opacity-90 transition-opacity"
        >
          Start Business Quiz
        </a>
      </div>

      {/* Advertisement placeholder */}
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid rgba(0,24,20,0.10)',
          borderRadius: '0.25rem',
          padding: '1.25rem',
        }}
      >
        <p
          style={{ fontFamily: 'var(--font-body)', color: '#717976', fontSize: '0.6875rem', letterSpacing: '0.07em' }}
          className="uppercase font-semibold mb-3"
        >
          Advertisement
        </p>
        <div
          style={{ backgroundColor: '#fbf9f5', borderRadius: '0.25rem', height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <p style={{ fontFamily: 'var(--font-body)', color: '#c1c8c5', fontSize: '0.75rem' }}>Ad space</p>
        </div>
      </div>
    </aside>
  )
}
