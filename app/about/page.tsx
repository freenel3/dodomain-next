import { Users, Target, Shield, Award, Globe, CheckCircle } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: 'О компании | dodomain',
  description: 'dodomain — ведущая российская площадка для покупки и продажи премиум доменных имен',
}

const stats = [
  { value: "500K+", label: "Доменов в каталоге" },
  { value: "10K+", label: "Успешных продаж" },
  { value: "98%", label: "Довольных клиентов" },
  { value: "24/7", label: "Поддержка" },
];

const values = [
  {
    icon: Shield,
    title: "Безопасность",
    description:
      "Все сделки проходят через эскроу-сервис, гарантирующий безопасность для обеих сторон.",
  },
  {
    icon: Users,
    title: "Клиентоориентированность",
    description:
      "Мы ставим интересы клиентов на первое место и всегда готовы помочь.",
  },
  {
    icon: Target,
    title: "Экспертность",
    description:
      "Наши эксперты имеют многолетний опыт работы с доменными именами.",
  },
  {
    icon: Award,
    title: "Качество",
    description:
      "Мы тщательно проверяем все домены перед размещением на площадке.",
  },
];

const advantages = [
  "Безопасные сделки через эскроу",
  "Экспертная оценка доменов",
  "Быстрая передача домена",
  "Поддержка 24/7",
  "Прозрачные условия",
  "Конфиденциальность данных",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            О компании
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            dodomain — ведущая российская площадка для покупки и продажи премиум
            доменных имен
          </p>
        </div>

        {/* Stats */}
        <section className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Наша история
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  dodomain была основана в 2020 году группой энтузиастов,
                  увлеченных доменной индустрией. Мы увидели потребность в
                  надежной и безопасной площадке для покупки и продажи доменных
                  имен в России.
                </p>
                <p>
                  За годы работы мы выросли из небольшой команды в ведущую
                  платформу с каталогом из более чем 500 000 доменов и тысячами
                  успешных сделок.
                </p>
                <p>
                  Наша миссия — сделать рынок доменов прозрачным, доступным и
                  безопасным для всех участников, от частных лиц до крупных
                  корпораций.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-12 flex items-center justify-center">
              <Globe className="w-48 h-48 text-blue-600" />
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Наши ценности
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Принципы, которыми мы руководствуемся в нашей работе
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Advantages */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-white mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Почему выбирают нас</h2>
              <p className="text-blue-100 text-lg mb-8">
                Мы создали платформу, которая объединяет безопасность, удобство
                и профессионализм
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {advantages.map((advantage, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{advantage}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
                <div className="text-4xl font-bold mb-2">5+</div>
                <div className="text-blue-100">Лет на рынке</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-blue-100">Экспертов</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="text-blue-100">Безопасность</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
                <div className="text-4xl font-bold mb-2">∞</div>
                <div className="text-blue-100">Возможностей</div>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Наша команда
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Профессионалы с многолетним опытом в доменной индустрии
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Алексей Иванов",
                position: "CEO",
                description: "Основатель и visionary с 15-летним опытом в IT",
              },
              {
                name: "Мария Петрова",
                position: "CTO",
                description:
                  "Технический директор, эксперт в области безопасности",
              },
              {
                name: "Дмитрий Сидоров",
                position: "Head of Sales",
                description:
                  "Руководитель отдела продаж, эксперт по оценке доменов",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">
                  {member.position}
                </p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Готовы начать?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Свяжитесь с нами, и мы поможем вам найти идеальный домен или продать
            ваш домен по лучшей цене
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/domains" className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 text-lg rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Найти домен
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-700 px-8 py-4 text-lg rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Связаться с нами
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
