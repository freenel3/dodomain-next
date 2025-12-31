"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { db } from "@/db";
import { domains } from "@/db";
import { eq, sql } from "drizzle-orm";
import { formatPrice, getSimilarDomains, getFullUrl } from "@/lib/utils";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ContactModal from "@/components/ui/ContactModal";

import {
  Globe,
  Calendar,
  TrendingUp,
  Mail,
  ArrowRight,
  Check,
} from "lucide-react";

// Тип для домена из БД
// Тип для домена из БД
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
  params: {
    slug: string;
  };
}

/**
 * Детальная страница домена
 * Client Component - требует useState для модального окна
 */
export default function DomainDetail({ params }: DomainDetailPageProps) {
  const [domain, setDomain] = useState<Domain | null>(null);
  const [loading, setLoading] = useState(true);
  const [allDomains, setAllDomains] = useState<Domain[]>([]);
  const [similarDomains, setSimilarDomains] = useState<Domain[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"buy" | "offer">("buy");

  const domainName = decodeURIComponent(params.slug);

  // MOCK DATA для локальной разработки
  const domainNameDecoded = decodeURIComponent(params.slug);
  const derivedExtension = domainNameDecoded.includes(".") 
    ? "." + domainNameDecoded.split(".").pop() 
    : ".ru";

  const MOCK_DOMAIN: Domain = {
    id: 1,
    name: domainNameDecoded,
    slug: params.slug,
    price: 250000,
    category: "Бизнес",
    extension: derivedExtension,
    description: "Премиальный домен для вашего стартапа. Идеально подходит для финтех проектов или e-commerce. Легко запомнить, отлично звучит.",
    registeredYear: 2018,
    traffic: "Высокий",
    registrationDate: new Date("2018-05-20"),
    firstRegistrationDate: new Date("2018-05-20"),
    listedDate: new Date(),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Загрузка данных домена
  useEffect(() => {
    async function loadDomain() {
      try {
        setLoading(true);

        // Загружаем домен по имени
        const domainData = await db
          .select()
          .from(domains)
          .where(eq(domains.name, domainName))
          .limit(1);

        if (domainData.length === 0) {
           // Fallback to MOCK
           console.warn("Domain not found in DB, using MOCK data");
           setDomain(MOCK_DOMAIN);
        } else {
          setDomain(domainData[0]);
        }

        // Загружаем похожие домены (или мок)
        try {
          const allDomainsData = await db
            .select()
            .from(domains)
            .where(sql`${domains.isActive} = true`);
          
          if (allDomainsData.length > 0) {
             setAllDomains(allDomainsData);
          } else {
             setAllDomains([MOCK_DOMAIN]); // Mock list
          }
        } catch (e) {
             setAllDomains([MOCK_DOMAIN]); // Mock list on error
        }

      } catch (error) {
        console.error("Error loading domain, using mock:", error);
        setDomain(MOCK_DOMAIN);
      } finally {
        setLoading(false);
      }
    }

    loadDomain();
  }, [domainName]);

  // MOCK DATA для похожих доменов (как на скриншоте)
  const SIMILAR_DOMAINS_MOCK: Domain[] = [
    {
      id: 1,
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
      id: 2,
      name: "zzsm.ru",
      price: 350000,
      category: "Бизнес",
      extension: ".ru",
      description: "Короткий домен для бизнеса.",
      slug: "zzsm-ru",
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
      id: 3,
      name: "zzsg.ru",
      price: 350000,
      category: "Бизнес",
      extension: ".ru",
      description: "Домен для компании.",
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
      id: 4,
      name: "zzpd.ru",
      price: 350000,
      category: "Бизнес",
      extension: ".ru",
      description: "Аббревиатура для проекта.",
      slug: "zzpd-ru",
      registeredYear: 2022,
      traffic: "Низкий",
      registrationDate: new Date(),
      firstRegistrationDate: new Date(),
      listedDate: new Date(),
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];

  // Обновляем похожие домены (всегда показываем этот список для демки)
  useEffect(() => {
    setSimilarDomains(SIMILAR_DOMAINS_MOCK);
  }, []);

  const openBuyModal = () => {
    setModalType("buy");
    setIsModalOpen(true);
  };

  const openOfferModal = () => {
    setModalType("offer");
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-sm text-gray-600">Загрузка...</div>
        </div>
      </div>
    );
  }

  if (!domain) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-sm text-gray-600">Домен не найден</div>
          <a
            href="/domains"
            className="text-sm text-black underline mt-2 inline-block"
          >
            Вернуться к каталогу
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        domainName={domain.name}
        type={modalType}
      />

      <div className="min-h-screen bg-white">

        
        <Breadcrumbs
          items={[
            { label: "Главная", path: "/" },
            { label: "Домены", path: "/domains" },
            { label: domain.name },
          ]}
        />

        <div className="max-w-3xl mx-auto px-4 py-8">
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
                <a
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
                </a>
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
                      <a
                        key={similar.name}
                        href={`/domains/${encodeURIComponent(similar.name)}`}
                        className="group bg-white border border-gray-200 p-4 hover:border-black transition-all block"
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
                          <span className="text-xs">
                            домен {similar.extension}
                          </span>
                        </div>
                      </a>
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
                  <button
                    onClick={openBuyModal}
                    className="w-full py-2.5 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all mb-2 flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Купить сейчас
                  </button>
                  <button
                    onClick={openOfferModal}
                    className="w-full py-2.5 bg-white border border-black text-black text-sm font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Сделать предложение
                  </button>
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2 text-xs text-gray-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-black flex-shrink-0" />
                    <span>Безопасный перевод</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-black flex-shrink-0" />
                    <span>Мгновенный перенос</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-black flex-shrink-0" />
                    <span>Гарантия возврата</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
