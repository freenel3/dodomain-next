import Link from 'next/link'
import { Home, Search } from 'lucide-react'

export const metadata = {
  title: 'Страница не найдена - dodomain',
  description: 'Запрашиваемая страница не существует',
}

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <div className="text-8xl font-bold text-black mb-2">404</div>
          <h1 className="text-2xl font-bold text-black mb-3">
            Страница не найдена
          </h1>
          <p className="text-sm text-gray-600 mb-8">
            К сожалению, запрашиваемая страница не существует или была перемещена
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="px-5 py-2.5 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all inline-flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Вернуться на главную
          </Link>
          <Link
            href="/domains"
            className="px-5 py-2.5 bg-white border border-black text-black text-sm font-medium hover:bg-gray-50 transition-all inline-flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            Искать домены
          </Link>
        </div>
      </div>
    </div>
  )
}
