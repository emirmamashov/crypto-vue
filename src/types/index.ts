export interface Currency {
  code: string
  sort_order: number
  ticker: string
  type: string
  decimals_places: number
  icon: string
}

export interface Pair {
  primary: string
  secondary: string
}

export interface Price {
  last: string
  bestBid: string
  bestOffer: string
  change: {
    direction: 'Up' | 'Down'
    percent: string
    amount: string
  }
}

export interface Volume {
  primary: string
  secondary: string
}

export interface MarketData {
  pair: Pair
  price: Price
  volume: Volume
  priceHistory?: string[]
}

export interface EnrichedCryptoData {
  symbol: string
  name: string
  icon: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
  high_24h: number
  low_24h: number
  best_bid: number
  best_offer: number
  price_direction: 'Up' | 'Down'
  price_change_amount: number
  volume_primary: number
  volume_secondary: number
  price_history?: number[]
  currency_info?: Currency
}

export type SortField = 'current_price' | 'price_change_percentage_24h' | 'market_cap' | 'total_volume' | 'volume_primary' | 'volume_secondary'
export type SortDirection = 'asc' | 'desc'

export interface ApiResponse<T> {
  data: T
  success: boolean
  error?: string
}

export interface LoadingState {
  loading: boolean
  error: string | null
  lastUpdate: Date | null
}
