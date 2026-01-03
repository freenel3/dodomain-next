import { db } from "@/db";
import { blogPosts } from "@/db";
import { desc, sql, eq } from "drizzle-orm";
import { PAGINATION } from "@/lib/constants";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import BlogCard from "@/components/blog/BlogCard";
import BlogGrid from "@/components/blog/BlogGrid";
import BlogSearch from "@/components/blog/BlogSearch"; // Новый компонент
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Блог о доменах",
  description: "Экспертные статьи, советы и новости рынка доменных имен.",
};

// Тип для статьи из БД
interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  category: string | null;
  readTime: string | null;
  featuredImage: string | null;
  publishedDate: Date | null;
  isPublished: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface BlogPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    page?: string;
  }>;
}

// MOCK DATA (Server-side fallback)
const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: "domain-zone-2000-hu-guide",
    title: "Доменная зона .2000.hu — полное руководство",
    excerpt: "Полный обзор уникальной венгерской доменной зоны .2000.hu. Узнайте особенности регистрации, преимущества для локального бизнеса и SEO-потенциал.",
    content: "", 
    category: "Доменные зоны",
    readTime: "8 мин",
    featuredImage: null,
    publishedDate: new Date("2024-12-20"),
    isPublished: true,
    metaTitle: "Доменная зона .2000.hu",
    metaDescription: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    slug: "how-to-choose-domain-2025",
    title: "Как выбрать идеальное доменное имя: Полный гайд 2025",
    excerpt: "Выбор домена — это фундаментальная инвестиция в будущее бизнеса. Узнайте 7 ключевых правил, которые помогут избежать ошибок.",
    content: "",
    category: "Гайды",
    readTime: "7 мин",
    featuredImage: null,
    publishedDate: new Date("2024-12-25"),
    isPublished: true,
    metaTitle: null,
    metaDescription: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    slug: "why-com-domains-expensive",
    title: "Почему .com домены стоят миллионы? Секреты оценки",
    excerpt: "Разбираем анатомию сделок на 8-значные суммы. Почему voice.com стоил $30 млн и что делает домен по-настоящему ценным.",
    content: "",
    category: "Рынок",
    readTime: "5 мин",
    featuredImage: null,
    publishedDate: new Date("2024-12-20"),
    isPublished: true,
    metaTitle: null,
    metaDescription: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4,
    slug: "investing-in-rf-domains",
    title: "Инвестиции в кириллические домены .рф: Стоит ли входить?",
    excerpt: "Анализ роста зоны .рф за последние 5 лет. Какие ниши сейчас наиболее востребованы и какую стратегию выбрать.",
    content: "",
    category: "Инвестиции",
    readTime: "4 мин",
    featuredImage: null,
    publishedDate: new Date("2024-12-15"),
    isPublished: true,
    metaTitle: null,
    metaDescription: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
      id: 5,
      slug: "brand-protection-domains",
      title: "Бренд-протекшн: зачем выкупать похожие домены",
      excerpt: "Защитите свой бизнес от фишинга и сквоттеров. Стратегия защитной регистрации доменов.",
      content: "",
      category: "Безопасность",
      readTime: "6 мин",
      featuredImage: null,
      publishedDate: new Date("2024-12-10"),
      isPublished: true,
      metaTitle: null,
      metaDescription: null,
      createdAt: new Date(),
      updatedAt: new Date()
  }
];

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  let allPosts: BlogPost[] = [];

  // 1. Fetch data
  try {
    const data = await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.isPublished, true))
        .orderBy(desc(blogPosts.publishedDate));
    
    if (data.length > 0) {
        // Map types carefully
        allPosts = data.map(p => ({
            ...p,
            isPublished: p.isPublished ?? false,
            excerpt: p.excerpt || "",
            category: p.category || "Uncategorized",
            readTime: p.readTime || "",
            publishedDate: p.publishedDate,
            createdAt: p.createdAt || new Date(),
            updatedAt: p.updatedAt || new Date(),
        }));
    } else {
        allPosts = MOCK_BLOG_POSTS;
    }
  } catch (error) {
    console.error("Error loading blog posts:", error);
    allPosts = MOCK_BLOG_POSTS;
  }

  // 2. Filter & Search Logic
  let filtered = [...allPosts];
  const page = parseInt(params.page || "1", 10);

  if (params.search) {
      const searchLower = params.search.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          (post.title.toLowerCase() || "").includes(searchLower) ||
          (post.excerpt?.toLowerCase() || "").includes(searchLower) ||
          (post.category?.toLowerCase() || "").includes(searchLower)
      );
  }

  if (params.category) {
      filtered = filtered.filter((post) => post.category === params.category);
  }

  // 3. Pagination Logic
  const totalPages = Math.ceil(filtered.length / PAGINATION.BLOG_POSTS_PER_PAGE);
  const startIndex = (page - 1) * PAGINATION.BLOG_POSTS_PER_PAGE;
  
  // Featured logic
  const featured = page === 1 && filtered.length > 0 ? filtered[0] : null;
  
  let paginatedPosts: BlogPost[] = [];
  
  // Adjust slice for page 1 to skip the first item (which is featured)
  if (page === 1) {
      paginatedPosts = filtered.slice(1, PAGINATION.BLOG_POSTS_PER_PAGE + 1);
  } else {
      paginatedPosts = filtered.slice((page - 1) * PAGINATION.BLOG_POSTS_PER_PAGE, page * PAGINATION.BLOG_POSTS_PER_PAGE);
  }

  // Create Link helper
  const createPageLink = (newPage: number) => {
    const newParams = new URLSearchParams(params as any);
    newParams.set("page", newPage.toString());
    return `?${newParams.toString()}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Breadcrumbs
          items={[{ label: "Главная", path: "/" }, { label: "Блог" }]}
        />
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Блог</h1>
          <p className="text-sm text-gray-600 mb-6">
            Экспертные советы и рыночные тренды для доменных инвесторов
          </p>

          {/* Поиск (Client Component) */}
          <BlogSearch />
        </div>

        {/* Сообщение если нет результатов */}
        {filtered.length === 0 && (
          <div className="text-center py-12 border border-gray-200">
            <p className="text-gray-600 text-sm">
              Статьи не найдены. Попробуйте изменить поисковый запрос.
            </p>
          </div>
        )}

        {/* Featured Post - Special Render for first item on first page */}
        {featured && page === 1 && (
            // We take the VERY first item of the current page slice for featured?
            // Or the very first item of the FILTERED list?
            // Let's use the first item of PAGINATED posts for featured if we want strict page loyalty?
            // No, 'featured' usually implies 'Stick at top'.
            // Let's just render paginatedPosts[0] as featured if page==1?
            
            // Layout decision:
            // Render paginatedPosts map.
            // Inside map, check if index==0 and page==1 -> Render Big Card.
            // Else Render Small Card.
            // That's easier for grid layout?
            // No, grid layout is CSS grid. Big card breaks grid usually.
            
            // Let's stick to:
            // 1. Featured is separate variable.
            // 2. Grid is separate list.
            
             // Override standard slice for Page 1 to separate head
             <>
                <BlogCard post={paginatedPosts[0]} isFeatured={true} />
             </>
        )}

        {/* Сетка статей - Rest of items */}
        {paginatedPosts.length > 0 && (
          <BlogGrid totalItems={filtered.length}>
            {paginatedPosts.map((post, index) => {
               // Skip first item on page 1 if we rendered it as featured
               if (page === 1 && index === 0) return null;
               
               return <BlogCard key={post.slug} post={post} />;
            })}
          </BlogGrid>
        )}

        {/* Пагинация */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12 border-t border-gray-100 pt-8">
             {/* Prev */}
             <Link
               href={createPageLink(Math.max(1, page - 1))}
               className={`p-2 border border-gray-300 hover:border-black transition-all ${
                 page === 1 ? "opacity-30 pointer-events-none" : ""
               }`}
             >
               <ChevronLeft className="w-4 h-4" />
             </Link>

             {/* Pages */}
             {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={createPageLink(p)}
                  className={`px-3 py-1.5 text-sm font-medium border transition-all ${
                    page === p
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-300 hover:border-black"
                  }`}
                >
                  {p}
                </Link>
             ))}

             {/* Next */}
             <Link
               href={createPageLink(Math.min(totalPages, page + 1))}
               className={`p-2 border border-gray-300 hover:border-black transition-all ${
                 page === totalPages ? "opacity-30 pointer-events-none" : ""
               }`}
             >
               <ChevronRight className="w-4 h-4" />
             </Link>
          </div>
        )}
      </div>
    </div>
  );
}


