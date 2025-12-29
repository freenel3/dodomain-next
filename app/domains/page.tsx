import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const metadata = {
  title: 'Премиум домены - dodomain',
  description: 'Каталог премиум доменов для вашего бизнеса'
}

export default async function DomainsPage() {
  // Fetch domains from database
  const domains = await prisma.domain.findMany({
    orderBy: { price: 'desc' }
  })

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">Каталог доменов</h1>
        <p className="text-gray-600">
          Найдено {domains.length} премиум доменов
        </p>
      </div>

      {domains.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">
            Домены еще не добавлены в базу данных.
          </p>
          <p className="text-sm text-gray-500">
            Используйте Prisma Studio для добавления доменов:
            <code className="block mt-2 bg-gray-100 p-2 rounded">
              npx prisma studio
            </code>
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {domains.map((domain) => (
            <Link
              key={domain.id}
              href={`/domains/${domain.name}`}
              className="block border border-gray-200 p-4 hover:border-black transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-black mb-1">
                    {domain.name}
                  </h2>
                  <p className="text-sm text-gray-600 mb-2">
                    {domain.description || 'Премиум домен'}
                  </p>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-gray-100 text-xs font-medium text-black">
                      {domain.category}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-xs font-medium text-black">
                      {domain.extension}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-black">
                    {domain.price.toLocaleString('ru-RU')}₽
                  </div>
                  {domain.traffic && (
                    <div className="text-xs text-gray-600 mt-1">
                      {domain.traffic}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
