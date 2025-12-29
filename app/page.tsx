import Link from 'next/link'
import { Search, Globe, Shield, TrendingUp, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'dodomain - Премиум площадка доменов',
  description: 'Покупайте и продавайте премиум-домены на крупнейшей площадке',
}

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4 leading-tight">
            Найдите идеальное доменное имя
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Покупайте и продавайте премиум-домены на крупнейшей площадке
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-6">
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

      {/* Features Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-black mb-3">
              Почему выбирают dodomain
            </h2>
            <p className="text-base text-gray-600">
              Самая надежная платформа для доменных транзакций
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 p-5">
              <div className="w-10 h-10 bg-black flex items-center justify-center mb-4">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">
                Глобальная площадка
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Доступ к доменам со всего мира
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-5">
              <div className="w-10 h-10 bg-black flex items-center justify-center mb-4">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">
                Безопасные сделки
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Защита эскроу и гарантия возврата
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-5">
              <div className="w-10 h-10 bg-black flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">
                Экспертная оценка
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Помощь в оценке доменов
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-black p-10 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Готовы начать?
          </h2>
          <p className="text-base text-gray-300 mb-8">
            Присоединяйтесь к тысячам доменных инвесторов
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/domains"
              className="px-5 py-2 bg-white text-black text-sm font-medium hover:bg-gray-100 transition-all"
            >
              Посмотреть домены
            </Link>
            <Link
              href="/sell-domain"
              className="px-5 py-2 bg-transparent border border-white text-white text-sm font-medium hover:bg-white hover:text-black transition-all"
            >
              Продать домен
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
