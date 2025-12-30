"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { db } from "@/db";
import { domains } from "@/db";
import { desc, sql } from "drizzle-orm";
import { PAGINATION } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import DomainFilters from "@/components/domains/DomainFilters";
import DomainGrid from "@/components/domains/DomainGrid";
import DomainCard from "@/components/domains/DomainCard";

// Тип для домена из БД
interface Domain {
  id: number;
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

        <DomainFilters
          categories={categories}
          extensions={extensions}
          currentFilters={searchParams}
        />

        <DomainGrid
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={filteredDomains.length}
          itemsPerPage={PAGINATION.DOMAINS_PER_PAGE}
        >
          {paginatedDomains.length > 0 ? (
            paginatedDomains.map((domain) => (
              <DomainCard key={domain.name} domain={domain} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 border border-gray-200">
              <p className="text-gray-600 text-sm">Домены не найдены</p>
            </div>
          )}
        </DomainGrid>
      </div>
    </div>
  );
}
