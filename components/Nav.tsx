import Link from 'next/link'

const links = [
  { href: '/business-banking', label: 'Business Banking' },
  { href: '/', label: 'Invoice Finance' },
  { href: '/', label: 'Guides' },
]

export default function Nav() {
  return (
    <nav
      style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #efeeea' }}
      className="sticky top-0 z-10"
    >
      <div className="max-w-[1140px] mx-auto px-6 h-14 flex items-center gap-8">
        {/* Brand */}
        <Link
          href="/"
          style={{ fontFamily: 'var(--font-headline)', color: '#001814' }}
          className="text-xl font-semibold tracking-tight flex-shrink-0"
        >
          Ledger
        </Link>

        {/* Nav links */}
        <ul className="hidden md:flex gap-6 items-center">
          {links.map(({ href, label }) => (
            <li key={label}>
              <Link
                href={href}
                style={{ fontFamily: 'var(--font-body)', color: '#414846', fontSize: '0.875rem' }}
                className="font-medium hover:text-[#001814] transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-3">
          <button
            aria-label="Search"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#414846', padding: '0.25rem' }}
            className="hover:text-[#001814] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M16.5 16.5L21 21" strokeLinecap="round" />
            </svg>
          </button>

          <Link
            href="/admin/login"
            style={{
              fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem',
              color: '#ffffff', backgroundColor: '#a43d23',
              padding: '0.375rem 1rem', borderRadius: '0.25rem',
              display: 'inline-block',
            }}
            className="hover:opacity-90 transition-opacity"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  )
}
