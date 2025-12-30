
import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'
import { Calendar, Clock } from 'lucide-react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const prisma = new PrismaClient()

async function getPost(slug: string) {
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  })
  return post
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = await getPost(params.slug)
  if (!post) return { title: 'Статья не найдена' }
  
  return {
    title: `${post.title} | Блог dodomain`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  // Simple markdown-like rendering (replace with proper markdown parser later if needed)
  const contentHtml = post.content
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-6 mb-3">$1</h3>')
    .replace(/\n/gim, '<br />')

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-12 md:py-20">
        <Link href="/blog" className="inline-flex items-center text-gray-500 hover:text-black mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад к блогу
        </Link>
        
        <header className="mb-10">
          <div className="flex flex-wrap gap-4 items-center text-sm text-gray-500 mb-6">
            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-900 font-medium">
              {post.category}
            </span>
            <div className="flex items-center">
               <Calendar className="w-4 h-4 mr-1.5" />
               <time>{new Date(post.publishedDate).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1.5" />
              <span>{post.readTime}</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-500 mt-6 leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        <div 
          className="prose prose-lg max-w-none text-gray-800"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </div>
    </div>
  )
}
