const TOC = [
  { label: 'Top Recommendations', href: '#top-accounts', active: true },
  { label: 'What is a Business Account?', href: '#what-is-it' },
  { label: 'How to find the right account', href: '#how-to-find' },
  { label: 'How to Switch Accounts', href: '#can-i-switch' },
  { label: 'Frequently Asked Questions', href: '#faqs' },
]

export default function PageSidebar() {
  return (
    <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-6">
      {/* On this page */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
        <h5 className="text-headline-md text-primary mb-6">On this page</h5>
        <nav className="space-y-4">
          {TOC.map(({ label, href, active }) => (
            <a
              key={href}
              href={href}
              className={`block transition-all pl-3 border-l-2 text-body-md ${
                active
                  ? 'text-primary font-bold border-secondary hover:translate-x-1'
                  : 'text-on-surface-variant hover:text-primary border-transparent'
              }`}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>

      {/* Quiz CTA */}
      <div className="bg-primary text-white rounded-xl p-6 overflow-hidden relative shadow-md">
        <div className="relative z-10">
          <h5 className="text-headline-md mb-2 text-secondary-container">Need a tailored choice?</h5>
          <p className="text-white/80 text-body-md mb-6">
            Take our 2-minute quiz to find the perfect bank for your specific business size and industry.
          </p>
          <button className="w-full bg-secondary-container text-primary font-bold py-3 rounded-lg hover:opacity-90 transition-opacity text-body-md">
            Start Business Quiz
          </button>
        </div>
        <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-secondary-container/20 rounded-full blur-3xl" />
      </div>

      {/* Advertisement */}
      <div className="bg-surface-container p-6 rounded-xl border border-outline-variant shadow-sm">
        <p className="text-label-sm text-on-surface-variant mb-4 font-bold tracking-widest uppercase">Advertisement</p>
        <div className="bg-white rounded-lg p-4 mb-4 border border-outline-variant/30">
          <p className="text-headline-md text-primary mb-1">Revolut Business</p>
          <p className="text-body-md text-on-surface-variant">Scale globally with multi-currency accounts.</p>
        </div>
        <button className="w-full text-primary font-bold py-2 hover:underline decoration-secondary decoration-2 text-body-md">
          View details
        </button>
      </div>
    </aside>
  )
}
