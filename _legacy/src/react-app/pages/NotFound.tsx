import { Link } from 'react-router';
import { Home, Search } from 'lucide-react';
import SEO from '../components/SEO';
import Logo from '../components/Logo';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SEO
        title="Страница не найдена - dodomain"
        description="Запрашиваемая страница не существует"
      />
      
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Logo />
          <nav className="flex gap-6 items-center">
            <Link to="/domains" className="text-gray-900 hover:text-black transition-colors text-sm">Домены</Link>
            <Link to="/sell-domain" className="text-gray-900 hover:text-black transition-colors text-sm">Продать</Link>
            <Link to="/blog" className="text-gray-900 hover:text-black transition-colors text-sm">Блог</Link>
            <Link to="/about" className="text-gray-900 hover:text-black transition-colors text-sm">О нас</Link>
            <Link to="/contact" className="text-gray-900 hover:text-black transition-colors text-sm">Контакты</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
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
              to="/"
              className="px-5 py-2.5 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all inline-flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Вернуться на главную
            </Link>
            <Link
              to="/domains"
              className="px-5 py-2.5 bg-white border border-black text-black text-sm font-medium hover:bg-gray-50 transition-all inline-flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              Искать домены
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200">
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
                <li><Link to="/domains" className="text-gray-600 hover:text-black transition-colors text-xs">Все домены</Link></li>
                <li><Link to="/sell-domain" className="text-gray-600 hover:text-black transition-colors text-xs">Продать домен</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-black font-bold mb-2 text-xs">Ресурсы</h4>
              <ul className="space-y-1.5">
                <li><Link to="/blog" className="text-gray-600 hover:text-black transition-colors text-xs">Блог</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-black font-bold mb-2 text-xs">Компания</h4>
              <ul className="space-y-1.5">
                <li><Link to="/about" className="text-gray-600 hover:text-black transition-colors text-xs">О нас</Link></li>
                <li><Link to="/contact" className="text-gray-600 hover:text-black transition-colors text-xs">Контакты</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4 text-center text-xs text-gray-600">
            © 2024 dodomain. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
