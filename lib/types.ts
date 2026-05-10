export interface Provider {
  id: string
  name: string
  logo: string
  category: string
  badge?: string
  description: string
  monthlyFee?: string
  cardFee?: string
  transferFee?: string
  tags: string[]
  pros?: string[]
  cons?: string[]
  featured: boolean
  ctaUrl: string
}
