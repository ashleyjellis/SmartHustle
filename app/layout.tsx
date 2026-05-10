import type { Metadata } from 'next'
import { Newsreader, Be_Vietnam_Pro } from 'next/font/google'
import Nav from '@/components/Nav'
import './globals.css'

const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '600'],
  variable: '--font-headline',
  display: 'swap',
})

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'KingPage — Compare the best UK financial products',
  description:
    'Honest, up-to-date comparisons of the best UK business accounts, payment tools and financial products.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${beVietnamPro.variable} h-full antialiased`}>
      <body
        style={{ fontFamily: 'var(--font-body)' }}
        className="bg-[#fbf9f5] text-[#1b1c1a] min-h-full flex flex-col"
      >
        <Nav />
        <main className="flex-1">{children}</main>
        <footer className="bg-[#001814] text-[#c1c8c5] text-sm py-12 mt-16">
          <div className="max-w-[1140px] mx-auto px-6">
            <p
              style={{ fontFamily: 'var(--font-headline)' }}
              className="text-white text-lg font-semibold mb-1"
            >
              KingPage
            </p>
            <p>Independent comparisons for UK businesses. Always check terms before applying.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
