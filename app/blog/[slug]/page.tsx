import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({
    where: { slug }
  })

  if (!post) {
    return {
      title: 'Статья не найдена - dodomain'
    }
  }

  return {
    title: `${post.title} - dodomain`,
    description: post.excerpt
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  })

  if (!post) {
    notFound()
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <Link href="/blog" className="hover:text-black">
          Блог
        </Link>
        <span>/</span>
        <span className="text-black">{post.title}</span>
      </div>

      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-4">{post.title}</h1>
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>{new Date(post.publishedDate).toLocaleDateString('ru-RU')}</span>
            <span>•</span>
            <span>{post.readTime}</span>
            <span>•</span>
            <span className="px-3 py-1 bg-gray-100 text-black font-medium">
              {post.category}
            </span>
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <div className="text-xl text-gray-700 mb-8 font-light leading-relaxed">
            {post.excerpt}
          </div>
          
          <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>
        </div>
      </article>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <Link
          href="/blog"
          className="inline-block text-sm text-gray-600 hover:text-black transition-colors"
        >
          ← Вернуться к блогу
        </Link>
      </div>
    </div>
  )
}
