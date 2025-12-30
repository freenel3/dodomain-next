import { Link, useNavigate } from 'react-router';
import { Search, Globe, TrendingUp, Shield, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import SEO from '../components/SEO';
import Logo from '../components/Logo';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/domains?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/domains');
    }
  };
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="dodomain - Премиум площадка доменов"
        description="Покупайте и продавайте премиум-домены на крупнейшей площадке. Более 500 000 доменов, безопасные сделки и экспертная оценка."
        keywords="домены, покупка доменов, продажа доменов, премиум домены, доменная площадка"
      />
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
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

      {/* Hero Section */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-black mb-4 leading-tight tracking-tight">
            Найдите идеальное доменное имя
          </h1>
          <p className="text-lg text-gray-600 mb-8 font-light">
            Покупайте и продавайте премиум-домены на крупнейшей площадке
          </p>
          <form onSubmit={handleSearch} className="mb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Поиск домена..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-white border border-gray-300 text-black text-sm placeholder-gray-500 focus:outline-none focus:border-black transition-all"
              />
            </div>
          </form>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <span className="text-xs text-gray-600 mr-2">Популярные зоны:</span>
            <Link to="/domains?extension=.ru" className="px-3 py-1 bg-gray-100 text-black text-xs font-medium hover:bg-black hover:text-white transition-all">.ru</Link>
            <Link to="/domains?extension=.рф" className="px-3 py-1 bg-gray-100 text-black text-xs font-medium hover:bg-black hover:text-white transition-all">.рф</Link>
            <Link to="/domains?extension=.com" className="px-3 py-1 bg-gray-100 text-black text-xs font-medium hover:bg-black hover:text-white transition-all">.com</Link>
            <Link to="/domains?extension=.онлайн" className="px-3 py-1 bg-gray-100 text-black text-xs font-medium hover:bg-black hover:text-white transition-all">.онлайн</Link>
            <Link to="/domains?extension=.москва" className="px-3 py-1 bg-gray-100 text-black text-xs font-medium hover:bg-black hover:text-white transition-all">.москва</Link>
            <Link to="/domains?extension=.net" className="px-3 py-1 bg-gray-100 text-black text-xs font-medium hover:bg-black hover:text-white transition-all">.net</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/domains"
              className="px-5 py-2 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all inline-flex items-center gap-2"
            >
              Смотреть домены
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/sell-domain"
              className="px-5 py-2 bg-white border border-black text-black text-sm font-medium hover:bg-gray-50 transition-all"
            >
              Продать домен
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
          <div className="text-center">
            <div className="text-3xl font-display font-bold text-black mb-1 tracking-tight">
              500К+
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-wide font-medium">Премиум доменов</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-display font-bold text-black mb-1 tracking-tight">
              5К+
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-wide font-medium">Активных покупателей</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-display font-bold text-black mb-1 tracking-tight">
              $50М+
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-wide font-medium">Общие продажи</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-bold text-black mb-3 tracking-tight">
              Почему выбирают dodomain
            </h2>
            <p className="text-base text-gray-600 font-light">
              Самая надежная платформа для доменных транзакций
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 p-5">
              <div className="w-10 h-10 bg-black flex items-center justify-center mb-4">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-display font-semibold text-black mb-2 tracking-tight">Глобальная площадка</h3>
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                Доступ к доменам со всего мира
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-5">
              <div className="w-10 h-10 bg-black flex items-center justify-center mb-4">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-display font-semibold text-black mb-2 tracking-tight">Безопасные сделки</h3>
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                Защита эскроу и гарантия возврата
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-5">
              <div className="w-10 h-10 bg-black flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-display font-semibold text-black mb-2 tracking-tight">Экспертная оценка</h3>
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                Помощь в оценке доменов
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-black p-10 text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4 tracking-tight">
            Готовы начать?
          </h2>
          <p className="text-base text-gray-300 mb-8 font-light">
            Присоединяйтесь к тысячам доменных инвесторов
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/domains"
              className="px-5 py-2 bg-white text-black text-sm font-medium hover:bg-gray-100 transition-all"
            >
              Посмотреть домены
            </Link>
            <Link
              to="/sell-domain"
              className="px-5 py-2 bg-transparent border border-white text-white text-sm font-medium hover:bg-white hover:text-black transition-all"
            >
              Продать домен
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
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
