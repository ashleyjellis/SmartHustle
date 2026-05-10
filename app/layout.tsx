import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Nav from '@/components/Nav'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KingPage — Compare the best UK financial products',
  description: 'Honest, up-to-date comparisons of the best UK business accounts, payment tools and financial products.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${inter.className} bg-gray-50 text-gray-900 min-h-full flex flex-col`}>
        <Nav />
        <main className="flex-1">{children}</main>
        <footer className="bg-brand-navy text-gray-400 text-sm py-10 mt-16">
          <div className="max-w-5xl mx-auto px-6">
            <p className="font-semibold text-white mb-1">KingPage</p>
            <p>Independent comparisons for UK businesses. Always check terms before applying.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
