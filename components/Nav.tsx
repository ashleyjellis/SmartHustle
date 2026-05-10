import Link from 'next/link'

const links = [
  { href: '/', label: 'Home' },
  { href: '/business-banking', label: 'Business banking' },
]

export default function Nav() {
  return (
    <nav
      style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #efeeea' }}
      className="sticky top-0 z-10"
    >
      <div className="max-w-[1140px] mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          style={{ fontFamily: 'var(--font-headline)', color: '#001814' }}
          className="text-xl font-semibold tracking-tight"
        >
          King<span style={{ color: '#a43d23' }}>Page</span>
        </Link>

        <ul className="flex gap-7 items-center">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                style={{ fontFamily: 'var(--font-body)', color: '#414846' }}
                className="text-sm font-medium hover:text-[#001814] transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
