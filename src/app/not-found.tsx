import Link from 'next/link';

/**
 * 404 страница - не найдено
 * Server Component - статичный контент
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-black mb-4 tracking-tight">
          404
        </h1>
        <h2 className="text-2xl font-bold text-black mb-6">
          Страница не найдена
        </h2>
        <p className="text-gray-600 mb-8">
          Извините, но запрашиваемая страница не существует.
        </p>
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all"
          >
            На главную
          </Link>
          <Link
            href="/domains"
            className="inline-flex items-center gap-2 px-6 py-3 border border-black text-black text-sm font-medium hover:bg-gray-100 transition-all"
          >
            Каталог доменов
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 border border-black text-black text-sm font-medium hover:bg-gray-100 transition-all"
          >
            Блог
          </Link>
        </div>
      </div>
    </div>
  );
}
