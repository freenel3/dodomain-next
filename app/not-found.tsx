
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-9xl font-display font-bold text-gray-200 mb-4">404</h2>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Страница не найдена</h1>
      <p className="text-gray-500 mb-8 max-w-md">
        Возможно, страница была удалена или вы перешли по неверной ссылке.
      </p>
      <Link href="/">
        <Button size="lg">Вернуться на главную</Button>
      </Link>
    </div>
  )
}
