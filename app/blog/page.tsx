
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

const prisma = new PrismaClient()

async function getPosts() {
  const posts = await prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: { publishedDate: 'desc' },
  })
  return posts
}

export const metadata = {
  title: 'Блог | dodomain',
  description: 'Статьи и новости о доменной индустрии',
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-4 tracking-tight">
            Блог
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Последние новости, руководства и аналитика рынка доменов.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <article className="h-full flex flex-col border border-gray-100 rounded-2xl p-6 hover:border-gray-300 transition-colors bg-gray-50">
                <div className="mb-4">
                  <span className="inline-block py-1 px-3 rounded-full bg-white text-xs font-semibold text-black uppercase tracking-wide border border-gray-200">
                    {post.category}
                  </span>
                </div>
                
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-3 group-hover:text-black leading-tight">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 mb-6 flex-grow line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center text-sm text-gray-400 mt-auto pt-4 border-t border-gray-200/50 space-x-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1.5" />
                    {new Date(post.publishedDate).toLocaleDateString('ru-RU')}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1.5" />
                    {post.readTime}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
