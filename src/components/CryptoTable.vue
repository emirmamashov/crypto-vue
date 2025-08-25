<template>
  <div class="glass-effect rounded-xl overflow-hidden shadow-2xl mb-12">
    <div class="overflow-x-auto mb-8">
      <table class="w-full">
        <thead class="bg-black/30">
          <tr>
            <th class="text-left p-4 text-purple-200 font-semibold">#</th>
            <th class="text-left p-4 text-purple-200 font-semibold">Пара</th>
            <th 
              class="text-right p-4 text-purple-200 font-semibold cursor-pointer hover:text-white transition-colors select-none"
              @click="$emit('sort', 'current_price')"
            >
              <div class="flex items-center justify-end space-x-1">
                <span>Цена</span>
                <div class="w-4 h-4">
                  <svg v-if="getSortIcon('current_price') === 'sort'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                  <svg v-else-if="getSortIcon('current_price') === 'up'" class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                  </svg>
                  <svg v-else class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </th>
            <th class="text-right p-4 text-purple-200 font-semibold">Bid/Offer</th>
            <th 
              class="text-right p-4 text-purple-200 font-semibold cursor-pointer hover:text-white transition-colors select-none"
              @click="$emit('sort', 'price_change_percentage_24h')"
            >
              <div class="flex items-center justify-end space-x-1">
                <span>Изменение</span>
                <div class="w-4 h-4">
                  <svg v-if="getSortIcon('price_change_percentage_24h') === 'sort'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                  <svg v-else-if="getSortIcon('price_change_percentage_24h') === 'up'" class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                  </svg>
                  <svg v-else class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </th>
            <th 
              class="text-right p-4 text-purple-200 font-semibold cursor-pointer hover:text-white transition-colors select-none"
              @click="$emit('sort', 'volume_primary')"
            >
              <div class="flex items-center justify-end space-x-1">
                <span>Объем ({{ cryptoData[0]?.symbol || 'Crypto' }})</span>
                <div class="w-4 h-4">
                  <svg v-if="getSortIcon('volume_primary') === 'sort'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                  <svg v-else-if="getSortIcon('volume_primary') === 'up'" class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                  </svg>
                  <svg v-else class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </th>
            <th 
              class="text-right p-4 text-purple-200 font-semibold cursor-pointer hover:text-white transition-colors select-none"
              @click="$emit('sort', 'volume_secondary')"
            >
              <div class="flex items-center justify-end space-x-1">
                <span>Объем ({{ cryptoData[0]?.currency_info?.code || 'AUD' }})</span>
                <div class="w-4 h-4">
                  <svg v-if="getSortIcon('volume_secondary') === 'sort'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                  <svg v-else-if="getSortIcon('volume_secondary') === 'up'" class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                  </svg>
                  <svg v-else class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </th>
            <th 
              class="text-right p-4 text-purple-200 font-semibold cursor-pointer hover:text-white transition-colors select-none"
              @click="$emit('sort', 'market_cap')"
            >
              <div class="flex items-center justify-end space-x-1">
                <span>Рыночная кап.</span>
                <div class="w-4 h-4">
                  <svg v-if="getSortIcon('market_cap') === 'sort'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                  <svg v-else-if="getSortIcon('market_cap') === 'up'" class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                  </svg>
                  <svg v-else class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(crypto, index) in cryptoData" 
            :key="crypto.symbol"
            class="crypto-card border-b border-purple-500/10 hover:bg-white/5"
          >
            <td class="p-4 text-purple-300">{{ index + 1 }}</td>
            <td class="p-4">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {{ crypto.symbol.charAt(0) }}
                </div>
                <div>
                  <div class="text-white font-semibold">{{ crypto.symbol }}</div>
                  <div class="text-purple-300 text-sm">{{ crypto.symbol }}/{{ crypto.currency_info?.code || 'AUD' }}</div>
                </div>
              </div>
            </td>
            <td class="p-4 text-right">
              <div class="text-white font-semibold">{{ formatPrice(crypto.current_price) }}</div>
            </td>
            <td class="p-4 text-right">
              <div class="text-purple-200 text-sm">
                <div>{{ formatPrice(crypto.best_bid) }}</div>
                <div>{{ formatPrice(crypto.best_offer) }}</div>
              </div>
            </td>
            <td class="p-4 text-right">
              <div 
                class="font-semibold flex items-center justify-end space-x-1"
                :class="crypto.price_direction === 'Up' ? 'price-positive' : 'price-negative'"
              >
                <span class="text-lg">{{ crypto.price_direction === 'Up' ? '↗' : '↘' }}</span>
                <div class="text-right">
                  <div>{{ crypto.price_direction === 'Up' ? '+' : '' }}{{ crypto.price_change_percentage_24h.toFixed(2) }}%</div>
                  <div class="text-xs">({{ formatPrice(crypto.price_change_amount) }})</div>
                </div>
              </div>
            </td>
            <td class="p-4 text-right text-purple-200">{{ formatNumber(crypto.volume_primary) }}</td>
            <td class="p-4 text-right text-purple-200">{{ formatCurrency(crypto.volume_secondary) }}</td>
            <td class="p-4 text-right text-purple-200">{{ formatCurrency(crypto.market_cap) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EnrichedCryptoData, SortField, SortDirection } from '../types'

interface Props {
  cryptoData: EnrichedCryptoData[]
  sortBy: SortField
  sortDirection: SortDirection
}

interface Emits {
  (e: 'sort', field: SortField): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const formatCurrency = (value: number | undefined | null): string => {
  if (value === undefined || value === null || isNaN(value)) {
    return '$0.00'
  }
  
  if (value >= 1e12) {
    return `$${(value / 1e12).toFixed(2)}T`
  } else if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`
  } else if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`
  } else if (value >= 1e3) {
    return `$${(value / 1e3).toFixed(2)}K`
  }
  return `$${value.toFixed(2)}`
}

const formatPrice = (value: number | undefined | null): string => {
  if (value === undefined || value === null || isNaN(value)) {
    return '$0.00'
  }
  
  if (value >= 1) {
    return `$${value.toFixed(2)}`
  } else {
    return `$${value.toFixed(6)}`
  }
}

const formatNumber = (value: number | undefined | null): string => {
  if (value === undefined || value === null || isNaN(value)) {
    return '0'
  }
  
  if (value >= 1e12) return `${(value / 1e12).toFixed(2)}T`
  if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`
  if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`
  if (value >= 1e3) return `${(value / 1e3).toFixed(2)}K`
  return value.toLocaleString(undefined, { maximumFractionDigits: 2 })
}

const getSortIcon = (field: SortField): string => {
  if (props.sortBy !== field) return 'sort'
  return props.sortDirection === 'asc' ? 'up' : 'down'
}
</script>
