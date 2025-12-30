
import Link from 'next/link'
import { ArrowRight, Tag } from 'lucide-react'

interface DomainProps {
  name: string
  price: number
  category: string
  extension: string
  isActive?: boolean
  description?: string | null // Allow null
}

export function DomainCard({ domain }: { domain: DomainProps }) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="group relative bg-white border border-gray-200 rounded-lg p-5 hover:border-black transition-all duration-200 hover:shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {domain.category}
        </span>
        <Tag className="w-4 h-4 text-gray-400" />
      </div>
      
      <h3 className="text-xl font-bold font-display text-gray-900 mb-1 leading-tight group-hover:text-black">
        {domain.name}
      </h3>
      
      <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[40px]">
        {domain.description || 'Премиум доменное имя'}
      </p>
      
      <div className="flex items-end justify-between mt-auto">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide">Цена</p>
          <p className="text-lg font-bold text-gray-900">{formatPrice(domain.price)}</p>
        </div>
        
        <Link 
          href={`/domains/${domain.name}`}
          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black text-white transform group-hover:scale-110 transition-transform"
        >
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
