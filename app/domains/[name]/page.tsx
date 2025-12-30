
import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Calendar, Activity, Globe } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const prisma = new PrismaClient()

async function getDomain(name: string) {
  const decodedName = decodeURIComponent(name)
  const domain = await prisma.domain.findUnique({
    where: { name: decodedName },
  })
  return domain
}

export async function generateMetadata(props: { params: Promise<{ name: string }> }) {
  const params = await props.params;
  const decodedName = decodeURIComponent(params.name)
  return {
    title: `${decodedName} - Купить домен | dodomain`,
    description: `Купить премиум домен ${decodedName}. Безопасная сделка, мгновенная передача.`,
  }
}

export default async function DomainPage(props: { params: Promise<{ name: string }> }) {
  const params = await props.params;
  const domain = await getDomain(params.name)

  if (!domain) {
    notFound()
  }

  const stats = [
    { label: 'Год регистрации', value: domain.registeredYear, icon: Calendar },
    { label: 'Трафик', value: domain.traffic, icon: Activity },
    { label: 'Категория', value: domain.category, icon: CheckCircle },
    { label: 'Зона', value: domain.extension, icon: Globe },
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        
        <div className="text-center mb-12">
          <span className="inline-block py-1 px-3 rounded-full bg-gray-100 text-sm font-medium text-gray-800 mb-4">
            Available Now
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-4 tracking-tight">
            {domain.name}
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            {domain.description || 'Премиум доменное имя доступно для мгновенной покупки.'}
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">Стоимость сейчас</p>
              <p className="text-4xl font-bold text-black">
                {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(domain.price)}
              </p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <Link href={`/contact?domain=${domain.name}&type=buy`} className="flex-1 md:flex-none">
                <Button size="lg" className="w-full md:w-auto">Купить сейчас</Button>
              </Link>
              <Link href={`/contact?domain=${domain.name}&type=offer`} className="flex-1 md:flex-none">
                <Button variant="outline" size="lg" className="w-full md:w-auto">Сделать оффер</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="p-4 bg-white border border-gray-100 rounded-lg shadow-sm">
              <stat.icon className="w-5 h-5 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
              <p className="font-semibold text-gray-900">{stat.value || 'N/A'}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-gray-100 pt-16">
          <h3 className="text-2xl font-bold mb-6">Почему стоит купить этот домен?</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-2">Мгновенный авторитет</h4>
              <p className="text-gray-600">Премиум-домен мгновенно повышает доверие к вашему бренду и упрощает маркетинг.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">SEO Преимущество</h4>
              <p className="text-gray-600">Старые домены с историей лучше индексируются поисковыми системами.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">Инвестиционная ценность</h4>
              <p className="text-gray-600">Цифровые активы такого уровня имеют тенденцию к росту в цене.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">Безопасная передача</h4>
              <p className="text-gray-600">Мы используем безопасные механизмы трансфера и даем гарантии сделки.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
