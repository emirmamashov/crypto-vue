import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Currency, MarketData, EnrichedCryptoData } from '../types'
import { API_URLS } from '../consts'

export const useCryptoStore = defineStore('crypto', () => {
  const currencies = ref<Currency[]>([])
  const marketData = ref<MarketData[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const lastUpdate = ref<Date | null>(null)

  const fetchCurrencies = async (): Promise<Currency[]> => {
    try {
      const response = await fetch(API_URLS.CURRENCY)
      if (!response.ok) throw new Error('Failed to fetch currencies')
      const data: Currency[] = await response.json()
      console.log('currencies', data)
      currencies.value = data
      return data
    } catch (err) {
      console.warn('Failed to load currencies from API, using fallback data');
      return [];
    }
  }

  const fetchMarketData = async (): Promise<MarketData[]> => {
    try {
      const response = await fetch(API_URLS.MARKET)
      if (!response.ok) throw new Error('Failed to fetch market data')
      const data: MarketData[] = await response.json()
      marketData.value = data
      console.log('marketData', data)
      lastUpdate.value = new Date()
      error.value = null
      return data
    } catch (err) {
      console.warn('Failed to load market data from API, using fallback data')
      return [];
    }
  }

  const refreshData = async (): Promise<void> => {
    loading.value = true
    error.value = null
    try {
      await Promise.all([fetchCurrencies(), fetchMarketData()])
    } catch (err) {
      error.value = 'Failed to refresh data'
    } finally {
      loading.value = false
    }
  }

  const enrichedData = computed<EnrichedCryptoData[]>(() => {
    return marketData.value.map((market: MarketData) => {
      const currency = currencies.value.find((c: Currency) => c.code === market.pair.secondary)
      
      const currentPrice = parseFloat(market.price.last) || 0
      const priceChangePercent = parseFloat(market.price.change.percent) || 0
      const bestBid = parseFloat(market.price.bestBid) || 0
      const bestOffer = parseFloat(market.price.bestOffer) || 0
      const priceChangeAmount = parseFloat(market.price.change.amount) || 0
      const volumePrimary = parseFloat(market.volume.primary) || 0
      const volumeSecondary = parseFloat(market.volume.secondary) || 0
      
      const marketCap = volumePrimary * currentPrice
      
      const priceHistory = market.priceHistory?.map(p => parseFloat(p) || 0) || []
      const high24h = priceHistory.length > 0 ? Math.max(...priceHistory) : currentPrice
      const low24h = priceHistory.length > 0 ? Math.min(...priceHistory) : currentPrice
      
      return {
        symbol: market.pair.primary,
        name: market.pair.primary,
        icon: currency?.icon || market.pair.primary.charAt(0).toUpperCase(),
        current_price: currentPrice,
        price_change_percentage_24h: priceChangePercent,
        market_cap: marketCap,
        total_volume: volumeSecondary,
        high_24h: high24h,
        low_24h: low24h,
        best_bid: bestBid,
        best_offer: bestOffer,
        price_direction: market.price.change.direction,
        price_change_amount: priceChangeAmount,
        volume_primary: volumePrimary,
        volume_secondary: volumeSecondary,
        price_history: priceHistory,
        currency_info: currency
      }
    })
  })

  return {
    currencies,
    marketData,
    loading,
    error,
    lastUpdate,
    enrichedData,
    fetchCurrencies,
    fetchMarketData,
    refreshData
  }
})
