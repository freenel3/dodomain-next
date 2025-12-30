import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Globe, Calendar, TrendingUp } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import DomainActions from '@/components/DomainActions';
import { db } from '@/lib/db';
import { domains } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { Metadata } from 'next';

// Helper to find similar domains (simplified for server-side)
async function getSimilarDomains(currentDomain: typeof domains.$inferSelect) {
  // In a real app we'd use a more complex vector or SQL query
  // Here we just fetch some domains with the same extension or similar price
  const allDomains = await db.select().from(domains).where(eq(domains.isActive, true)).limit(20);
  
  const filtered = allDomains.filter(d => d.name !== currentDomain.name);
  
  const scored = filtered.map(d => {
    let score = 0;
    if (d.extension === currentDomain.extension) score += 10;
    
    // Simple price proximity
    const priceDiff = Math.abs(d.price - currentDomain.price);
    if (priceDiff < currentDomain.price * 0.5) score += 5;
    
    // Simple length proximity
    const currentLength = currentDomain.name.split('.')[0].length;
    const domainLength = d.name.split('.')[0].length;
    if (Math.abs(currentLength - domainLength) <= 2) score += 2;
    
    return { ...d, score };
  });
  
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
}

// Generate Metadata
type Props = {
  params: Promise<{ domain: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { domain: domainParam } = await params;
  const decodedDomain = decodeURIComponent(domainParam);
  
  // Note: we might want to cache this fetch or use React cache()
  const domainData = await db.select().from(domains).where(eq(domains.name, decodedDomain)).limit(1);
  const data = domainData[0];

  if (!data) return { title: 'Домен не найден' };

  const formatPrice = (price: number) => `${price.toLocaleString('ru-RU')} ₽`;

  return {
    title: `${data.name} - ${formatPrice(data.price)} | dodomain`,
    description: `${data.description} Цена: ${formatPrice(data.price)}. ${data.category} домен в зоне ${data.extension}. Безопасная покупка на dodomain.`,
    keywords: `${data.name}, купить ${data.name}, домен ${data.extension}, ${data.category?.toLowerCase()} домен`
  };
}

export default async function DomainDetailPage({ params }: Props) {
  const { domain: domainParam } = await params;
  const decodedDomain = decodeURIComponent(domainParam);

  // Fetch domain data
  const domainData = await db.select().from(domains).where(eq(domains.name, decodedDomain)).limit(1);
  const data = domainData[0];

  if (!data) {
    notFound();
  }

  const similarDomains = await getSimilarDomains(data);

  const formatPrice = (price: number) => `${price.toLocaleString('ru-RU')} ₽`;

  return (
    <div className="min-h-screen bg-white">
      {/* Header is in Layout */}
      
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
                <span className="text-gray-900"><span className="text-gray-500">Рег.:</span> <span className="font-medium">{data.registeredYear ?? 'N/A'}</span></span>
                {/* Note: In legacy it accessed fields like registrationDate which are timestamps in new schema. Display simple year or formatted date */}
                {/* Assuming legacy data displayed strings, but here we have dates or nulls. Simplify for now. */}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <Link href={`/domains?extension=${data.extension}`} className="border-2 border-gray-200 p-3 hover:border-black transition-all cursor-pointer">
                <Globe className="w-5 h-5 text-black mb-2" />
                <div className="text-xs text-gray-500 mb-1">Зона</div>
                <div className="text-base font-bold text-black underline decoration-2 underline-offset-4 hover:decoration-gray-500">{data.extension}</div>
              </Link>
              <div className="border-2 border-gray-200 p-3">
                <Calendar className="w-5 h-5 text-black mb-2" />
                <div className="text-xs text-gray-500 mb-1">Год</div>
                <div className="text-base font-bold text-black">{data.registeredYear}</div>
              </div>
              <div className="border-2 border-gray-200 p-3">
                <TrendingUp className="w-5 h-5 text-black mb-2" />
                <div className="text-xs text-gray-500 mb-1">SEO потенциал</div>
                <div className="text-base font-bold text-black">{data.traffic || 'N/A'}</div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
             <DomainActions domainName={data.name} price={data.price} />
          </div>
        </div>

        {/* Similar Domains Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-display font-bold text-black mb-6 tracking-tight">Похожие домены</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {similarDomains.map((similar) => (
              <Link
                key={similar.name}
                href={`/domains/${encodeURIComponent(similar.name)}`}
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
    </div>
  );
}
