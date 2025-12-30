'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, SlidersHorizontal, ArrowUpDown, ChevronDown, ChevronUp, X } from 'lucide-react'

// Mock data - будет заменено на реальные данные из API
const mockDomains = [
  { id: 1, name: 'best.ru', price: 2500000, category: 'Премиум', extension: '.ru', registeredYear: '2010', traffic: '3К посещений' },
  { id: 2, name: 'tech.io', price: 1200000, category: 'Технологии', extension: '.io', registeredYear: '2018', traffic: '1.2К посещений' },
  { id: 3, name: 'shop.com', price: 5000000, category: 'Коммерция', extension: '.com', registeredYear: '2015', traffic: '5К посещений' },
  { id: 4, name: 'бизнес.рф', price: 180000, category: 'Бизнес', extension: '.рф', registeredYear: '2019', traffic: '850 посещений' },
  { id: 5, name: 'media.net', price: 890000, category: 'Медиа', extension: '.net', registeredYear: '2016', traffic: '2.1К посещений' },
  { id: 6, name: 'finance.org', price: 2100000, category: 'Бизнес', extension: '.org', registeredYear: '2014', traffic: '4.5К посещений' },
  { id: 7, name: 'crypto.com', price: 15000000, category: 'Технологии', extension: '.com', registeredYear: '2017', traffic: '10К посещений' },
  { id: 8, name: 'travel.ru', price: 750000, category: 'Коммерция', extension: '.ru', registeredYear: '2012', traffic: '1.8К посещений' },
  { id: 9, name: 'health.io', price: 950000, category: 'Технологии', extension: '.io', registeredYear: '2019', traffic: '1.5К посещений' },
  { id: 10, name: 'auto.com', price: 3200000, category: 'Коммерция', extension: '.com', registeredYear: '2013', traffic: '6К посещений' },
  { id: 11, name: 'edu.ru', price: 450000, category: 'Бизнес', extension: '.ru', registeredYear: '2011', traffic: '1.1К посещений' },
  { id: 12, name: 'game.io', price: 680000, category: 'Медиа', extension: '.io', registeredYear: '2020', traffic: '900 посещений' },
]

const categories = ['Все', 'Премиум', 'Бизнес', 'Коммерция', 'Медиа', 'Технологии']
const extensions = ['Все', '.com', '.ru', '.рф', '.io', '.net', '.org']
const sortOptions = [
  { value: 'price-desc', label: 'Цена: по убыванию' },
  { value: 'price-asc', label: 'Цена: по возрастанию' },
  { value: 'name-asc', label: 'Название: А-Я' },
  { value: 'name-desc', label: 'Название: Я-А' },
]

const priceRanges = [
  { label: 'Любая', min: 0, max: Infinity },
  { label: 'до 100 000 ₽', min: 0, max: 100000 },
  { label: '100 000 - 500 000 ₽', min: 100000, max: 500000 },
  { label: '500 000 - 1 000 000 ₽', min: 500000, max: 1000000 },
  { label: '1 000 000 - 5 000 000 ₽', min: 1000000, max: 5000000 },
  { label: 'от 5 000 000 ₽', min: 5000000, max: Infinity },
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Все')
  const [selectedExtension, setSelectedExtension] = useState('Все')
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0])
  const [sortBy, setSortBy] = useState('price-desc')
  const [showFilters, setShowFilters] = useState(false)

  // Фильтрация и сортировка
  let filteredDomains = mockDomains.filter(domain => {
    const matchesSearch = domain.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'Все' || domain.category === selectedCategory
    const matchesExtension = selectedExtension === 'Все' || domain.extension === selectedExtension
    const matchesPrice = domain.price >= selectedPriceRange.min && domain.price <= selectedPriceRange.max
    return matchesSearch && matchesCategory && matchesExtension && matchesPrice
  })

  // Сортировка
  filteredDomains.sort((a, b) => {
    switch (sortBy) {
      case 'price-desc':
        return b.price - a.price
      case 'price-asc':
        return a.price - b.price
      case 'name-asc':
        return a.name.localeCompare(b.name)
      case 'name-desc':
        return b.name.localeCompare(a.name)
      default:
        return 0
    }
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
  }

  const hasActiveFilters = searchQuery || selectedCategory !== 'Все' || selectedExtension !== 'Все' || selectedPriceRange.min !== 0

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('Все')
    setSelectedExtension('Все')
    setSelectedPriceRange(priceRanges[0])
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">Поиск доменов</h1>
          <p className="text-gray-600 font-light">Найдите идеальный домен с помощью расширенного поиска</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Введите имя домена или ключевое слово..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-lg"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center text-gray-700 hover:text-gray-900 font-medium"
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Расширенные фильтры
              {showFilters ? <ChevronUp className="w-5 h-5 ml-2" /> : <ChevronDown className="w-5 h-5 ml-2" />}
            </button>

            {/* Sort */}
            <div className="flex items-center">
              <ArrowUpDown className="w-5 h-5 text-gray-400 mr-2" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Категория</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Extension Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Доменная зона</label>
                <select
                  value={selectedExtension}
                  onChange={(e) => setSelectedExtension(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                >
                  {extensions.map(ext => (
                    <option key={ext} value={ext}>{ext}</option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ценовой диапазон</label>
                <select
                  value={selectedPriceRange.label}
                  onChange={(e) => setSelectedPriceRange(priceRanges.find(r => r.label === e.target.value) || priceRanges[0])}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                >
                  {priceRanges.map(range => (
                    <option key={range.label} value={range.label}>{range.label}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-500">Активные фильтры:</span>
                {searchQuery && (
                  <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    Поиск: {searchQuery}
                    <button
                      onClick={() => setSearchQuery('')}
                      className="ml-2 hover:text-black"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                )}
                {selectedCategory !== 'Все' && (
                  <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    Категория: {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory('Все')}
                      className="ml-2 hover:text-black"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                )}
                {selectedExtension !== 'Все' && (
                  <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    Зона: {selectedExtension}
                    <button
                      onClick={() => setSelectedExtension('Все')}
                      className="ml-2 hover:text-black"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                )}
                {selectedPriceRange.min !== 0 && (
                  <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    Цена: {selectedPriceRange.label}
                    <button
                      onClick={() => setSelectedPriceRange(priceRanges[0])}
                      className="ml-2 hover:text-black"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-600 hover:text-black font-medium"
                >
                  Сбросить все
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Найдено: <span className="font-semibold text-gray-900">{filteredDomains.length}</span> доменов
          </p>
        </div>

        {/* Domain Grid */}
        {filteredDomains.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDomains.map(domain => (
              <Link
                key={domain.id}
                href={`/domains/${domain.name}`}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-display font-medium text-gray-900">{domain.name}</h3>
                    <span className="text-sm text-gray-500 font-light">{domain.extension}</span>
                  </div>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-light">
                    {domain.category}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-light">Год регистрации:</span>
                    <span className="text-gray-900">{domain.registeredYear}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-light">Трафик:</span>
                    <span className="text-gray-900">{domain.traffic}</span>
                  </div>
                </div>

                <div className="text-2xl font-bold text-black">{formatPrice(domain.price)}</div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Домены не найдены</h3>
            <p className="text-gray-600 mb-6 font-light">Попробуйте изменить параметры поиска или фильтры</p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
