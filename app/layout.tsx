import type { Metadata } from 'next'
import { Manrope, Inter } from 'next/font/google'
import Nav from '@/components/Nav'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ledger — Compare the best UK financial products',
  description:
    'Honest, up-to-date comparisons of the best UK business accounts, payment tools and financial products.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable} h-full antialiased`}>
      <body
        style={{ fontFamily: "'Manrope', 'Inter', system-ui, sans-serif" }}
        className="bg-surface text-on-surface min-h-full flex flex-col"
      >
        <Nav />
        <main className="flex-1">{children}</main>

        {/* Footer — matches Stitch exactly */}
        <footer className="bg-primary text-white mt-16">
          <div className="max-w-[1200px] mx-auto px-4 md:px-16 py-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-2">
              <span className="text-headline-md font-bold text-white block mb-4">Ledger</span>
              <p className="text-body-md text-white/70 max-w-md leading-relaxed">
                © 2026 Ledger. Ledger is a financial comparison platform. Authorised and regulated by the Financial Conduct Authority (FCA). All rights reserved.
              </p>
            </div>
            <div>
              <h6 className="font-semibold text-secondary-container mb-4 text-label-sm uppercase tracking-widest">Platform</h6>
              <ul className="space-y-3">
                {['Terms of Use', 'Privacy Policy', 'Cookie Settings'].map(l => (
                  <li key={l}><a href="#" className="text-white/70 hover:text-white transition-all text-body-md">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h6 className="font-semibold text-secondary-container mb-4 text-label-sm uppercase tracking-widest">Support</h6>
              <ul className="space-y-3">
                {['FCA Disclaimer', 'Contact'].map(l => (
                  <li key={l}><a href="#" className="text-white/70 hover:text-white transition-all text-body-md">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="max-w-[1200px] mx-auto px-4 md:px-16 pb-8">
            <div className="p-6 bg-white/5 rounded-xl border border-white/10 text-label-sm text-white/60">
              <strong>FCA Regulatory Disclosure:</strong> Ledger (UK) Ltd is a credit broker and not a lender, authorised and regulated by the Financial Conduct Authority. We may receive a commission from providers if you take out a product after following a link from our website.
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
