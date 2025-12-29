'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, ArrowRight } from 'lucide-react'

export default function HeroSection() {
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

  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-4 leading-tight">
          Найдите идеальное доменное имя
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Покупайте и продавайте премиум-домены на крупнейшей площадке
        </p>
        
        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-3">
          <div className="relative">
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

        {/* Popular Extensions */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <span className="text-xs text-gray-600 mr-2">Популярные зоны:</span>
          <Link 
            href="/domains?extension=.ru" 
            className="px-3 py-1 bg-gray-100 text-black text-xs font-medium hover:bg-black hover:text-white transition-all"
          >
            .ru
          </Link>
          <Link 
            href="/domains?extension=.рф" 
            className="px-3 py-1 bg-gray-100 text-black text-xs font-medium hover:bg-black hover:text-white transition-all"
          >
            .рф
          </Link>
          <Link 
            href="/domains?extension=.com" 
            className="px-3 py-1 bg-gray-100 text-black text-xs font-medium hover:bg-black hover:text-white transition-all"
          >
            .com
          </Link>
          <Link 
            href="/domains?extension=.онлайн" 
            className="px-3 py-1 bg-gray-100 text-black text-xs font-medium hover:bg-black hover:text-white transition-all"
          >
            .онлайн
          </Link>
          <Link 
            href="/domains?extension=.москва" 
            className="px-3 py-1 bg-gray-100 text-black text-xs font-medium hover:bg-black hover:text-white transition-all"
          >
            .москва
          </Link>
          <Link 
            href="/domains?extension=.net" 
            className="px-3 py-1 bg-gray-100 text-black text-xs font-medium hover:bg-black hover:text-white transition-all"
          >
            .net
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/domains"
            className="px-5 py-2 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all inline-flex items-center gap-2"
          >
            Смотреть домены
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/sell-domain"
            className="px-5 py-2 bg-white border border-black text-black text-sm font-medium hover:bg-gray-50 transition-all"
          >
            Продать домен
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
        <div className="text-center">
          <div className="text-3xl font-bold text-black mb-1">500К+</div>
          <div className="text-xs text-gray-600 uppercase tracking-wide font-medium">
            Премиум доменов
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-black mb-1">5К+</div>
          <div className="text-xs text-gray-600 uppercase tracking-wide font-medium">
            Активных покупателей
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-black mb-1">$50М+</div>
          <div className="text-xs text-gray-600 uppercase tracking-wide font-medium">
            Общие продажи
          </div>
        </div>
      </div>
    </section>
  )
}
