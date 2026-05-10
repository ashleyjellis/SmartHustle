import Link from 'next/link'

const links = [
  { href: '/business-banking', label: 'Business Banking' },
  { href: '/', label: 'Invoice Finance' },
  { href: '/', label: 'Guides' },
]

export default function Nav() {
  return (
    <header className="sticky-nav border-b border-outline-variant bg-surface-container-lowest">
      <div className="flex justify-between items-center h-20 px-4 md:px-16 max-w-[1200px] mx-auto">
        <div className="flex items-center gap-12">
          <Link href="/" className="text-headline-md font-bold tracking-tight text-primary">
            Ledger
          </Link>
          <nav className="hidden md:flex gap-6">
            {links.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="text-on-surface-variant hover:text-secondary transition-colors text-body-md font-semibold"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <button className="hidden md:flex items-center text-on-surface-variant hover:text-primary text-body-md gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" /><path d="M16.5 16.5L21 21" strokeLinecap="round" />
            </svg>
            Search
          </button>
          <Link
            href="/admin/login"
            className="bg-secondary-container text-primary px-6 py-3 rounded-lg text-body-md font-semibold transition-transform active:scale-95 hover:opacity-90"
          >
            Sign In
          </Link>
        </div>
      </div>
    </header>
  )
}
