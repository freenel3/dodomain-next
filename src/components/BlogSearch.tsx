'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface BlogSearchProps {
  initialValue?: string
}

export function BlogSearch({ initialValue = '' }: BlogSearchProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchValue, setSearchValue] = useState(initialValue)

  useEffect(() => {
    setSearchValue(initialValue)
  }, [initialValue])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    if (searchValue.trim()) {
      params.set('search', searchValue.trim())
    } else {
      params.delete('search')
    }
    params.delete('page')
    router.push(`?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <input
        type="text"
        placeholder="Поиск статей..."
        value={searchValue}
        onChange={handleChange}
        className="w-full px-4 py-3 text-sm border-2 border-gray-800 rounded focus:outline-none focus:border-blue-500 bg-white"
      />
    </form>
  )
}
