import { Link, useSearchParams } from 'react-router';
import { Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useState, useMemo } from 'react';
import SEO from '../components/SEO';
import Logo from '../components/Logo';
import Breadcrumbs from '../components/Breadcrumbs';

const allPosts = [
  {
    slug: '2000-hu',
    title: 'Доменная зона .2000.hu — полное руководство',
    excerpt: 'Что такое .2000.hu, кто может его использовать и какие преимущества он предоставляет для венгерского рынка.',
    date: '20 дек 2024',
    readTime: '8 мин',
    category: 'Доменные зоны'
  },
  {
    slug: '-com-ru',
    title: '.COM против .RU: Выбор правильной доменной зоны',
    excerpt: 'Понимание различий между доменами .COM и .RU.',
    date: '15 дек 2024',
    readTime: '5 мин',
    category: 'Руководство'
  },
  {
    slug: 'domain-valuation',
    title: 'Как оценить ваш домен в 2024 году',
    excerpt: 'Ключевые факторы стоимости домена.',
    date: '10 дек 2024',
    readTime: '7 мин',
    category: 'Оценка'
  },
  {
    slug: 'premium-domains',
    title: 'Рост премиум доменов',
    excerpt: 'Почему премиум домены дорожают.',
    date: '5 дек 2024',
    readTime: '6 мин',
    category: 'Индустрия'
  },
  {
    slug: 'domain-investing-2024',
    title: 'Доменный инвестинг в 2024: Стратегии и советы',
    excerpt: 'Узнайте, как эффективно инвестировать в доменные имена в текущем рынке.',
    date: '1 дек 2024',
    readTime: '9 мин',
    category: 'Инвестиции'
  },
  {
    slug: 'new-tlds-overview',
    title: 'Обзор новых доменных зон: Что стоит знать',
    excerpt: 'Анализ перспективных новых доменных зон и их потенциала.',
    date: '28 ноя 2024',
    readTime: '6 мин',
    category: 'Доменные зоны'
  },
  {
    slug: 'domain-transfer-guide',
    title: 'Руководство по переносу доменов',
    excerpt: 'Пошаговая инструкция безопасного переноса доменного имени.',
    date: '25 ноя 2024',
    readTime: '5 мин',
    category: 'Руководство'
  },
  {
    slug: 'seo-domain-names',
    title: 'SEO и доменные имена: Влияние на ранжирование',
    excerpt: 'Как выбор домена влияет на продвижение сайта в поисковых системах.',
    date: '20 ноя 2024',
    readTime: '7 мин',
    category: 'SEO'
  },
  {
    slug: 'domain-security',
    title: 'Безопасность доменов: Защита ваших активов',
    excerpt: 'Лучшие практики для защиты доменных имен от кражи и мошенничества.',
    date: '15 ноя 2024',
    readTime: '6 мин',
    category: 'Безопасность'
  },
  {
    slug: 'brandable-domains',
    title: 'Создание брендируемых доменных имен',
    excerpt: 'Советы по выбору и созданию доменов с высоким брендовым потенциалом.',
    date: '10 ноя 2024',
    readTime: '8 мин',
    category: 'Брендинг'
  },
  {
    slug: 'domain-marketplace-trends',
    title: 'Тренды доменного маркетплейса 2024',
    excerpt: 'Анализ текущих трендов продаж и покупок на доменных площадках.',
    date: '5 ноя 2024',
    readTime: '7 мин',
    category: 'Индустрия'
  },
  {
    slug: 'domain-renewal-tips',
    title: 'Продление доменов: Что нужно знать',
    excerpt: 'Важные моменты при продлении доменных имен и экономии средств.',
    date: '1 ноя 2024',
    readTime: '5 мин',
    category: 'Руководство'
  },
  {
    slug: 'international-domains',
    title: 'Международные домены: Возможности и вызовы',
    excerpt: 'Работа с доменами разных стран и языковые особенности.',
    date: '28 окт 2024',
    readTime: '6 мин',
    category: 'Международное'
  },
  {
    slug: 'domain-parking',
    title: 'Парковка доменов: Монетизация неиспользуемых доменов',
    excerpt: 'Как получать доход от доменных имен, которые пока не используются.',
    date: '25 окт 2024',
    readTime: '7 мин',
    category: 'Монетизация'
  },
  {
    slug: 'domain-auction-strategies',
    title: 'Стратегии участия в доменных аукционах',
    excerpt: 'Как успешно покупать домены на аукционах и не переплачивать.',
    date: '20 окт 2024',
    readTime: '8 мин',
    category: 'Аукционы'
  }
];

