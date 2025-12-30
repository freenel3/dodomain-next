import { Globe, Shield, Users, Zap } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: 'О компании | dodomain.',
  description: 'dodomain — площадка для покупки и продажи премиум доменов',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-black mb-6 tracking-tighter">
            О нас
          </h1>
          <p className="text-lg text-gray-500 font-light">
            Мы создаём безопасную площадку для торговли премиум доменами
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="space-y-6 text-gray-600 font-light leading-relaxed">
            <p>
              <span className="font-display font-semibold text-black">dodomain.</span> — это современная платформа для покупки и продажи доменных имён. 
              Мы объединяем продавцов качественных доменов с покупателями, которые ищут идеальное имя для своего проекта.
            </p>
            <p>
              Наша миссия — сделать процесс покупки домена простым, прозрачным и безопасным. 
              Мы тщательно проверяем каждый домен перед размещением и гарантируем честные сделки.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-display font-bold text-black text-center mb-12 tracking-tight">
            Наши принципы
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-100 p-8">
              <div className="w-10 h-10 bg-black flex items-center justify-center mb-4">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-display font-semibold text-black mb-2">Безопасность</h3>
              <p className="text-sm text-gray-500 font-light">
                Все сделки защищены эскроу-сервисом
              </p>
            </div>
            
            <div className="border border-gray-100 p-8">
              <div className="w-10 h-10 bg-black flex items-center justify-center mb-4">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-display font-semibold text-black mb-2">Доверие</h3>
              <p className="text-sm text-gray-500 font-light">
                Проверенные продавцы и честные цены
              </p>
            </div>
            
            <div className="border border-gray-100 p-8">
              <div className="w-10 h-10 bg-black flex items-center justify-center mb-4">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-display font-semibold text-black mb-2">Скорость</h3>
              <p className="text-sm text-gray-500 font-light">
                Быстрое оформление и передача домена
              </p>
            </div>
            
            <div className="border border-gray-100 p-8">
              <div className="w-10 h-10 bg-black flex items-center justify-center mb-4">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-display font-semibold text-black mb-2">Качество</h3>
              <p className="text-sm text-gray-500 font-light">
                Только проверенные домены в каталоге
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-display font-bold mb-4 tracking-tight">
            Готовы начать?
          </h2>
          <p className="text-gray-400 mb-8 font-light">
            Найдите идеальный домен или разместите свой
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/domains"
              className="px-6 py-3 bg-white text-black font-medium hover:bg-gray-100 transition-colors"
            >
              Смотреть домены
            </Link>
            <Link 
              href="/contact"
              className="px-6 py-3 border border-white text-white font-medium hover:bg-white hover:text-black transition-colors"
            >
              Связаться с нами
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
