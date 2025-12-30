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
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

// Тип для домена из БД
interface Domain {
  id: number;
  slug: string;
  name: string;
  price: number;
  category: string;
  extension: string;
  description: string | null;
  registeredYear: number | null;
  traffic: string | null;
  registrationDate: Date | null;
  firstRegistrationDate: Date | null;
  listedDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
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

  // Получаем уникальные категории и расширения
  const categories = Array.from(
    new Set(allDomains.map((d) => d.category).filter(Boolean))
  );
  const extensions = Array.from(
    new Set(allDomains.map((d) => d.extension).filter(Boolean))
  );

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

        setAllDomains(data);

        // Применяем фильтры из URL
        applyFilters(data, searchParams);
      } catch (error) {
        console.error("Error loading domains:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDomains();
  }, []);

  // Применяем фильтры при изменении searchParams
  useEffect(() => {
    applyFilters(allDomains, searchParams);
  }, [searchParams, allDomains]);

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

    // Фильтр расширения
    if (params.extension) {
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <nav className="flex gap-6 items-center">
            <a href="/domains" className="text-black font-medium transition-colors text-sm">Домены</a>
            <a href="/sell-domain" className="text-gray-900 hover:text-black transition-colors text-sm">Продать</a>
            <a href="/blog" className="text-gray-900 hover:text-black transition-colors text-sm">Блог</a>
            <a href="/about" className="text-gray-900 hover:text-black transition-colors text-sm">О нас</a>
            <a href="/contact" className="text-gray-900 hover:text-black transition-colors text-sm">Контакты</a>
          </nav>
        </div>
      </header>

      <Breadcrumbs
        items={[{ label: "Главная", path: "/" }, { label: "Домены" }]}
      />

      <div className="max-w-4xl mx-auto px-4 py-10">
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
              value={searchParams.search || ""}
              onChange={(e) => {
                const params = new URLSearchParams(window.location.search);
                if (e.target.value) {
                  params.set("search", e.target.value);
                } else {
                  params.delete("search");
                }
                params.delete("page");
                window.history.pushState(null, "", `?${params.toString()}`);
              }}
              className="w-full pl-10 pr-3 py-2.5 bg-white border border-gray-300 text-black text-sm placeholder-gray-500 focus:outline-none focus:border-black transition-all"
            />
          </div>
        </div>

        <DomainFilters
          categories={categories}
          extensions={extensions}
          currentFilters={searchParams}
        />

        {/* Results count */}
        <div className="mb-4 text-sm text-gray-600">
          Найдено доменов: {filteredDomains.length}
        </div>

        {/* Domain Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {paginatedDomains.length > 0 ? (
            paginatedDomains.map((domain) => (
              <DomainCard key={domain.slug} domain={domain} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 border border-gray-200">
              <p className="text-gray-600 text-sm">Домены не найдены</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:border-black transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
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
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1.5 text-sm font-medium border transition-all ${
                    currentPage === page
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-300 hover:border-black"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:border-black transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Footer */}
        <footer className="border-t border-gray-200 mt-12">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="grid grid-cols-4 gap-6 mb-6">
              <div>
                <a href="/" className="flex items-center gap-2 group">
                  <div className="w-8 h-8 bg-black flex items-center justify-center transition-transform group-hover:scale-105">
                    <span className="text-white font-bold text-sm">D</span>
                  </div>
                  <span className="text-xl font-bold text-black tracking-tight">dodomain</span>
                </a>
                <p className="text-xs text-gray-600 mt-2">
                  Ведущая площадка доменов
                </p>
              </div>
              <div>
                <h4 className="text-black font-bold mb-2 text-xs">Площадка</h4>
                <ul className="space-y-1.5">
                  <li>
                    <a href="/domains" className="text-gray-600 hover:text-black transition-colors text-xs">
                      Все домены
                    </a>
                  </li>
                  <li>
                    <a href="/sell-domain" className="text-gray-600 hover:text-black transition-colors text-xs">
                      Продать домен
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-black font-bold mb-2 text-xs">Ресурсы</h4>
                <ul className="space-y-1.5">
                  <li>
                    <a href="/blog" className="text-gray-600 hover:text-black transition-colors text-xs">
                      Блог
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-black font-bold mb-2 text-xs">Компания</h4>
                <ul className="space-y-1.5">
                  <li>
                    <a href="/about" className="text-gray-600 hover:text-black transition-colors text-xs">
                      О нас
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="text-gray-600 hover:text-black transition-colors text-xs">
                      Контакты
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4 text-center text-xs text-gray-600">
              © 2024 dodomain. Все права защищены.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
