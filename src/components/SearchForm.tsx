'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

export function SearchForm() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/domains?search=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      router.push('/domains')
    }
  }

  const handleExtensionClick = (extension: string) => {
    router.push(`/domains?extension=${encodeURIComponent(extension)}`)
  }

  return (
    <>
      <form onSubmit={handleSearch} className="mb-3">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Поиск домена..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2.5 bg-white border border-gray-300 text-black text-sm placeholder-gray-500 focus:outline-none focus:border-black transition-all"
          />
        </div>
      </form>
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <span className="text-xs text-gray-600 mr-2">Популярные зоны:</span>
        {['.ru', '.рф', '.com', '.онлайн', '.москва', '.net'].map((ext) => (
          <button
            key={ext}
            type="button"
            onClick={() => handleExtensionClick(ext)}
            className="px-3 py-1 bg-gray-100 text-black text-xs font-medium hover:bg-black hover:text-white transition-all"
          >
            {ext}
          </button>
        ))}
      </div>
    </>
  )
}
