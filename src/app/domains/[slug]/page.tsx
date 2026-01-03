
import { db } from "@/db";
import { domains } from "@/db";
import { eq, sql } from "drizzle-orm";
import { formatPrice } from "@/lib/utils";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import DomainInteractions from "@/components/domains/DomainInteractions";
import Link from "next/link";
import { Globe, Calendar, TrendingUp, Check } from "lucide-react";

// Тип для домена (дублирование, лучше бы в types.ts, но оставим тут для скорости)
interface Domain {
  id: number;
  name: string;
  slug: string | null;
  price: number;
  category: string | null;
  extension: string | null;
  description: string | null;
  registeredYear: number | null;
  traffic: string | null;
  registrationDate: Date | null;
  firstRegistrationDate: Date | null;
  listedDate: Date | null;
  isActive: boolean | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

interface DomainDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: DomainDetailPageProps) {
    const { slug } = await params;
    const domainName = decodeURIComponent(slug);
    
    return {
        title: `Купить домен ${domainName} | dodomain`,
        description: `Премиум домен ${domainName} доступен для покупки. Безопасная сделка, мгновенная передача.`,
    };
}

/**
 * Детальная страница домена
 * Server Component
 */
export default async function DomainDetail({ params }: DomainDetailPageProps) {
  const { slug } = await params;
  const domainName = decodeURIComponent(slug);

  let domain: Domain | null = null;
  let similarDomains: Domain[] = [];

  // 1. Загрузка данных домена
  try {
      const domainData = await db
        .select()
        .from(domains)
        .where(eq(domains.name, domainName))
        .limit(1);

      if (domainData.length > 0) {
          domain = domainData[0];
      }
  } catch (error) {
      console.error("Error fetching domain:", error);
  }

  // Fallback MOCK if logic
  if (!domain) {
      // Mock logic derived from slug
      const derivedExtension = domainName.includes(".") 
        ? "." + domainName.split(".").pop() 
        : ".ru";
      
      domain = {
        id: 0,
        name: domainName,
        slug: slug,
        price: 250000,
        category: "Бизнес",
        extension: derivedExtension,
        description: "Премиальный домен для вашего стартапа. Идеально подходит для бизнеса. (Mock Data)",
        registeredYear: 2018,
        traffic: "Высокий",
        registrationDate: new Date("2018-05-20"),
        firstRegistrationDate: new Date("2018-05-20"),
        listedDate: new Date(),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      console.warn("Using MOCK data for domain detail");
  }

  // 2. Загрузка похожих доменов
  try {
      // Пытаемся найти домены той же категории или просто любые активные
      const allDomainsData = await db
        .select()
        .from(domains)
        .where(sql`${domains.isActive} = true`)
        .limit(10); // берем побольше чтобы профильтровать если надо
      
      if (allDomainsData.length > 0) {
          // Исключаем текущий
          similarDomains = allDomainsData
            .filter(d => d.name !== domainName)
            .slice(0, 4);
      }
  } catch (error) {
     console.error("Error fetching similar domains:", error);
  }

  // MOCK fallback for similar if DB failed or empty
  if (similarDomains.length === 0) {
      similarDomains = [
        {
          id: 101,
          name: "ai.ru",
          price: 5000000,
          category: "Премиум",
          extension: ".ru",
          description: "Уникальный двухбуквенный домен.",
          slug: "ai-ru",
          registeredYear: 2005,
          traffic: "Высокий",
          registrationDate: new Date(),
          firstRegistrationDate: new Date(),
          listedDate: new Date(),
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 102,
          name: "business.net",
          price: 350000,
          category: "Бизнес",
          extension: ".net",
          description: "Для бизнеса.",
          slug: "business-net",
          registeredYear: 2020,
          traffic: "Средний",
          registrationDate: new Date(),
          firstRegistrationDate: new Date(),
          listedDate: new Date(),
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 103,
          name: "zzsg.ru",
          price: 350000,
          category: "Бизнес",
          extension: ".ru",
          description: "Для бизнеса.",
          slug: "zzsg-ru",
          registeredYear: 2021,
          traffic: "Средний",
          registrationDate: new Date(),
          firstRegistrationDate: new Date(),
          listedDate: new Date(),
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 104,
          name: "zzpd.ru",
          price: 350000,
          category: "Бизнес",
          extension: ".ru",
          description: "Для бизнеса.",
          slug: "zzpd-ru",
          registeredYear: 2022,
          traffic: "Средний",
          registrationDate: new Date(),
          firstRegistrationDate: new Date(),
          listedDate: new Date(),
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ];
  }


  return (
    <div className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <Breadcrumbs
            items={[
              { label: "Главная", path: "/" },
              { label: "Домены", path: "/domains" },
              { label: domain.name },
            ]}
          />
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Основной контент */}
            <div className="lg:col-span-2 space-y-6">
              {/* Заголовок домена */}
              <div className="border border-gray-200 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="px-2 py-0.5 bg-gray-100 text-gray-900 text-xs font-medium">
                    {domain.category}
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-display font-bold text-black tracking-tight">
                      {formatPrice(domain.price)}
                    </div>
                  </div>
                </div>
                <h1 className="text-4xl font-display font-bold text-black mb-3 tracking-tight">
                  {domain.name}
                </h1>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  {domain.description || "Премиум домен для вашего бизнеса"}
                </p>

                <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs pt-3 border-t border-gray-200">
                  {domain.registrationDate && (
                    <span className="text-gray-900">
                      <span className="text-gray-500">Рег.:</span>{" "}
                      <span className="font-medium">
                        {new Date(domain.registrationDate).toLocaleDateString(
                          "ru-RU"
                        )}
                      </span>
                    </span>
                  )}
                  {domain.firstRegistrationDate && (
                    <span className="text-gray-900">
                      <span className="text-gray-500">1-я рег.:</span>{" "}
                      <span className="font-medium">
                        {new Date(
                          domain.firstRegistrationDate
                        ).toLocaleDateString("ru-RU")}
                      </span>
                    </span>
                  )}
                  {domain.listedDate && (
                    <span className="text-gray-900">
                      <span className="text-gray-500">На продажу:</span>{" "}
                      <span className="font-medium">
                        {new Date(domain.listedDate).toLocaleDateString(
                          "ru-RU"
                        )}
                      </span>
                    </span>
                  )}
                </div>
              </div>

              {/* Статистика */}
              <div className="grid grid-cols-3 gap-3">
                <Link
                  href={`/domains?extension=${encodeURIComponent(
                    domain.extension || ""
                  )}`}
                  className="border-2 border-gray-200 p-3 hover:border-black transition-all cursor-pointer block"
                >
                  <Globe className="w-5 h-5 text-black mb-2" />
                  <div className="text-xs text-gray-500 mb-1">Зона</div>
                  <div className="text-base font-bold text-black underline decoration-2 underline-offset-4 hover:decoration-gray-500">
                    {domain.extension}
                  </div>
                </Link>
                <div className="border-2 border-gray-200 p-3">
                  <Calendar className="w-5 h-5 text-black mb-2" />
                  <div className="text-xs text-gray-500 mb-1">Год</div>
                  <div className="text-base font-bold text-black">
                    {domain.registeredYear || "—"}
                  </div>
                </div>
                <div className="border-2 border-gray-200 p-3">
                  <TrendingUp className="w-5 h-5 text-black mb-2" />
                  <div className="text-xs text-gray-500 mb-1">
                    SEO потенциал
                  </div>
                  <div className="text-base font-bold text-black">
                    {domain.traffic || "—"}
                  </div>
                </div>
              </div>

              {/* Похожие домены */}
              {similarDomains.length > 0 && (
                  <div className="mt-12">
                    <h2 className="text-3xl font-display font-bold text-black mb-6 tracking-tight">
                      Похожие домены
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {similarDomains.map((similar) => (
                      <Link
                        key={similar.name}
                        href={`/domains/${encodeURIComponent(similar.name)}`}
                        className="group bg-white border border-gray-200 p-3 flex flex-col hover:border-black transition-all relative"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="px-1.5 py-0.5 bg-gray-100 text-gray-900 text-[10px] font-medium rounded-sm">
                            {similar.category}
                          </div>
                          <div className="text-base font-display font-bold text-black tracking-tight">
                            {formatPrice(similar.price)}
                          </div>
                        </div>
                        <h3 className="text-xl font-display font-bold text-black mb-1 group-hover:underline tracking-tight">
                          {similar.name}
                        </h3>
                        <div className="flex items-center gap-1 text-gray-400 mt-auto">
                          <Globe className="w-3 h-3" />
                          <span className="text-[10px]">
                            домен {similar.extension}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Сайдбар */}
            <div className="lg:col-span-1">
              <div className="border border-gray-200 p-4 sticky top-20">
                <div className="mb-4">
                  <div className="text-xs text-gray-600 mb-1 uppercase tracking-wide">
                    Цена покупки
                  </div>
                  <div className="text-3xl font-display font-bold text-black mb-4 tracking-tight">
                    {formatPrice(domain.price)}
                  </div>
                  
                  {/* Client Component for Interactions */}
                  <DomainInteractions domainName={domain.name} />
                  
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2 text-xs text-gray-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-gray-400" />
                    <span>Безопасный перевод</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-gray-400" />
                    <span>Мгновенный перенос</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-gray-400" />
                    <span>Гарантия возврата</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