const POSTS_PER_PAGE = 10;

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  
  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return allPosts;
    
    const query = searchQuery.toLowerCase();
    return allPosts.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);
  
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  
  const featuredPost = filteredPosts[0];
  const paginatedPosts = currentPage === 1 
    ? filteredPosts.slice(1, endIndex)
    : filteredPosts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setSearchParams({ page: '1' }); // Reset to page 1 when searching
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Блог - dodomain"
        description="Экспертные советы и рыночные тренды для доменных инвесторов. Статьи об оценке, покупке и продаже доменов."
        keywords="блог о доменах, доменный бизнес, инвестиции в домены, новости доменов"
      />
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Logo />
          <nav className="flex gap-6 items-center">
            <Link to="/domains" className="text-gray-900 hover:text-black transition-colors text-sm">Домены</Link>
            <Link to="/sell-domain" className="text-gray-900 hover:text-black transition-colors text-sm">Продать</Link>
            <Link to="/blog" className="text-black font-medium transition-colors text-sm">Блог</Link>
            <Link to="/about" className="text-gray-900 hover:text-black transition-colors text-sm">О нас</Link>
            <Link to="/contact" className="text-gray-900 hover:text-black transition-colors text-sm">Контакты</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Breadcrumbs 
          items={[
            { label: 'Главная', path: '/' },
            { label: 'Блог' }
          ]}
        />
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">
            Блог
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            Экспертные советы и рыночные тренды для доменных инвесторов
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600" />
              <input
                type="text"
                placeholder="Поиск статей..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-sm border-2 border-gray-800 rounded focus:outline-none focus:border-blue-500 bg-white"
              />
            </div>
          </div>
        </div>

        {/* No results message */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12 border border-gray-200">
            <p className="text-gray-600 text-sm">
              Статьи не найдены. Попробуйте изменить поисковый запрос.
            </p>
          </div>
        )}

        {/* Featured Post - only on page 1 */}
        {currentPage === 1 && filteredPosts.length > 0 && (
          <Link
            to={`/blog/${featuredPost.slug}`}
            className="group block mb-8 border-2 border-black p-6 hover:bg-gray-50 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="px-2 py-0.5 bg-black text-white text-xs font-medium">
                {featuredPost.category}
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{featuredPost.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{featuredPost.readTime}</span>
                </div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-black mb-3 group-hover:underline">
              {featuredPost.title}
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">{featuredPost.excerpt}</p>
          </Link>
        )}

        {/* Blog List */}
        {paginatedPosts.length > 0 && (
          <div className="space-y-4 mb-8">
            {paginatedPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group block border border-gray-200 p-5 hover:border-black transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="px-2 py-0.5 bg-gray-100 text-gray-900 text-xs font-medium">
                  {post.category}
                </div>
                <ArrowRight className="w-4 h-4 text-black opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-lg font-bold text-black mb-2 group-hover:underline">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3 leading-relaxed">{post.excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 border border-gray-200 hover:border-black transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 text-sm font-medium transition-all ${
                    currentPage === page
                      ? 'bg-black text-white'
                      : 'border border-gray-200 text-gray-900 hover:border-black'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-200 hover:border-black transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-200"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

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
