import Link from 'next/link'
import Logo from './Logo'

interface HeaderProps {
  currentPath?: string
}

export default function Header({ currentPath }: HeaderProps) {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <Logo />
        <nav className="flex gap-6 items-center">
          <Link 
            href="/domains" 
            className={`transition-colors text-sm ${currentPath === '/domains' ? 'text-black font-medium' : 'text-gray-900 hover:text-black'}`}
          >
            Домены
          </Link>
          <Link 
            href="/categories" 
            className={`transition-colors text-sm ${currentPath === '/categories' ? 'text-black font-medium' : 'text-gray-900 hover:text-black'}`}
          >
            Категории
          </Link>
          <Link 
            href="/faq" 
            className={`transition-colors text-sm ${currentPath === '/faq' ? 'text-black font-medium' : 'text-gray-900 hover:text-black'}`}
          >
            FAQ
          </Link>
          <Link 
            href="/contact" 
            className="transition-colors text-sm text-gray-900 hover:text-black"
          >
            Войти
          </Link>
        </nav>
      </div>
    </header>
  )
}
