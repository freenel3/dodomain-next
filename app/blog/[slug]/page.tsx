import Link from 'next/link'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Breadcrumbs from '../../components/Breadcrumbs'
import { notFound } from 'next/navigation'

// Моковые данные статей
const posts = {
  'kak-ocenit-domen': {
    title: 'Как правильно оценить стоимость домена',
    date: '2024-12-15',
    readTime: '5 мин',
    category: 'Инвестиции',
    content: `
## Введение

Оценка стоимости домена — ключевой навык для инвестора и бизнесмена. От правильной оценки зависит успех покупки или продажи.

## Основные факторы оценки

### 1. Длина домена
Короткие домены всегда ценятся выше. Домены из 3-4 символов могут стоить от $1000 до миллионов долларов.

### 2. Доменная зона
.com остается самой дорогой зоной. За ней следуют .net, .org и национальные зоны (.ru, .de).

### 3. Брендовый потенциал
Легко запоминающиеся, произносимые домены имеют высокую ценность для брендинга.

## Заключение

Оценка домена требует комплексного подхода и учета множества факторов.
    `
  },
  'luchshie-domennie-zony': {
    title: 'Лучшие доменные зоны для бизнеса в 2024',
    date: '2024-12-10',
    readTime: '4 мин',
    category: 'Тренды',
    content: `
## Топ доменных зон 2024

### .com
Классика, которая никогда не выходит из моды. Подходит для любого бизнеса.

### .ru
Идеален для российского рынка. Высокое доверие локальной аудитории.

### .online
Современная альтернатива для digital-проектов.
    `
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = posts[slug as keyof typeof posts]
  
  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Header currentPath="/blog" />

      <div className="max-w-2xl mx-auto px-4 py-10">
        <Breadcrumbs 
          items={[
            { label: 'Главная', path: '/' },
            { label: 'Блог', path: '/blog' },
            { label: post.title }
          ]}
        />

        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors mb-6"
        >
          <ArrowLeft className="w-3 h-3" />
          Назад к блогу
        </Link>

        <article>
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
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

            <h1 className="text-3xl font-bold text-black mb-4">{post.title}</h1>
          </div>

          <div className="prose prose-sm max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {post.content}
            </div>
          </div>
        </article>

        <div className="border-t border-gray-200 mt-12 pt-8">
          <h3 className="text-lg font-bold text-black mb-4">Похожие статьи</h3>
          <div className="grid gap-4">
            <Link 
              href="/blog/kak-ocenit-domen"
              className="border border-gray-200 p-4 hover:border-black transition-all"
            >
              <h4 className="font-bold text-black mb-1 text-sm">Как оценить домен</h4>
              <p className="text-xs text-gray-600">Ключевые факторы оценки стоимости</p>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
