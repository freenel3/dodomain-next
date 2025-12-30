import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-12">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div>
            <Logo />
            <p className="text-xs text-gray-600 mt-2">
              Ведущая площадка доменов
            </p>
          </div>
          <div>
            <h4 className="text-black font-bold mb-2 text-xs">Площадка</h4>
            <ul className="space-y-1.5">
              <li><Link href="/domains" className="text-gray-600 hover:text-black transition-colors text-xs">Все домены</Link></li>
              <li><Link href="/sell-domain" className="text-gray-600 hover:text-black transition-colors text-xs">Продать домен</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-black font-bold mb-2 text-xs">Ресурсы</h4>
            <ul className="space-y-1.5">
              <li><Link href="/blog" className="text-gray-600 hover:text-black transition-colors text-xs">Блог</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-black font-bold mb-2 text-xs">Компания</h4>
            <ul className="space-y-1.5">
              <li><Link href="/about" className="text-gray-600 hover:text-black transition-colors text-xs">О нас</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-black transition-colors text-xs">Контакты</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4 text-center text-xs text-gray-600">
          © 2024 dodomain. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
