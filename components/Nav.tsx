import Link from 'next/link'

const links = [
  { href: '/', label: 'Home' },
  { href: '/business-banking', label: 'Business banking' },
]

export default function Nav() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-brand-navy text-lg tracking-tight">
          King<span className="text-brand-coral">Page</span>
        </Link>
        <ul className="flex gap-6">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-sm text-gray-600 hover:text-brand-navy font-medium transition-colors"
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
