"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { db } from "@/db";
import { blogPosts } from "@/db";
import { desc, sql } from "drizzle-orm";
import { PAGINATION, BLOG_CATEGORIES } from "@/lib/constants";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import BlogCard from "@/components/blog/BlogCard";
import BlogGrid from "@/components/blog/BlogGrid";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
  searchParams: {
    search?: string;
    category?: string;
    page?: string;
  };
}

/**
 * Страница блога - каталог статей
 * Client Component - требует useState для фильтрации и пагинации
 */
export default function BlogPage({ searchParams }: BlogPageProps) {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Загрузка статей из БД
  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);

        const data = await db
          .select()
          .from(blogPosts)
          .where(sql`${blogPosts.isPublished} = true`)
          .orderBy(desc(blogPosts.publishedDate));

        setAllPosts(data);

        // Применяем фильтры из URL
        applyFilters(data, searchParams);
      } catch (error) {
        console.error("Error loading blog posts:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  // Применяем фильтры при изменении searchParams
  useEffect(() => {
    applyFilters(allPosts, searchParams);
  }, [searchParams, allPosts]);

  const applyFilters = (
    posts: BlogPost[],
    params: BlogPageProps["searchParams"]
  ) => {
    let filtered = [...posts];
    const page = parseInt(params.page || "1", 10);

    // Фильтр поиска
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          (post.title?.toLowerCase() || "").includes(searchLower) ||
          (post.excerpt?.toLowerCase() || "").includes(searchLower) ||
          (post.category?.toLowerCase() || "").includes(searchLower)
      );
    }

    // Фильтр категории
    if (params.category) {
      filtered = filtered.filter((post) => post.category === params.category);
    }

    setFilteredPosts(filtered);
    setCurrentPage(page);
  };

  // Пагинация
  const totalPages = Math.ceil(
    filteredPosts.length / PAGINATION.BLOG_POSTS_PER_PAGE
  );
  const startIndex = (currentPage - 1) * PAGINATION.BLOG_POSTS_PER_PAGE;

  // Featured post (первая статья) - только на первой странице
  const featuredPost =
    currentPage === 1 && filteredPosts.length > 0 ? filteredPosts[0] : null;
  const paginatedPosts =
    currentPage === 1
      ? filteredPosts.slice(1, startIndex + PAGINATION.BLOG_POSTS_PER_PAGE)
      : filteredPosts.slice(
          startIndex,
          startIndex + PAGINATION.BLOG_POSTS_PER_PAGE
        );

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", page.toString());
    window.history.pushState(null, "", `?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value.trim()) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    params.delete("page");
    window.history.pushState(null, "", `?${params.toString()}`);
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
      <Header />
      
      <Breadcrumbs
        items={[{ label: "Главная", path: "/" }, { label: "Блог" }]}
      />

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Блог</h1>
          <p className="text-sm text-gray-600 mb-6">
            Экспертные советы и рыночные тренды для доменных инвесторов
          </p>

          {/* Поиск */}
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Поиск статей..."
              defaultValue={searchParams.search || ""}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-4 py-3 text-sm border-2 border-gray-800 rounded focus:outline-none focus:border-blue-500 bg-white"
            />
          </div>
        </div>

        {/* Сообщение если нет результатов */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12 border border-gray-200">
            <p className="text-gray-600 text-sm">
              Статьи не найдены. Попробуйте изменить поисковый запрос.
            </p>
          </div>
        )}

        {/* Featured Post - только на первой странице */}
        {featuredPost && <BlogCard post={featuredPost} isFeatured={true} />}

        {/* Сетка статей */}
        {paginatedPosts.length > 0 && (
          <BlogGrid
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={filteredPosts.length}
            itemsPerPage={PAGINATION.BLOG_POSTS_PER_PAGE}
          >
            {paginatedPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </BlogGrid>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
