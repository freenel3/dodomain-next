import Link from 'next/link'
import { ArrowLeft, Globe, TrendingUp, Calendar, Mail } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Breadcrumbs from '../../components/Breadcrumbs'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function DomainDetail({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  const domainName = decodeURIComponent(name)
  
  const domain = await prisma.domain.findFirst({
    where: { name: domainName }
  })

  if (!domain) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Header currentPath="/domains" />

      <div className="max-w-2xl mx-auto px-4 py-10">
        <Breadcrumbs 
          items={[
            { label: 'Главная', path: '/' },
            { label: 'Домены', path: '/domains' },
            { label: domain.name }
          ]}
        />

        <Link 
          href="/domains"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors mb-6"
        >
          <ArrowLeft className="w-3 h-3" />
          Назад к доменам
        </Link>

        <div className="border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <span className="px-2 py-0.5 bg-gray-100 text-gray-900 text-xs font-medium">
              {domain.category}
            </span>
            <div className="text-3xl font-bold text-black">
              {domain.price.toLocaleString('ru-RU')} ₽
            </div>
          </div>

          <h1 className="text-4xl font-display font-bold text-black mb-4 tracking-tight">
            {domain.name}
          </h1>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Globe className="w-4 h-4" />
            <span>Доменная зона: {domain.extension}</span>
          </div>

          {domain.description && (
            <p className="text-gray-700 leading-relaxed mb-6">
              {domain.description}
            </p>
          )}

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700">Категория: {domain.category}</span>
            </div>
            {domain.traffic && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700">Трафик: {domain.traffic}</span>
              </div>
            )}
          </div>

          <button className="w-full py-3 bg-black text-white font-medium hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
            <Mail className="w-4 h-4" />
            Запросить цену
          </button>
        </div>

        <div className="border border-gray-200 p-5">
          <h2 className="text-lg font-bold text-black mb-3">О домене</h2>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              Премиум доменное имя {domain.name} идеально подходит для проектов в сфере {domain.category.toLowerCase()}.
            </p>
            <p>
              Короткие и запоминающиеся домены — отличная инвестиция в будущее вашего бизнеса.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
