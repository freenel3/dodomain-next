import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const metadata = {
  title: 'Блог - dodomain',
  description: 'Статьи о доменах, инвестициях и digital-маркетинге',
}

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: {
      isPublished: true,
    },
    orderBy: {
      publishedDate: 'desc',
    },
    take: 20,
  })

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">Блог</h1>
        <p className="text-gray-600">
          Статьи о доменах и инвестициях
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">
            Статьи еще не добавлены.
          </p>
          <p className="text-sm text-gray-500">
            Используйте Prisma Studio для добавления статей:
            <code className="block mt-2 bg-gray-100 p-2 rounded">
              npx prisma studio
            </code>
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="block border border-gray-200 p-6 hover:border-black transition-all"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <h2 className="text-2xl font-bold text-black">{post.title}</h2>
                <span className="px-3 py-1 bg-gray-100 text-xs font-medium text-black whitespace-nowrap">
                  {post.category}
                </span>
              </div>
              <p className="text-gray-600 mb-3">{post.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>{new Date(post.publishedDate).toLocaleDateString('ru-RU')}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
