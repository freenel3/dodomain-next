import Link from 'next/link'
import { ArrowRight, TrendingUp, DollarSign, Globe, Briefcase, ShoppingBag, Tv, Cpu } from 'lucide-react'

const categories = [
  {
    name: 'Премиум',
    slug: 'premium',
    icon: '💎',
    description: 'Эксклюзивные домены с высокой стоимостью',
    count: 5420,
    color: 'from-purple-500 to-purple-700',
    iconComponent: TrendingUp
  },
  {
    name: 'Бизнес',
    slug: 'business',
    icon: '💼',
    description: 'Домены для корпоративных сайтов и бизнеса',
    count: 12300,
    color: 'from-blue-500 to-blue-700',
    iconComponent: Briefcase
  },
  {
    name: 'Коммерция',
    slug: 'commerce',
    icon: '🛒',
    description: 'Идеально для интернет-магазинов',
    count: 8750,
    color: 'from-green-500 to-green-700',
    iconComponent: ShoppingBag
  },
  {
    name: 'Технологии',
    slug: 'technology',
    icon: '💻',
    description: 'Для IT-компаний и стартапов',
    count: 15200,
    color: 'from-indigo-500 to-indigo-700',
    iconComponent: Cpu
  },
  {
    name: 'Медиа',
    slug: 'media',
    icon: '📺',
    description: 'Для медиа-ресурсов и блогов',
    count: 6100,
    color: 'from-pink-500 to-pink-700',
    iconComponent: Tv
  },
  {
    name: 'Финансы',
    slug: 'finance',
    icon: '💰',
    description: 'Для финансовых организаций',
    count: 4200,
    color: 'from-yellow-500 to-yellow-700',
    iconComponent: DollarSign
  },
  {
    name: 'Образование',
    slug: 'education',
    icon: '📚',
    description: 'Для образовательных проектов',
    count: 3800,
    color: 'from-cyan-500 to-cyan-700',
    iconComponent: Globe
  },
  {
    name: 'Здоровье',
    slug: 'health',
    icon: '🏥',
    description: 'Для медицинских учреждений',
    count: 2900,
    color: 'from-red-500 to-red-700',
    iconComponent: Globe
  },
]

const domainZones = [
  { name: '.com', count: 45000, description: 'Самая популярная зона' },
  { name: '.ru', count: 32000, description: 'Национальная зона РФ' },
  { name: '.рф', count: 8500, description: 'Кириллическая зона' },
  { name: '.io', count: 12000, description: 'Популярна в IT' },
  { name: '.net', count: 9500, description: 'Классическая зона' },
  { name: '.org', count: 6800, description: 'Для организаций' },
]

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Категории доменов
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Найдите домен в нужной вам категории или выберите подходящую доменную зону
          </p>
        </div>

        {/* Categories Grid */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold font-display text-gray-900 mb-8">По категориям</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const IconComponent = category.iconComponent
              return (
                <Link
                  key={category.slug}
                  href={`/domains?category=${category.name}`}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all group"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 font-light">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{category.count.toLocaleString()} доменов</span>
                    <ArrowRight className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Domain Zones */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold font-display text-gray-900 mb-8">По доменным зонам</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {domainZones.map((zone) => (
              <Link
                key={zone.name}
                href={`/domains?extension=${zone.name}`}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-black">{zone.name}</h3>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-gray-600 mb-3 font-light">{zone.description}</p>
                <div className="text-sm text-gray-500">
                  {zone.count.toLocaleString()} доменов
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Categories */}
        <section className="bg-black rounded-2xl p-8 md:p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4 font-display">Не нашли нужную категорию?</h2>
              <p className="text-gray-300 text-lg mb-6 font-light">
                Наш каталог содержит более 500 000 доменов в различных категориях. Используйте поиск или фильтры для точного подбора.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/domains" className="inline-block bg-white text-black hover:bg-gray-100 px-6 py-3 rounded-md font-medium text-center transition-colors">
                  Перейти в каталог
                </Link>
                <Link href="/search" className="inline-block border border-white text-white hover:bg-white hover:text-black px-6 py-3 rounded-md font-medium text-center transition-colors">
                  Расширенный поиск
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
                <div className="text-4xl font-bold mb-2">500K+</div>
                <div className="text-gray-300 text-sm">Всего доменов</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-gray-300 text-sm">Доменных зон</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
                <div className="text-4xl font-bold mb-2">8</div>
                <div className="text-gray-300 text-sm">Категорий</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-gray-300 text-sm">Поддержка</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
