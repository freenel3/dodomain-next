'use client'

import { useState, useEffect } from 'react'

interface BlogClientProps {
  children: React.ReactNode
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

export function BlogClient({
  children,
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
}: BlogClientProps) {
  const [localCurrentPage, setLocalCurrentPage] = useState(currentPage)

  useEffect(() => {
    setLocalCurrentPage(currentPage)
  }, [currentPage])

  const handlePageChange = (page: number) => {
    setLocalCurrentPage(page)
    const params = new URLSearchParams(window.location.search)
    params.set('page', page.toString())
    window.history.pushState(null, '', `?${params.toString()}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const startIndex = (localCurrentPage - 1) * itemsPerPage + 1
  const endIndex = Math.min(localCurrentPage * itemsPerPage, totalItems)

  return (
    <>
      {/* Results Info */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-xs text-gray-600">
          Показано {startIndex}-{endIndex} из {totalItems} статей
        </div>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {children}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => handlePageChange(localCurrentPage - 1)}
            disabled={localCurrentPage === 1}
            className="px-3 py-1.5 text-xs font-medium border border-gray-200 hover:border-black disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            ←
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1.5 text-xs font-medium border transition-all ${
                page === localCurrentPage
                  ? 'border-black bg-black text-white'
                  : 'border-gray-200 hover:border-black'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(localCurrentPage + 1)}
            disabled={localCurrentPage === totalPages}
            className="px-3 py-1.5 text-xs font-medium border border-gray-200 hover:border-black disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            →
          </button>
        </div>
      )}
    </>
  )
}
