export interface Provider {
  id: string
  name: string
  logo: string
  category: string
  badge?: string
  description: string
  verdict?: string
  rating?: number
  bestFor?: string
  monthlyFee?: string
  cardFee?: string
  transferFee?: string
  features?: string[]
  eligibility?: string
  welcomePromo?: string
  tags: string[]
  pros?: string[]
  cons?: string[]
  featured: boolean
  ctaUrl: string
}
