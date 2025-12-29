import Link from 'next/link'
import { Globe, Shield, TrendingUp } from 'lucide-react'
import HeroSection from './components/HeroSection'
import Logo from './components/Logo'

export const metadata = {
  title: 'dodomain - Премиум площадка доменов',
  description: 'Покупайте и продавайте премиум-домены на крупнейшей площадке',
}

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-bold text-black mb-3 tracking-tight">
              Почему выбирают dodomain
            </h2>
            <p className="text-base text-gray-600 font-light">
              Самая надежная платформа для доменных транзакций
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 p-5">
              <div className="w-10 h-10 bg-black flex items-center justify-center mb-4">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-display font-semibold text-black mb-2 tracking-tight">Глобальная площадка</h3>
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                Доступ к доменам со всего мира
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-5">
              <div className="w-10 h-10 bg-black flex items-center justify-center mb-4">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-display font-semibold text-black mb-2 tracking-tight">Безопасные сделки</h3>
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                Защита эскроу и гарантия возврата
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-5">
              <div className="w-10 h-10 bg-black flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-display font-semibold text-black mb-2 tracking-tight">Экспертная оценка</h3>
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                Помощь в оценке доменов
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-black p-10 text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4 tracking-tight">
            Готовы начать?
          </h2>
          <p className="text-base text-gray-300 mb-8 font-light">
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

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-12">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="grid grid-cols-4 gap-6 mb-6">
            <div>
              <Logo />
              <p className="text-xs text-gray-600 mt-2">
                Ведущая площадка доменов
              </p>
            </div>
            <div>
              <h4 className="text-black font-bold mb-2 text-xs">Площадка</h4>
              <ul className="space-y-1.5">
                <li><Link href="/domains" className="text-gray-600 hover:text-black transition-colors text-xs">Все домены</Link></li>
                <li><Link href="/sell-domain" className="text-gray-600 hover:text-black transition-colors text-xs">Продать домен</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-black font-bold mb-2 text-xs">Ресурсы</h4>
              <ul className="space-y-1.5">
                <li><Link href="/blog" className="text-gray-600 hover:text-black transition-colors text-xs">Блог</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-black font-bold mb-2 text-xs">Компания</h4>
              <ul className="space-y-1.5">
                <li><Link href="/about" className="text-gray-600 hover:text-black transition-colors text-xs">О нас</Link></li>
                <li><Link href="/contact" className="text-gray-600 hover:text-black transition-colors text-xs">Контакты</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4 text-center text-xs text-gray-600">
            © 2024 dodomain. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  )
}
