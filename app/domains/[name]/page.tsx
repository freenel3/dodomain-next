import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Globe, TrendingUp } from 'lucide-react'

interface Props {
  params: { name: string }
}

export async function generateMetadata({ params }: Props) {
  const domain = await prisma.domain.findUnique({
    where: { name: params.name },
  })

  if (!domain) {
    return {
      title: 'Домен не найден',
    }
  }

  return {
    title: `${domain.name} - ${domain.price.toLocaleString('ru-RU')}₽ - dodomain`,
    description: domain.description || `Купить домен ${domain.name}`,
  }
}

export default async function DomainDetailPage({ params }: Props) {
  const domain = await prisma.domain.findUnique({
    where: { name: params.name },
  })

  if (!domain) {
    notFound()
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Link href="/domains" className="hover:text-black">
            Домены
          </Link>
          <span>/</span>
          <span className="text-black">{domain.name}</span>
        </div>
        
        <h1 className="text-4xl font-bold text-black mb-2">{domain.name}</h1>
        
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-black text-white text-xs font-medium">
            {domain.category}
          </span>
          <span className="px-3 py-1 bg-gray-100 text-black text-xs font-medium">
            {domain.extension}
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="bg-gray-50 border border-gray-200 p-6 mb-8">
        <div className="text-sm text-gray-600 mb-2">Цена</div>
        <div className="text-4xl font-bold text-black mb-4">
          {domain.price.toLocaleString('ru-RU')}₽
        </div>
        <Link
          href="/contact"
          className="block text-center px-6 py-3 bg-black text-white font-medium hover:bg-gray-800 transition-all"
        >
          Купить домен
        </Link>
      </div>

      {/* Description */}
      {domain.description && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-black mb-3">Описание</h2>
          <p className="text-gray-600 leading-relaxed">{domain.description}</p>
        </div>
      )}

      {/* Details */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-black mb-4">Детали домена</h2>
        
        <div className="space-y-3">
          {domain.registeredYear && (
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <div className="text-sm text-gray-600">Год регистрации</div>
                <div className="font-medium text-black">{domain.registeredYear}</div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-gray-400" />
            <div>
              <div className="text-sm text-gray-600">Зона</div>
              <div className="font-medium text-black">{domain.extension}</div>
            </div>
          </div>

          {domain.traffic && (
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-gray-400" />
              <div>
                <div className="text-sm text-gray-600">Посещаемость</div>
                <div className="font-medium text-black">{domain.traffic}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-black p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">
          Заинтересовал этот домен?
        </h2>
        <p className="text-gray-300 mb-6">
          Свяжитесь с нами для обсуждения покупки
        </p>
        <Link
          href="/contact"
          className="inline-block px-6 py-3 bg-white text-black font-medium hover:bg-gray-100 transition-all"
        >
          Связаться с нами
        </Link>
      </div>
    </div>
  )
}
