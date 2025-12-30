
import { getFilteredDomains } from '@/lib/getDomains'
import { DomainCard } from '@/components/DomainCard'
import { FilterSidebar } from '@/components/FilterSidebar'
import { Suspense } from 'react'

export const metadata = {
  title: 'Каталог доменов | dodomain',
  description: 'Выберите премиум домен для вашего бизнеса',
}

export default async function DomainsPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const domains = await getFilteredDomains(searchParams || {})

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">Каталог доменов</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Suspense fallback={<div>Загрузка фильтров...</div>}>
              <FilterSidebar />
            </Suspense>
          </div>

          {/* Domain Grid */}
          <div className="lg:col-span-3">
             <div className="mb-4 text-sm text-gray-500">
               Найдено доменов: {domains.length}
             </div>
            
            {domains.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {domains.map((domain) => (
                  <DomainCard key={domain.id} domain={domain} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-500">Домены не найдены. Попробуйте изменить фильтры.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
