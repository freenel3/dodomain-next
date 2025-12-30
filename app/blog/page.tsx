import Link from 'next/link'
import { Calendar, Clock } from 'lucide-react'
import Breadcrumbs from '../components/Breadcrumbs'

export const metadata = {
  title: 'Блог - dodomain',
  description: 'Статьи и новости о доменах, их оценке и продаже',
}

const blogPosts = [
  {
    id: 1,
    slug: 'kak-ocenit-domen',
    title: 'Как правильно оценить стоимость домена',
    excerpt: 'Разбираем ключевые факторы, влияющие на цену доменного имени: длина, зона, история, трафик и коммерческий потенциал.',
    date: '2024-12-15',
    readTime: '5 мин',
    category: 'Инвестиции'
  },
  {
    id: 2,
    slug: 'luchshie-domennie-zony',
    title: 'Лучшие доменные зоны для бизнеса в 2024',
    excerpt: 'Обзор самых популярных и перспективных доменных зон для коммерческих проектов.',
    date: '2024-12-10',
    readTime: '4 мин',
    category: 'Тренды'
  },
  {
    id: 3,
    slug: 'bezopasnost-sdelok',
    title: 'Безопасность при покупке премиум доменов',
    excerpt: 'Как защитить себя от мошенничества и провести сделку безопасно через эскроу-сервисы.',
    date: '2024-12-05',
    readTime: '6 мин',
    category: 'Безопасность'
  }
]

export default function Blog() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Breadcrumbs 
        items={[
          { label: 'Главная', path: '/' },
          { label: 'Блог' }
        ]}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">Блог dodomain</h1>
        <p className="text-sm text-gray-600">
          Статьи, советы и новости о доменах
        </p>
      </div>

      <div className="space-y-6">
        {blogPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="block border border-gray-200 p-5 hover:border-black transition-all"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 bg-gray-100 text-gray-900 text-xs font-medium">
                {post.category}
              </span>
              <div className="flex items-center gap-3 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(post.date).toLocaleDateString('ru-RU')}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </div>
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-black mb-2 hover:underline">
              {post.title}
            </h2>
            
            <p className="text-sm text-gray-700 leading-relaxed">
              {post.excerpt}
            </p>
          </Link>
        ))}
      </div>

      {blogPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-sm">Статьи скоро появятся</p>
        </div>
      )}
    </div>
  )
}
