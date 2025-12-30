import Link from 'next/link'
import { Search, TrendingUp, Shield, Zap, Globe, DollarSign, ArrowRight, CheckCircle } from 'lucide-react'

export const metadata = {
  title: 'dodomain - Премиум площадка доменов',
  description: 'Покупайте и продавайте ценные доменные имена. Более 500 000 доменов, безопасные сделки и экспертная оценка.',
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Премиум площадка доменов
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Покупайте и продавайте ценные доменные имена. Более 500 000 доменов, безопасные сделки и экспертная оценка.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/domains" className="inline-flex items-center justify-center bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 text-lg font-medium rounded-lg transition-colors">
                <Search className="w-5 h-5 mr-2" />
                Найти домен
              </Link>
              <Link href="/sell-domain" className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-blue-700 px-8 py-4 text-lg font-medium rounded-lg transition-colors">
                <DollarSign className="w-5 h-5 mr-2" />
                Продать домен
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold">500K+</div>
              <div className="text-blue-200 mt-2">Доменов</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold">10K+</div>
              <div className="text-blue-200 mt-2">Продаж</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold">98%</div>
              <div className="text-blue-200 mt-2">Довольных клиентов</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold">24/7</div>
              <div className="text-blue-200 mt-2">Поддержка</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Почему выбирают нас
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Мы делаем процесс покупки и продажи доменов простым и безопасным
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Безопасные сделки</h3>
              <p className="text-gray-600">
                Все сделки проходят через эскроу-сервис, гарантирующий безопасность для обеих сторон
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Экспертная оценка</h3>
              <p className="text-gray-600">
                Профессиональная оценка стоимости домена на основе рыночных данных и аналитики
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Быстрые сделки</h3>
              <p className="text-gray-600">
                Автоматизированный процесс передачи домена сокращает время сделки до минимума
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Domains */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Популярные домены
              </h2>
              <p className="text-gray-600">Лучшие предложения на этой неделе</p>
            </div>
            <Link href="/domains" className="hidden md:flex items-center text-blue-600 hover:text-blue-700 font-medium">
              Смотреть все
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'best.ru', price: '2 500 000 ₽', category: 'Премиум', zone: '.ru' },
              { name: 'tech.io', price: '1 200 000 ₽', category: 'Технологии', zone: '.io' },
              { name: 'shop.com', price: '5 000 000 ₽', category: 'Коммерция', zone: '.com' },
            ].map((domain) => (
              <Link key={domain.name} href={`/domains/${domain.name}`} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{domain.name}</h3>
                    <span className="text-sm text-gray-500">{domain.zone}</span>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                    {domain.category}
                  </span>
                </div>
                <div className="text-2xl font-bold text-blue-600">{domain.price}</div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/domains" className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Смотреть все домены
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Как это работает
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Простые шаги для покупки или продажи домена
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Поиск', desc: 'Найдите идеальный домен в нашем каталоге' },
              { step: '2', title: 'Выбор', desc: 'Выберите домен и отправьте заявку' },
              { step: '3', title: 'Оплата', desc: 'Оплатите через безопасный эскроу' },
              { step: '4', title: 'Получение', desc: 'Получите домен в свою собственность' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Категории доменов
            </h2>
            <p className="text-gray-600">Найдите домен в нужной вам категории</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: 'Премиум', icon: '💎', count: '5 420' },
              { name: 'Бизнес', icon: '💼', count: '12 300' },
              { name: 'Коммерция', icon: '🛒', count: '8 750' },
              { name: 'Технологии', icon: '💻', count: '15 200' },
              { name: 'Медиа', icon: '📺', count: '6 100' },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={`/search?category=${cat.name.toLowerCase()}`}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow text-center"
              >
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h3 className="font-semibold mb-1">{cat.name}</h3>
                <p className="text-sm text-gray-500">{cat.count} доменов</p>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/categories" className="inline-flex items-center justify-center bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors">
              Все категории
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Готовы начать?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Присоединяйтесь к тысячам довольных клиентов и найдите свой идеальный домен
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/domains" className="inline-flex items-center justify-center bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 text-lg font-medium rounded-lg transition-colors">
              Начать поиск
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-blue-700 px-8 py-4 text-lg font-medium rounded-lg transition-colors">
              Связаться с нами
            </Link>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Нам доверяют
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                <span className="font-semibold">Иван Петров</span>
              </div>
              <p className="text-gray-600">
                "Отличная площадка! Купил домен для своего бизнеса за 2 дня. Всё прошло гладко и безопасно."
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                <span className="font-semibold">Анна Сидорова</span>
              </div>
              <p className="text-gray-600">
                "Продала свой домен через dodomain. Процесс был простым, а цена оказалась выше ожидаемой!"
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                <span className="font-semibold">Михаил Козлов</span>
              </div>
              <p className="text-gray-600">
                "Профессиональный сервис и отличная поддержка. Рекомендую всем, кто ищет качественные домены."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
