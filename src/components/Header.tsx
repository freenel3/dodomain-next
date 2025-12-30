import Link from "next/link";

/**
 * Компонент хедера с навигацией
 * Server Component - статичный контент
 */
export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-black flex items-center justify-center transition-transform group-hover:scale-105">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <span className="text-xl font-bold text-black tracking-tight">dodomain</span>
        </Link>
        <nav className="flex gap-6 items-center">
          <Link href="/domains" className="text-black font-medium transition-colors text-sm">Домены</Link>
          <Link href="/sell-domain" className="text-gray-900 hover:text-black transition-colors text-sm">Продать</Link>
          <Link href="/blog" className="text-gray-900 hover:text-black transition-colors text-sm">Блог</Link>
          <Link href="/about" className="text-gray-900 hover:text-black transition-colors text-sm">О нас</Link>
          <Link href="/contact" className="text-gray-900 hover:text-black transition-colors text-sm">Контакты</Link>
        </nav>
      </div>
    </header>
  );
}
