import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { formatDateShort } from '@/lib/utils';

interface BlogCardProps {
  post: {
    slug: string;
    title: string;
    excerpt: string | null;
    category: string | null;
    readTime: string | null;
    publishedDate: Date | null;
  };
  isFeatured?: boolean;
}

/**
 * Карточка статьи блога
 * Server Component - статичный контент
 */
export default function BlogCard({ post, isFeatured = false }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group bg-white border hover:border-black transition-all block relative ${
        isFeatured ? 'p-8 border-2 border-black' : 'p-6 border border-gray-200'
      }`}
    >
      {/* Header с категорией и датами */}
      <div className="flex items-start justify-between mb-4">
        <div className={`px-2 py-0.5 text-xs font-medium uppercase tracking-wide ${
          isFeatured ? 'bg-black text-white' : 'bg-gray-100 text-gray-900'
        }`}>
          {post.category || 'Без категории'}
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDateShort(post.publishedDate || new Date())}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readTime || '5 мин'}</span>
          </div>
        </div>
      </div>

      {/* Заголовок */}
      <h3 className={`font-display font-bold text-black mb-3 group-hover:underline tracking-tight ${
        isFeatured ? 'text-3xl lg:text-4xl' : 'text-xl'
      }`}>
        {post.title}
      </h3>

      {/* Описание */}
      <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-2">
        {post.excerpt || ''}
      </p>

      {/* Стрелка */}
      <ArrowRight className="w-4 h-4 text-black opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
}
