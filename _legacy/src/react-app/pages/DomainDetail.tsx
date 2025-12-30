import { Link, useParams } from 'react-router';
import { Globe, Calendar, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import SEO from '../components/SEO';
import Logo from '../components/Logo';
import ContactModal from '../components/ContactModal';
import Breadcrumbs from '../components/Breadcrumbs';
import { useDomain } from '../hooks/useDomain';
import { useDomains } from '../hooks/useDomains';

function getSimilarDomains(allDomains: any[], currentDomain: string, currentPrice: number, currentExtension: string) {
  // Filter out the current domain and find similar ones
  const filtered = allDomains.filter(d => d.name !== currentDomain);
  
  // Score domains by similarity
  const scored = filtered.map(d => {
    let score = 0;
    
    // Same extension gets highest priority
    if (d.extension === currentExtension) score += 10;
    
    // Similar price range
    const priceDiff = Math.abs(d.price - currentPrice);
    if (priceDiff < currentPrice * 0.5) score += 5;
    else if (priceDiff < currentPrice * 1.5) score += 3;
    else if (priceDiff < currentPrice * 3) score += 1;
    
    // Similar length
    const currentLength = currentDomain.split('.')[0].length;
    const domainLength = d.name.split('.')[0].length;
    if (Math.abs(currentLength - domainLength) <= 2) score += 2;
    
    return { ...d, score };
  });
  
  // Sort by score and return top 4
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
}

const formatPrice = (price: number) => {
  return `${price.toLocaleString('ru-RU')} ₽`;
};

export default function DomainDetail() {
  const { domain } = useParams();
  const decodedDomain = domain ? decodeURIComponent(domain) : '';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'buy' | 'offer'>('buy');
  
  const { domain: data, loading, error } = useDomain(decodedDomain);
  const { domains: allDomains } = useDomains();
  
  const similarDomains = data && allDomains.length > 0 
    ? getSimilarDomains(allDomains, data.name, data.price, data.extension)
    : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-sm text-gray-600">Загрузка...</div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-sm text-gray-600">Домен не найден</div>
          <Link to="/domains" className="text-sm text-black underline mt-2 inline-block">
            Вернуться к каталогу
          </Link>
        </div>
      </div>
    );
  }

  const openBuyModal = () => {
    setModalType('buy');
    setIsModalOpen(true);
  };

  const openOfferModal = () => {
    setModalType('offer');
    setIsModalOpen(true);
  };

  return (
    <>
      <ContactModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        domainName={data.name}
        type={modalType}
      />
      <div className="min-h-screen bg-white">
        <SEO
        title={`${data.name} - ${formatPrice(data.price)} | dodomain`}
        description={`${data.description} Цена: ${formatPrice(data.price)}. ${data.category} домен в зоне ${data.extension}. Безопасная покупка на dodomain.`}
        keywords={`${data.name}, купить ${data.name}, домен ${data.extension}, ${data.category.toLowerCase()} домен`}
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

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs 
          items={[
            { label: 'Главная', path: '/' },
            { label: 'Домены', path: '/domains' },
            { label: data.name }
          ]}
        />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Domain Header */}
            <div className="border border-gray-200 p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="px-2 py-0.5 bg-gray-100 text-gray-900 text-xs font-medium">
                  {data.category}
                </div>
                <div className="text-right">
                  <div className="text-3xl font-display font-bold text-black tracking-tight">{formatPrice(data.price)}</div>
                </div>
              </div>
              <h1 className="text-4xl font-display font-bold text-black mb-3 tracking-tight">{data.name}</h1>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">{data.description}</p>
              
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs pt-3 border-t border-gray-200">
                <span className="text-gray-900"><span className="text-gray-500">Рег.:</span> <span className="font-medium">{data.registrationDate}</span></span>
                <span className="text-gray-900"><span className="text-gray-500">1-я рег.:</span> <span className="font-medium">{data.firstRegistrationDate}</span></span>
                <span className="text-gray-900"><span className="text-gray-500">На продажу:</span> <span className="font-medium">{data.listedDate}</span></span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <Link to={`/domains?extension=${data.extension}`} className="border-2 border-gray-200 p-3 hover:border-black transition-all cursor-pointer">
                <Globe className="w-5 h-5 text-black mb-2" />
                <div className="text-xs text-gray-500 mb-1">Зона</div>
                <div className="text-base font-bold text-black underline decoration-2 underline-offset-4 hover:decoration-gray-500">{data.extension}</div>
              </Link>
              <div className="border-2 border-gray-200 p-3">
                <Calendar className="w-5 h-5 text-black mb-2" />
                <div className="text-xs text-gray-500 mb-1">Год</div>
                <div className="text-base font-bold text-black">{data.registered}</div>
              </div>
              <div className="border-2 border-gray-200 p-3">
                <TrendingUp className="w-5 h-5 text-black mb-2" />
                <div className="text-xs text-gray-500 mb-1">SEO потенциал</div>
                <div className="text-base font-bold text-black">{data.traffic}</div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="border border-gray-200 p-4 sticky top-20">
              <div className="mb-4">
                <div className="text-xs text-gray-600 mb-1 uppercase tracking-wide">Цена покупки</div>
                <div className="text-3xl font-display font-bold text-black mb-4 tracking-tight">{formatPrice(data.price)}</div>
                <button 
                  onClick={openBuyModal}
                  className="w-full py-2.5 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all mb-2"
                >
                  Купить сейчас
                </button>
                <button 
                  onClick={openOfferModal}
                  className="w-full py-2.5 bg-white border border-black text-black text-sm font-medium hover:bg-gray-50 transition-all"
                >
                  Сделать предложение
                </button>
              </div>
              
              <div className="border-t border-gray-200 pt-4 space-y-2 text-xs text-gray-700">
                <div>✓ Безопасный перевод</div>
                <div>✓ Мгновенный перенос</div>
                <div>✓ Гарантия возврата</div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Domains Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-display font-bold text-black mb-6 tracking-tight">Похожие домены</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {similarDomains.map((similar) => (
              <Link
                key={similar.name}
                to={`/domains/${encodeURIComponent(similar.name)}`}
                className="group bg-white border border-gray-200 p-4 hover:border-black transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="px-2 py-0.5 bg-gray-100 text-gray-900 text-xs font-medium">
                    {similar.category}
                  </div>
                  <div className="text-lg font-display font-bold text-black tracking-tight">
                    {formatPrice(similar.price)}
                  </div>
                </div>
                <h3 className="text-xl font-display font-bold text-black mb-1.5 group-hover:underline tracking-tight">
                  {similar.name}
                </h3>
                <div className="flex items-center gap-1.5 text-gray-600">
                  <Globe className="w-3.5 h-3.5" />
                  <span className="text-xs">домен {similar.extension}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
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
