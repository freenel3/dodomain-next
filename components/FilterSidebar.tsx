
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export function FilterSidebar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedExtensions, setSelectedExtensions] = useState<string[]>([])

  const categories = ['Premium', 'Web3', 'DeFi', 'App', 'NFT', 'Infrastructure', 'Business']
  const extensions = ['.com', '.eth', '.io', '.app', '.art', '.net', '.ru', '.org']

  // Sync state with URL params on mount
  useEffect(() => {
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const cats = searchParams.get('categories')?.split(',') || []
    const exts = searchParams.get('extensions')?.split(',') || []

    if (minPrice && maxPrice) setPriceRange([Number(minPrice), Number(maxPrice)])
    if (cats.length) setSelectedCategories(cats)
    if (exts.length) setSelectedExtensions(exts)
  }, [searchParams])

  const applyFilters = () => {
    const params = new URLSearchParams()
    params.set('minPrice', priceRange[0].toString())
    params.set('maxPrice', priceRange[1].toString())
    if (selectedCategories.length) params.set('categories', selectedCategories.join(','))
    if (selectedExtensions.length) params.set('extensions', selectedExtensions.join(','))
    
    router.push(`/domains?${params.toString()}`)
  }

  const toggleCategory = (cat: string) => {
    const newCats = selectedCategories.includes(cat)
      ? selectedCategories.filter(c => c !== cat)
      : [...selectedCategories, cat]
    setSelectedCategories(newCats)
  }

  const toggleExtension = (ext: string) => {
    const newExts = selectedExtensions.includes(ext)
      ? selectedExtensions.filter(e => e !== ext)
      : [...selectedExtensions, ext]
    setSelectedExtensions(newExts)
  }

  return (
    <div className="bg-white p-5 border border-gray-200 rounded-lg">
      <h3 className="font-display font-bold text-lg mb-4">Фильтры</h3>
      
      {/* Categories */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-2">Категории</h4>
        <div className="space-y-2">
          {categories.map(cat => (
            <label key={cat} className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
              <input 
                type="checkbox" 
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="rounded border-gray-300 text-black focus:ring-black"
              />
              <span>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Extensions */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-2">Зоны</h4>
        <div className="grid grid-cols-2 gap-2">
          {extensions.map(ext => (
            <label key={ext} className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
              <input 
                type="checkbox" 
                checked={selectedExtensions.includes(ext)}
                onChange={() => toggleExtension(ext)}
                className="rounded border-gray-300 text-black focus:ring-black"
              />
              <span>{ext}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-2">Цена (RUB)</h4>
        <div className="flex items-center space-x-2">
          <input 
            type="number" 
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            className="w-full px-2 py-1 border rounded text-sm"
            placeholder="Min"
          />
          <span>-</span>
          <input 
            type="number" 
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full px-2 py-1 border rounded text-sm"
            placeholder="Max"
          />
        </div>
      </div>

      <button 
        onClick={applyFilters}
        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
      >
        Применить
      </button>
    </div>
  )
}
