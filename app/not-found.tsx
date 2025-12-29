import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <h1 className="text-6xl font-bold text-black mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-black mb-4">
        Страница не найдена
      </h2>
      <p className="text-gray-600 mb-8">
        К сожалению, запрашиваемая страница не существует
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-black text-white font-medium hover:bg-gray-800 transition-all"
      >
        Вернуться на главную
      </Link>
    </div>
  )
}
