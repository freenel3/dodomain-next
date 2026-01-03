
import { db } from "@/db";
import { domains } from "@/db";
import { desc, sql } from "drizzle-orm";
import { PAGINATION } from "@/lib/constants";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import DomainCard from "@/components/domains/DomainCard";
import DomainSearchAndFilters from "@/components/domains/DomainSearchAndFilters";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Каталог доменов | Поиск и фильтрация",
  description: "Каталог премиум доменов. Фильтры по цене, длине, доменной зоне. Купить красивый домен для сайта.",
};


// Тип для домена
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
  searchParams: Promise<{
    search?: string;
    category?: string;
    extension?: string;
    priceFrom?: string;
    priceTo?: string;
    length?: string;
    page?: string;
  }>;
}

// MOCK DATA (Server-side fallback)
const MOCK_DOMAINS: Domain[] = [
  {
    id: 1,
    slug: "ai-ru",
    name: "ai.ru",
    price: 5000000,
    category: "Премиум",
    extension: ".ru",
    description: "Уникальный двухбуквенный домен.",
    registeredYear: 2000,
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
    slug: "mega-com",
    name: "mega.com",
    price: 4200000,
    category: "Премиум",
    extension: ".com",
    description: "Премиальный домен .com",
    registeredYear: 1998,
    traffic: "Высокий",
    registrationDate: new Date(),
    firstRegistrationDate: new Date(),
    listedDate: new Date(),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    slug: "prime-moscow",
    name: "prime.москва",
    price: 3500000,
    category: "Премиум",
    extension: ".москва",
    description: "Для столичного бизнеса",
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
    id: 4,
    slug: "tech-rf",
    name: "tech.рф",
    price: 3000000,
    category: "Премиум",
    extension: ".рф",
    description: "Технологический домен РФ",
    registeredYear: 2010,
    traffic: "Высокий",
    registrationDate: new Date(),
    firstRegistrationDate: new Date(),
    listedDate: new Date(),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    slug: "pro-online",
    name: "pro.онлайн",
    price: 2800000,
    category: "Премиум",
    extension: ".онлайн",
    description: "Для профессионалов",
    registeredYear: 2017,
    traffic: "Средний",
    registrationDate: new Date(),
    firstRegistrationDate: new Date(),
    listedDate: new Date(),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    slug: "buy-ru",
    name: "buy.ru",
    price: 2500000,
    category: "Премиум",
    extension: ".ru",
    description: "Для e-commerce",
    registeredYear: 2001,
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
    slug: "market-net",
    name: "market.net",
    price: 2200000,
    category: "Премиум",
    extension: ".net",
    description: "Торговая площадка",
    registeredYear: 1999,
    traffic: "Высокий",
    registrationDate: new Date(),
    firstRegistrationDate: new Date(),
    listedDate: new Date(),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 8,
    slug: "plus-org",
    name: "plus.org",
    price: 1950000,
    category: "Премиум",
    extension: ".org",
    description: "Для организаций",
    registeredYear: 2003,
    traffic: "Средний",
    registrationDate: new Date(),
    firstRegistrationDate: new Date(),
    listedDate: new Date(),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 9,
    slug: "cloud-info",
    name: "cloud.info",
    price: 1800000,
    category: "Премиум",
    extension: ".info",
    description: "Облачные технологии",
    registeredYear: 2008,
    traffic: "Средний",
    registrationDate: new Date(),
    firstRegistrationDate: new Date(),
    listedDate: new Date(),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 10,
    slug: "click-su",
    name: "click.su",
    price: 1600000,
    category: "Премиум",
    extension: ".su",
    description: "Советская зона",
    registeredYear: 2005,
    traffic: "Средний",
    registrationDate: new Date(),
    firstRegistrationDate: new Date(),
    listedDate: new Date(),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 11,
    slug: "a-su",
    name: "a.su",
    price: 990000,
    category: "Премиум",
    extension: ".su",
    description: "Однобуквенный домен",
    registeredYear: 1995,
    traffic: "Высокий",
    registrationDate: new Date(),
    firstRegistrationDate: new Date(),
    listedDate: new Date(),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 12,
    slug: "smart-tech",
    name: "smart.tech",
    price: 620000,
    category: "Технологии",
    extension: ".tech",
    description: "Умные технологии",
    registeredYear: 2018,
    traffic: "Средний",
    registrationDate: new Date(),
    firstRegistrationDate: new Date(),
    listedDate: new Date(),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 13,
    slug: "pay-pro",
    name: "pay.pro",
    price: 520000,
    category: "Бизнес",
    extension: ".pro",
    description: "Платежные системы",
    registeredYear: 2016,
    traffic: "Средний",
    registrationDate: new Date(),
    firstRegistrationDate: new Date(),
    listedDate: new Date(),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 14,
    slug: "startup-rent",
    name: "startup.rent",
    price: 480000,
    category: "Бизнес",
    extension: ".rent",
    description: "Аренда для стартапов",
    registeredYear: 2019,
    traffic: "Низкий",
    registrationDate: new Date(),
    firstRegistrationDate: new Date(),
    listedDate: new Date(),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 15,
    slug: "digital-site",
    name: "digital.сайт",
    price: 450000,
    category: "Технологии",
    extension: ".сайт",
    description: "Цифровой сайт",
    registeredYear: 2018,
    traffic: "Средний",
    registrationDate: new Date(),
    firstRegistrationDate: new Date(),
    listedDate: new Date(),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 16,
    slug: "live-online",
    name: "live.онлайн",
    price: 425000,
    category: "Медиа",
    extension: ".онлайн",
    description: "Прямой эфир",
    registeredYear: 2020,
    traffic: "Высокий",
    registrationDate: new Date(),
    firstRegistrationDate: new Date(),
    listedDate: new Date(),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 17,
    slug: "dom-rf",
    name: "дом.рф",
    price: 420000,
    category: "Премиум",
    extension: ".рф",
    description: "Недвижимость",
    registeredYear: 2012,
    traffic: "Высокий",
    registrationDate: new Date(),
    firstRegistrationDate: new Date(),
    listedDate: new Date(),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 18,
    slug: "app-ru-com",
    name: "app.ru.com",
    price: 420000,
    category: "Бизнес",
    extension: ".ru.com",
    description: "Приложения",
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
    id: 19,
    slug: "media-website",
    name: "media.website",
    price: 390000,
    category: "Медиа",
    extension: ".website",
    description: "Медиа ресурс",
    registeredYear: 2019,
    traffic: "Средний",
    registrationDate: new Date(),
    firstRegistrationDate: new Date(),
    listedDate: new Date(),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 20,
    slug: "avto-moscow",
    name: "авто.москва",
    price: 380000,
    category: "Бизнес",
    extension: ".москва",
    description: "Автомобили в Москве",
    registeredYear: 2017,
    traffic: "Высокий",
    registrationDate: new Date(),
    firstRegistrationDate: new Date(),
    listedDate: new Date(),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

export default async function DomainsPage({ searchParams }: DomainsPageProps) {
  // Список популярных зон
  const extensions = [
    ".ru", ".rf", ".com", ".net", ".org", ".io", 
    ".co", ".info", ".biz", ".me", ".pro", ".moscow", ".spb.ru"
  ];

  let domainsData: Domain[] = [];

  try {
    const data = await db
      .select()
      .from(domains)
      .where(sql`${domains.isActive} = true`)
      .orderBy(desc(domains.listedDate));

    if (data.length > 0) {
      domainsData = data;
    } else {
      domainsData = MOCK_DOMAINS;
    }
  } catch (error) {
    console.error("Error loading domains in SSR, using mock:", error);
    domainsData = MOCK_DOMAINS;
  }

  // --- Filtering Logic (Server Side) ---
  const params = await searchParams;
  let filtered = [...domainsData];
  const page = parseInt(params.page || "1", 10);

  // Filter: Search
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filtered = filtered.filter((d) =>
      d.name.toLowerCase().includes(searchLower)
    );
  }

  // Filter: Category
  if (params.category) {
    filtered = filtered.filter((d) => d.category === params.category);
  }

  // Filter: Extension
  if (params.extension) {
    filtered = filtered.filter((d) => d.extension === params.extension);
  }

  // Filter: Price From
  if (params.priceFrom) {
    const minPrice = parseInt(params.priceFrom.replace(/\s/g, ""));
    filtered = filtered.filter((d) => d.price >= minPrice);
  }

  // Filter: Price To
  if (params.priceTo) {
    const maxPrice = parseInt(params.priceTo.replace(/\s/g, ""));
    filtered = filtered.filter((d) => d.price <= maxPrice);
  }

  // Filter: Length
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

  // --- Pagination ---
  const totalPages = Math.ceil(filtered.length / PAGINATION.DOMAINS_PER_PAGE);
  const startIndex = (page - 1) * PAGINATION.DOMAINS_PER_PAGE;
  const paginatedDomains = filtered.slice(
    startIndex,
    startIndex + PAGINATION.DOMAINS_PER_PAGE
  );

  // Helper to create page links
  const createPageLink = (newPage: number) => {
    const newParams = new URLSearchParams(params as any);
    newParams.set("page", newPage.toString());
    return `?${newParams.toString()}`;
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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

        {/* Client Component for Search & Filters */}
        <DomainSearchAndFilters extensions={extensions} />

        {/* Results Count */}
        <div className="mb-6 text-sm text-gray-500">
          Найдено доменов: {filtered.length}
        </div>

        {/* Domain Grid (SSR) */}
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

        {/* Pagination (Links) */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 border-t border-gray-100 pt-8">
            {/* Previous */}
            <Link
              href={createPageLink(Math.max(1, page - 1))}
              className={`p-3 border border-gray-200 rounded-none hover:border-black transition-colors bg-white ${
                page === 1 ? "opacity-30 pointer-events-none" : ""
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
              const showPage =
                p === 1 ||
                p === totalPages ||
                (p >= page - 1 && p <= page + 1);

              if (!showPage) return null;

              return (
                <Link
                  key={p}
                  href={createPageLink(p)}
                  className={`w-11 h-11 flex items-center justify-center text-sm font-bold border transition-all ${
                    page === p
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-600 border-gray-200 hover:border-black hover:text-black"
                  }`}
                >
                  {p}
                </Link>
              );
            })}

            {/* Next */}
            <Link
              href={createPageLink(Math.min(totalPages, page + 1))}
              className={`p-3 border border-gray-200 rounded-none hover:border-black transition-colors bg-white ${
                page === totalPages ? "opacity-30 pointer-events-none" : ""
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
