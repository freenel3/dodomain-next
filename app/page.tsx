import Link from 'next/link'
import { Search } from 'lucide-react'

export const metadata = {
  title: 'dodomain. - Премиум домены',
  description: 'Покупайте и продавайте премиум-домены',
}

// Тестовые данные доменов
const featuredDomains = [
  { name: 'crypto.ru', price: 2500000, category: 'Финансы' },
  { name: 'travel.com', price: 1800000, category: 'Путешествия' },
  { name: 'tech.io', price: 950000, category: 'Технологии' },
  { name: 'shop.ru', price: 750000, category: 'Коммерция' },
  { name: 'health.com', price: 1200000, category: 'Здоровье' },
  { name: 'game.io', price: 680000, category: 'Развлечения' },
]

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-black mb-6 tracking-tighter">
            Премиум домены для вашего бизнеса
          </h1>
          <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto font-light">
            Найдите идеальное доменное имя среди тысяч проверенных предложений
          </p>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Введите название домена..."
                className="w-full px-5 py-4 pr-14 border border-gray-200 text-base focus:outline-none focus:border-black transition-colors"
              />
              <button className="absolute right-0 top-0 h-full px-5 bg-black text-white hover:bg-gray-900 transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Domains */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-display font-bold text-black tracking-tight">
              Избранные домены
            </h2>
            <Link 
              href="/domains" 
              className="text-sm text-gray-500 hover:text-black transition-colors"
            >
              Смотреть все →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredDomains.map((domain) => (
              <Link 
                key={domain.name}
                href={`/domains/${domain.name}`}
                className="bg-white border border-gray-100 p-6 hover:border-gray-300 transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-display font-semibold text-black group-hover:text-gray-700">
                    {domain.name}
                  </h3>
                  <span className="text-xs text-gray-400 uppercase tracking-wide">
                    {domain.category}
                  </span>
                </div>
                <div className="text-2xl font-bold text-black">
                  {formatPrice(domain.price)}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-display font-bold text-black text-center mb-12 tracking-tight">
            Как это работает
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center text-lg font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-display font-semibold text-black mb-2">Найдите домен</h3>
              <p className="text-sm text-gray-500 font-light">
                Используйте поиск или просматривайте каталог
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center text-lg font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-display font-semibold text-black mb-2">Отправьте заявку</h3>
              <p className="text-sm text-gray-500 font-light">
                Свяжитесь с продавцом через форму
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center text-lg font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-display font-semibold text-black mb-2">Получите домен</h3>
              <p className="text-sm text-gray-500 font-light">
                Безопасная сделка через эскроу
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 tracking-tight">
            Хотите продать домен?
          </h2>
          <p className="text-gray-400 mb-8 font-light">
            Разместите ваш домен на нашей площадке и получите лучшую цену
          </p>
          <Link 
            href="/sell-domain"
            className="inline-block px-8 py-3 bg-white text-black font-medium hover:bg-gray-100 transition-colors"
          >
            Продать домен
          </Link>
        </div>
      </section>
    </div>
  )
}
