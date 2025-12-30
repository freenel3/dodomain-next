import Link from 'next/link';
import { Search, Handshake, Shield, TrendingUp, Users, Award } from 'lucide-react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Header from '@/components/Header';

/**
 * Страница "О нас"
 * Server Component - статичный контент
 */
export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <Breadcrumbs
        items={[
          { label: 'Главная', path: '/' },
          { label: 'О нас' }
        ]}
      />

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">
            О компании dodomain
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            dodomain — профессиональная брокерская платформа по реализации премиум доменных имен. 
            Мы специализируемся на подборе и приобретении доменов высшей категории для бизнеса и инвесторов.
          </p>
          <p className="text-base text-gray-700 leading-relaxed mb-4">
            На платформе представлено более 500 000 доменов. Часть из них принадлежит нашему портфелю, 
            другая часть — сторонним владельцам. Мы выступаем посредниками и обеспечиваем профессиональное 
            сопровождение сделок любой сложности.
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            Независимо от того, кому принадлежит домен, мы гарантируем прозрачность, безопасность 
            и оперативность всего процесса приобретения.
          </p>
        </div>

        {/* Services */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-black mb-6">
            Наши услуги
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-gray-200 p-5">
              <Search className="w-6 h-6 text-black mb-3" />
              <h3 className="text-lg font-bold text-black mb-2">Подбор доменов</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Индивидуальный подбор доменных имен с учетом специфики бизнеса. 
                Анализ доступности, брендовой совместимости и коммерческого потенциала.
              </p>
            </div>

            <div className="border border-gray-200 p-5">
              <Handshake className="w-6 h-6 text-black mb-3" />
              <h3 className="text-lg font-bold text-black mb-2">Брокерские услуги</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Полное сопровождение сделок — от переговоров до трансфера. 
                Работаем как с собственным портфелем, так и помогаем приобрести домены у третьих лиц.
              </p>
            </div>

            <div className="border border-gray-200 p-5">
              <TrendingUp className="w-6 h-6 text-black mb-3" />
              <h3 className="text-lg font-bold text-black mb-2">Оценка стоимости</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Профессиональная оценка рыночной стоимости на основе анализа 
                аналогичных сделок, трафика и истории домена.
              </p>
            </div>

            <div className="border border-gray-200 p-5">
              <Shield className="w-6 h-6 text-black mb-3" />
              <h3 className="text-lg font-bold text-black mb-2">Безопасность сделок</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Проверенные механизмы эскроу, работа через авторизованных регистраторов, 
                полное документальное сопровождение.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="border-t border-gray-200 pt-8 mb-12">
          <h2 className="text-2xl font-bold text-black mb-6">
            Наши преимущества
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <Award className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-black mb-1">Профессиональное брокерство</h3>
                <p className="text-sm text-gray-700">
                  Помогаем приобрести любой домен — из нашего портфеля или у сторонних владельцев. 
                  Берем на себя все переговоры и сложности процесса.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Shield className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-black mb-1">Безопасность и надежность</h3>
                <p className="text-sm text-gray-700">
                  Полная юридическая защита сделки, проверенные механизмы эскроу, 
                  работа только через авторизованных регистраторов.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Users className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-black mb-1">Персональное сопровождение</h3>
                <p className="text-sm text-gray-700">
                  Работаем с каждым клиентом индивидуально — от первой консультации 
                  до успешного завершения сделки.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <TrendingUp className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-black mb-1">Прозрачные условия</h3>
                <p className="text-sm text-gray-700">
                  Честное ценообразование без скрытых комиссий. 
                  Все условия обсуждаются и фиксируются до начала работы.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="border border-gray-200 p-6 text-center">
          <h2 className="text-xl font-bold text-black mb-3">
            Нужна консультация?
          </h2>
          <p className="text-sm text-gray-700 mb-4">
            Свяжитесь с нами для обсуждения вашей задачи. Поможем подобрать домен 
            или организуем приобретение у текущего владельца.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-2.5 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all"
          >
            Связаться с нами
          </Link>
        </div>
      </div>
    </div>
  );
}
