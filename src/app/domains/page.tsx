"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { db } from "@/db";
import { domains } from "@/db";
import { desc, sql, eq } from "drizzle-orm";
import { PAGINATION } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import DomainFilters from "@/components/domains/DomainFilters";
import DomainCard from "@/components/domains/DomainCard";
import Header from "@/components/Header";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

// Тип для домена из БД
interface Domain {
  id: number;
  slug: string;
  name: string;
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

interface DomainsPageProps {
  searchParams: {
    search?: string;
    category?: string;
    extension?: string;
    priceFrom?: string;
    priceTo?: string;
    length?: string;
    page?: string;
  };
}

/**
 * Страница каталога доменов
 * Client Component - требует useState для фильтрации и пагинации
 */
export default function DomainsPage({ searchParams }: DomainsPageProps) {
  const [allDomains, setAllDomains] = useState<Domain[]>([]);
  const [filteredDomains, setFilteredDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedExtensions, setSelectedExtensions] = useState<string[]>([]);

  // Получаем уникальные категории и расширения
  const categories = Array.from(
    new Set(allDomains.map((d) => d.category).filter((c): c is string => Boolean(c)))
  );
  // Список популярных зон для фильтра
  const extensions = [
    ".ru", ".rf", ".com", ".net", ".org", ".io", 
    ".co", ".info", ".biz", ".me", ".pro", ".moscow", ".spb.ru"
  ];

// MOCK DATA для локальной разработки без БД
// MOCK DATA для локальной разработки без БД
const MOCK_DOMAINS: Domain[] = [
  {
    id: 1,
    slug: "ai-ru",
    name: "ai.ru",
    price: 5000000,
    category: "Премиум",
    extension: ".ru",
    description: "Уникальный двухбуквенный домен. Идеально для AI-проектов.",
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
    slug: "zzsm-ru",
    name: "zzsm.ru",
    price: 350000,
    category: "Бизнес",
    extension: ".ru",
    description: "Короткий четырехбуквенный домен для бизнеса.",
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
    slug: "zzsg-ru",
    name: "zzsg.ru",
    price: 350000,
    category: "Бизнес",
    extension: ".ru",
    description: "Отличное название для строительной или промышленной компании.",
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
    slug: "zzpd-ru",
    name: "zzpd.ru",
    price: 350000,
    category: "Бизнес",
    extension: ".ru",
    description: "Короткий аббревиатурный домен.",
    registeredYear: 2022,
    traffic: "Низкий",
    registrationDate: new Date(),
    firstRegistrationDate: new Date(),
    listedDate: new Date(),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    slug: "crypto-com",
    name: "crypto.com",
    price: 15000000,
    category: "Премиум",
    extension: ".com",
    description: "Топовый домен для криптовалютного проекта.",
    registeredYear: 2010,
    traffic: "Очень высокий",
    registrationDate: new Date(),
    firstRegistrationDate: new Date(),
    listedDate: new Date(),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    slug: "meta-io",
    name: "meta.io",
    price: 800000,
    category: "Технологии",
    extension: ".io",
    description: "Популярная зона .io для IT-стартапов.",
    registeredYear: 2018,
    traffic: "Высокий",
    registrationDate: new Date(),
    firstRegistrationDate: new Date(),
    listedDate: new Date(),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
   {
    id: 7,
    slug: "shop-rf",
    name: "магазин.рф",
    price: 120000,
    category: "Торговля",
    extension: ".рф",
    description: "Понятный кириллический домен для e-commerce.",
    registeredYear: 2015,
    traffic: "Средний",
    registrationDate: new Date(),
    firstRegistrationDate: new Date(),
    listedDate: new Date(),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 8,
    slug: "invest-pro",
    name: "invest.pro",
    price: 450000,
    category: "Финансы",
    extension: ".pro",
    description: "Профессиональный домен для инвестиционного фонда.",
    registeredYear: 2019,
    traffic: "Средний",
    registrationDate: new Date(),
    firstRegistrationDate: new Date(),
    listedDate: new Date(),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

  // Загрузка доменов из БД
  useEffect(() => {
    async function loadDomains() {
      try {
        setLoading(true);

        const data = await db
          .select()
          .from(domains)
          .where(sql`${domains.isActive} = true`)
          .orderBy(desc(domains.listedDate));

        if (data.length > 0) {
          setAllDomains(data);
          applyFilters(data, searchParams);
        } else {
          // Fallback to MOCK data if DB is empty/unavailable
          console.warn("Using MOCK data for domains");
          setAllDomains(MOCK_DOMAINS);
          applyFilters(MOCK_DOMAINS, searchParams);
        }
      } catch (error) {
        console.error("Error loading domains, using mock:", error);
        setAllDomains(MOCK_DOMAINS);
        applyFilters(MOCK_DOMAINS, searchParams);
      } finally {
        setLoading(false);
      }
    }

    loadDomains();
  }, []);

  // Применяем фильтры при изменении searchParams или selectedExtensions
  useEffect(() => {
    applyFilters(allDomains, searchParams);
  }, [searchParams, allDomains, selectedExtensions]);

  const toggleExtension = (ext: string) => {
    setSelectedExtensions((prev) =>
      prev.includes(ext)
        ? prev.filter((e) => e !== ext)
        : [...prev, ext]
    );
  };

  const applyFilters = (
    domains: Domain[],
    params: DomainsPageProps["searchParams"]
  ) => {
    let filtered = [...domains];
    const page = parseInt(params.page || "1", 10);

    // Фильтр поиска
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filtered = filtered.filter((d) =>
        d.name.toLowerCase().includes(searchLower)
      );
    }

    // Фильтр категории
    if (params.category) {
      filtered = filtered.filter((d) => d.category === params.category);
    }

    // Фильтр расширения (из URL или из чекбоксов)
    if (selectedExtensions.length > 0) {
       filtered = filtered.filter((d) => d.extension && selectedExtensions.includes(d.extension));
    } else if (params.extension) {
      filtered = filtered.filter((d) => d.extension === params.extension);
    }

    // Фильтр цены от
    if (params.priceFrom) {
      const minPrice = parseInt(params.priceFrom.replace(/\s/g, ""));
      filtered = filtered.filter((d) => d.price >= minPrice);
    }

    // Фильтр цены до
    if (params.priceTo) {
      const maxPrice = parseInt(params.priceTo.replace(/\s/g, ""));
      filtered = filtered.filter((d) => d.price <= maxPrice);
    }

    // Фильтр длины
    if (params.length) {
      filtered = filtered.filter((d) => {
        const nameWithoutExt = d.name.split(".")[0];
        const length = nameWithoutExt.length;

        if (params.length === "2") return length === 2;
        if (params.length === "3") return length === 3;
        if (params.length === "4") return length === 4;
        if (params.length === "5") return length === 5;
        if (params.length === "5+") return length >= 5;
        return true;
      });
    }

    setFilteredDomains(filtered);
    setCurrentPage(page);
  };

  // Пагинация
  const totalPages = Math.ceil(
    filteredDomains.length / PAGINATION.DOMAINS_PER_PAGE
  );
  const startIndex = (currentPage - 1) * PAGINATION.DOMAINS_PER_PAGE;
  const paginatedDomains = filteredDomains.slice(
    startIndex,
    startIndex + PAGINATION.DOMAINS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", page.toString());
    window.history.pushState(null, "", `?${params.toString()}`);
    // Плавный скролл наверх к началу списка (примерно к фильтрам)
    window.scrollTo({ top: 300, behavior: "smooth" }); 
  };


  // Сброс фильтров
  const handleReset = () => {
    window.location.href = "/domains";
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs
          items={[{ label: "Главная", path: "/" }, { label: "Домены" }]}
        />

        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-black mb-4 tracking-tight">
            Площадка премиум доменов
          </h1>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
            Более 500 000 ценных доменных имен для вашего бизнеса
          </p>
        </div>

        {/* 1. Search Bar (Full Width) */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Поиск доменов..."
              defaultValue={searchParams.search || ""}
              onChange={(e) => {
                const params = new URLSearchParams(window.location.search);
                if (e.target.value) params.set("search", e.target.value);
                else params.delete("search");
                params.delete("page");
                window.history.pushState(null, "", `?${params.toString()}`);
              }}
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 text-base text-black focus:outline-none focus:border-black transition-colors shadow-sm"
            />
          </div>
        </div>

        {/* 2. Horizontal Filter Bar */}
        <div className="mb-12 bg-gray-50/50 p-6 border border-gray-100 rounded-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
            
            {/* Zone Filter (Select) - Col span 3 */}
            <div className="lg:col-span-3">
              <label className="text-sm font-bold text-black mb-2 block">Зона</label>
              <div className="relative">
                 <select 
                   className="w-full appearance-none bg-white border border-gray-200 px-4 py-3 pr-8 rounded-sm text-sm focus:outline-none focus:border-black cursor-pointer"
                   value={selectedExtensions[0] || ""}
                   onChange={(e) => {
                      if(e.target.value === "") {
                        setSelectedExtensions([]); 
                        // Update URL manually for single select sim
                        const params = new URLSearchParams(window.location.search);
                        params.delete("extensions");
                        window.history.pushState(null, "", `?${params.toString()}`);
                      } else {
                        toggleExtension(e.target.value);
                      }
                   }}
                 >
                   <option value="">Все зоны</option>
                   {extensions.map(ext => (
                     <option key={ext} value={ext}>{ext}</option>
                   ))}
                 </select>
                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                    <ChevronRight className="w-4 h-4 rotate-90" />
                 </div>
              </div>
            </div>

            {/* Price From (Input) - Col span 2 */}
            <div className="lg:col-span-2">
               <label className="text-sm font-bold text-black mb-2 block">Цена от</label>
               <input
                 type="number"
                 placeholder="0"
                 defaultValue={searchParams.priceFrom || ""}
                 className="w-full bg-white border border-gray-200 px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-black"
                 onChange={(e) => { /* logic */ }}
               />
            </div>

            {/* Price To (Input) - Col span 2 */}
            <div className="lg:col-span-2">
               <label className="text-sm font-bold text-black mb-2 block">Цена до</label>
               <input
                 type="number"
                 placeholder="∞"
                 defaultValue={searchParams.priceTo || ""}
                 className="w-full bg-white border border-gray-200 px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-black"
                 onChange={(e) => { /* logic */ }}
               />
            </div>

            {/* Length (Select) - Col span 3 */}
            <div className="lg:col-span-3">
              <label className="text-sm font-bold text-black mb-2 block">Длина</label>
              <div className="relative">
                 <select 
                   className="w-full appearance-none bg-white border border-gray-200 px-4 py-3 pr-8 rounded-sm text-sm focus:outline-none focus:border-black cursor-pointer"
                   defaultValue={searchParams.length || ""}
                   onChange={(e) => {
                      const params = new URLSearchParams(window.location.search);
                      if (e.target.value) params.set("length", e.target.value);
                      else params.delete("length");
                      window.history.pushState(null, "", `?${params.toString()}`);
                   }}
                 >
                   <option value="">Любая длина</option>
                   <option value="2">2 символа</option>
                   <option value="3">3 символа</option>
                   <option value="4">4 символа</option>
                   <option value="5">5 символов</option>
                   <option value="5+">Более 5</option>
                 </select>
                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                    <ChevronRight className="w-4 h-4 rotate-90" />
                 </div>
              </div>
            </div>

            {/* Reset Button - Col span 2 */}
            <div className="lg:col-span-2">
               <button
                 onClick={handleReset}
                 className="w-full bg-gray-100 text-black border border-transparent px-4 py-3 rounded-sm text-sm font-medium hover:bg-gray-200 transition-colors"
               >
                 Сбросить
               </button>
            </div>

          </div>
        </div>

        {/* 3. Domain Grid (2 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 px-0 sm:px-4">
          {paginatedDomains.length > 0 ? (
            paginatedDomains.map((domain) => (
              <DomainCard key={domain.slug} domain={domain} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center border border-dashed border-gray-200 rounded-lg">
                <p className="text-gray-500">Домены не найдены</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 border-t border-gray-100 pt-8">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-3 border border-gray-200 rounded-none disabled:opacity-30 disabled:cursor-not-allowed hover:border-black transition-colors bg-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              const showPage =
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1);

              if (!showPage) return null;

              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-11 h-11 text-sm font-bold border transition-all ${
                    currentPage === page
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-600 border-gray-200 hover:border-black hover:text-black"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-3 border border-gray-200 rounded-none disabled:opacity-30 disabled:cursor-not-allowed hover:border-black transition-colors bg-white"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

