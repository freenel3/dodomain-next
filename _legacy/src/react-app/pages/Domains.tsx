import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import { Search, Globe, ChevronLeft, ChevronRight, Mail } from 'lucide-react';
import SEO from '../components/SEO';
import Logo from '../components/Logo';
import Breadcrumbs from '../components/Breadcrumbs';
import ContactModal from '../components/ContactModal';
import CustomSelect from '../components/CustomSelect';
import { useDomains } from '../hooks/useDomains';

const ITEMS_PER_PAGE = 20;

export default function Domains() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedExtension, setSelectedExtension] = useState(searchParams.get('extension') || '');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [lengthFilter, setLengthFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState('');

  const { domains: allDomains, loading, error } = useDomains();

  // Update filters from URL params
  useEffect(() => {
    const search = searchParams.get('search');
    const extension = searchParams.get('extension');
    if (search) {
      setSearchQuery(search);
    }
    if (extension) {
      setSelectedExtension(extension);
    }
  }, [searchParams]);

  // Get unique extensions with custom order
  const extensions = useMemo(() => {
    const customOrder = [
      '.ru', '.рф', '.рус', '.ru.com', '.com', '.net', '.org', '.info',
      '.su', '.moscow', '.москва', '.tatar', '.дети', '.онлайн', '.сайт',
      '.name', '.ru.net', '.com.ru', '.msk.ru', '.spb.ru', '.спб.рф',
      '.xyz', '.site', '.online', '.website', '.space', '.pw', '.pro',
      '.rent', '.tech', '.fans', '.college', '.love', '.press', '.host'
    ];
    
    const unique = Array.from(new Set(allDomains.map(d => d.extension)));
    
    // Sort by custom order, keeping only extensions that exist in domains
    return customOrder.filter(ext => unique.includes(ext));
  }, [allDomains]);

  // Filter domains
  const filteredDomains = useMemo(() => {
    return allDomains.filter(domain => {
      // Search filter
      if (searchQuery && !domain.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Extension filter
      if (selectedExtension && domain.extension !== selectedExtension) {
        return false;
      }

      // Price range filter
      const priceFromNum = priceFrom ? parseInt(priceFrom.replace(/\s/g, '')) : 0;
      const priceToNum = priceTo ? parseInt(priceTo.replace(/\s/g, '')) : Infinity;
      
      if (priceFrom && domain.price < priceFromNum) return false;
      if (priceTo && domain.price > priceToNum) return false;

      // Length filter
      const nameWithoutExt = domain.name.split('.')[0];
      const length = nameWithoutExt.length;
      if (lengthFilter) {
        if (lengthFilter === '2' && length !== 2) return false;
        if (lengthFilter === '3' && length !== 3) return false;
        if (lengthFilter === '4' && length !== 4) return false;
        if (lengthFilter === '5' && length !== 5) return false;
        if (lengthFilter === '5+' && length < 5) return false;
      }

      return true;
    });
  }, [allDomains, searchQuery, selectedExtension, priceFrom, priceTo, lengthFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredDomains.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedDomains = filteredDomains.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset to page 1 when filters change
  const handleFilterChange = (setter: (value: string) => void) => (value: string) => {
    setter(value);
    setCurrentPage(1);
  };

  const formatPrice = (price: number) => {
    return `${price.toLocaleString('ru-RU')} ₽`;
  };

  const handlePriceRequest = (domainName: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedDomain(domainName);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-red-600">Ошибка загрузки доменов</div>
      </div>
    );
  }

  return (
    <>
      <ContactModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        domainName={selectedDomain}
        type="offer"
      />
    <div className="min-h-screen bg-white">
      <SEO
        title="Все домены - dodomain"
        description="Каталог премиум доменов. Фильтруйте по зоне, цене и длине. Более 45 премиум доменных имен для вашего бизнеса."
        keywords="каталог доменов, купить домен, домены .com, домены .ru, домены .рф, премиум домены"
      />
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Logo />
          <nav className="flex gap-6 items-center">
            <Link to="/domains" className="text-black font-medium transition-colors text-sm">Домены</Link>
            <Link to="/sell-domain" className="text-gray-900 hover:text-black transition-colors text-sm">Продать</Link>
            <Link to="/blog" className="text-gray-900 hover:text-black transition-colors text-sm">Блог</Link>
            <Link to="/about" className="text-gray-900 hover:text-black transition-colors text-sm">О нас</Link>
            <Link to="/contact" className="text-gray-900 hover:text-black transition-colors text-sm">Контакты</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Breadcrumbs 
          items={[
            { label: 'Главная', path: '/' },
            { label: 'Домены' }
          ]}
        />
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display font-bold text-black mb-3 tracking-tight">
            Площадка премиум доменов
          </h1>
          <p className="text-base text-gray-600 font-light">
            Более 500 000 ценных доменных имен для вашего бизнеса
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Поиск доменов..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-3 py-2.5 bg-white border border-gray-300 text-black text-sm placeholder-gray-500 focus:outline-none focus:border-black transition-all"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-5 gap-3 mb-6">
          <div>
            <label className="block text-xs font-medium text-black mb-1.5">Зона</label>
            <CustomSelect
              value={selectedExtension}
              onChange={(value) => handleFilterChange(setSelectedExtension)(value)}
              options={[
                { value: '', label: 'Все зоны' },
                ...extensions.map(ext => ({ value: ext, label: ext }))
              ]}
              placeholder="Все зоны"
              maxVisibleOptions={5}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-black mb-1.5">Цена от</label>
            <input
              type="text"
              placeholder="0"
              value={priceFrom}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setPriceFrom(value ? parseInt(value).toLocaleString('ru-RU') : '');
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 bg-white border border-gray-300 text-black text-sm placeholder-gray-400 focus:outline-none focus:border-black transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-black mb-1.5">Цена до</label>
            <input
              type="text"
              placeholder="∞"
              value={priceTo}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setPriceTo(value ? parseInt(value).toLocaleString('ru-RU') : '');
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 bg-white border border-gray-300 text-black text-sm placeholder-gray-400 focus:outline-none focus:border-black transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-black mb-1.5">Длина</label>
            <select
              value={lengthFilter}
              onChange={(e) => handleFilterChange(setLengthFilter)(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 text-black text-sm focus:outline-none focus:border-black transition-all"
            >
              <option value="">Любая длина</option>
              <option value="2">2 символа</option>
              <option value="3">3 символа</option>
              <option value="4">4 символа</option>
              <option value="5">5 символов</option>
              <option value="5+">От 5 символов</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedExtension('');
                setPriceFrom('');
                setPriceTo('');
                setLengthFilter('');
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 bg-gray-100 text-black text-sm font-medium hover:bg-gray-200 transition-all"
            >
              Сбросить
            </button>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4 text-sm text-gray-600">
          Найдено доменов: {filteredDomains.length}
        </div>

        {/* Domain Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {paginatedDomains.map((domain) => (
            <div
              key={domain.name}
              className="group bg-white border border-gray-200 p-4 hover:border-black transition-all relative"
            >
              <Link
                to={`/domains/${encodeURIComponent(domain.name)}`}
                className="block"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="px-2 py-0.5 bg-gray-100 text-gray-900 text-xs font-medium">
                    {domain.category}
                  </div>
                  <div className="text-xl font-display font-bold text-black tracking-tight">
                    {formatPrice(domain.price)}
                  </div>
                </div>
                <h3 className="text-2xl font-display font-bold text-black mb-1.5 group-hover:underline tracking-tight">
                  {domain.name}
                </h3>
                <div className="flex items-center gap-1.5 text-gray-600 mb-3">
                  <Globe className="w-3.5 h-3.5" />
                  <span className="text-xs">домен {domain.extension}</span>
                </div>
              </Link>
              <button
                onClick={(e) => handlePriceRequest(domain.name, e)}
                className="w-full py-2 bg-white border border-black text-black text-xs font-medium hover:bg-black hover:text-white transition-all flex items-center justify-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                Запросить цену
              </button>
            </div>
          ))}
        </div>

        {filteredDomains.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-sm">Домены не найдены</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:border-black transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
              // Show first page, last page, current page, and pages around current
              const showPage = 
                page === 1 || 
                page === totalPages || 
                (page >= currentPage - 1 && page <= currentPage + 1);
              
              const showEllipsis = 
                (page === currentPage - 2 && currentPage > 3) ||
                (page === currentPage + 2 && currentPage < totalPages - 2);

              if (showEllipsis) {
                return <span key={page} className="px-2 text-gray-400">...</span>;
              }

              if (!showPage) {
                return null;
              }

              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1.5 text-sm font-medium border transition-all ${
                    currentPage === page
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-gray-300 hover:border-black'
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:border-black transition-all"
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
    </>
  );
}
