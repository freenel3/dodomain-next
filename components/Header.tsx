import Link from 'next/link'
import Logo from './Logo'

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <Logo />
        <nav className="flex gap-6 items-center">
          <Link href="/domains" className="text-gray-900 hover:text-black transition-colors text-sm">
            Домены
          </Link>
          <Link href="/sell-domain" className="text-gray-900 hover:text-black transition-colors text-sm">
            Продать
          </Link>
          <Link href="/blog" className="text-gray-900 hover:text-black transition-colors text-sm">
            Блог
          </Link>
          <Link href="/about" className="text-gray-900 hover:text-black transition-colors text-sm">
            О нас
          </Link>
          <Link href="/contact" className="text-gray-900 hover:text-black transition-colors text-sm">
            Контакты
          </Link>
        </nav>
      </div>
    </header>
  )
}
