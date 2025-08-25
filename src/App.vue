<template>
  <div class="min-h-screen">
    <header class="glass-effect border-b border-purple-500/20 sticky top-0 z-50">
      <div class="container-custom py-6">
        <div class="flex-between flex-wrap gap-4 pt-2 pb-2">
          <div class="flex-center space-x-3">
            <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex-center shadow-lg">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-white gradient-text">Crypto Market</h1>
              <p class="text-purple-200/80">Отслеживание криптовалют в реальном времени</p>
            </div>
          </div>
          
          <div class="flex-center space-x-2">
            <button
              @click="store.refreshData"
              :disabled="store.loading"
              class="btn"
            >
              <svg 
                class="w-4 h-4" 
                :class="{ 'animate-spin': store.loading }" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Обновить</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="container-custom py-8">
      <div class="mt-8 mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div class="relative flex-1 max-w-md">
          <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Поиск криптовалют..."
            v-model="searchTerm"
            class="input input-search w-full"
          />
        </div>

        <div v-if="store.lastUpdate" class="flex-center space-x-2 text-purple-200">
          <svg class="w-4 h-4 animate-pulse-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span class="text-sm">
            Обновлено: {{ store.lastUpdate.toLocaleTimeString() }}
          </span>
        </div>
      </div>

      <div v-if="store.error" class="notification notification-error">
        <div class="notification-content">
          <svg class="notification-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ store.error }}</span>
        </div>
      </div>

      <div v-if="store.loading && !store.marketData.length" class="space-y-4">
        <div v-for="i in 5" :key="i" class="loading-skeleton">
          <div class="skeleton-content">
            <div class="skeleton-icon"></div>
            <div class="skeleton-text">
              <div class="skeleton-line"></div>
              <div class="skeleton-line"></div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!store.loading && filteredAndSortedData.length > 0" class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">{{ filteredAndSortedData.length }}</div>
          <div class="stat-label">Всего криптовалют</div>
        </div>
        <div class="stat-card positive">
          <div class="stat-value">
            {{ filteredAndSortedData.filter(c => c.price_direction === 'Up').length }}
          </div>
          <div class="stat-label">Растут в цене</div>
        </div>
        <div class="stat-card negative">
          <div class="stat-value">
            {{ filteredAndSortedData.filter(c => c.price_direction === 'Down').length }}
          </div>
          <div class="stat-label">Падают в цене</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">
            {{ formatCurrency(filteredAndSortedData.reduce((sum, c) => sum + (c.market_cap || 0), 0)) }}
          </div>
          <div class="stat-label">Общая капитализация</div>
        </div>
      </div>

      <CryptoTable 
        :crypto-data="filteredAndSortedData"
        :sort-by="sortBy"
        :sort-direction="sortDirection"
        @sort="handleSort"
      />

      <div v-if="!store.loading && filteredAndSortedData.length === 0" class="text-center py-12">
        <div class="glass-effect rounded-xl p-8">
          <svg class="mx-auto w-16 h-16 text-purple-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0012 15c-2.34 0-4.467.901-6.03 2.378l-1.586-1.586A9.953 9.953 0 0112 13c3.373 0 6.267 1.676 8.016 4.23l-1.586 1.586C16.467 16.901 14.34 16 12 16z" />
          </svg>
          <h3 class="text-xl font-semibold text-white mb-2">Результаты не найдены</h3>
          <p class="text-purple-200">Попробуйте изменить поисковый запрос</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useCryptoStore } from './stores/crypto'
import CryptoTable from './components/CryptoTable.vue'
import type { SortField, SortDirection, EnrichedCryptoData } from './types'
import { REFRESH_INTERVAL } from './consts'

const store = useCryptoStore()
const searchTerm = ref<string>('')
const sortBy = ref<SortField>('market_cap')
const sortDirection = ref<SortDirection>('desc')
const refreshInterval = ref<NodeJS.Timeout | null>(null)

const filteredAndSortedData = computed<EnrichedCryptoData[]>(() => {
  let filtered = store.enrichedData.filter((item: EnrichedCryptoData) =>
    item.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    item.symbol.toLowerCase().includes(searchTerm.value.toLowerCase())
  )

  filtered.sort((a: EnrichedCryptoData, b: EnrichedCryptoData) => {
    const aVal = a[sortBy.value] || 0
    const bVal = b[sortBy.value] || 0
    return sortDirection.value === 'desc' ? bVal - aVal : aVal - bVal
  })

  return filtered
})

const formatCurrency = (value: number): string => {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`
  if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`
  return `$${value.toFixed(2)}`
}

const handleSort = (field: SortField): void => {
  if (sortBy.value === field) {
    sortDirection.value = sortDirection.value === 'desc' ? 'asc' : 'desc'
  } else {
    sortBy.value = field
    sortDirection.value = 'desc'
  }
}

const setupAutoRefresh = (): void => {
  if (refreshInterval.value) {
    clearInterval(refreshInterval.value)
  }
  
  refreshInterval.value = setInterval(() => {
    store.fetchMarketData()
  }, REFRESH_INTERVAL);
}

onMounted(() => {
  store.refreshData()
  setupAutoRefresh()
})

onUnmounted(() => {
  if (refreshInterval.value) {
    clearInterval(refreshInterval.value)
  }
})
</script>
