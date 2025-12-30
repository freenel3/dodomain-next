"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Globe, TrendingUp, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";
import { db } from "@/db";
import { domains, blogPosts } from "@/db";
import { desc, sql, eq } from "drizzle-orm";
import { PAGINATION } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import DomainCard from "@/components/domains/DomainCard";

/**
 * Главная страница
 * Client Component - требует useState для поиска и useRouter для навигации
 */
export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredDomains, setFeaturedDomains] = useState<any[]>([]);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Загрузка топ-доменов и последних статей при монтировании
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        // Загружаем топ-8 доменов (по цене)
        const topDomains = await db
          .select()
          .from(domains)
          .where(sql`${domains.isActive} = true`)
          .orderBy(desc(domains.listedDate))
          .limit(8);

        setFeaturedDomains(topDomains);

        // Загружаем последние 3 статьи блога
        const latestPosts = await db
          .select()
          .from(blogPosts)
          .where(sql`${blogPosts.isPublished} = true`)
          .orderBy(desc(blogPosts.publishedDate))
          .limit(3);

        setRecentPosts(latestPosts);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/domains?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/domains");
    }
  };

  const handleExtensionClick = (extension: string) => {
    router.push(`/domains?extension=${encodeURIComponent(extension)}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-black mb-4 leading-tight tracking-tight">
            Найдите идеальное доменное имя
          </h1>
          <p className="text-lg text-gray-600 mb-8 font-light">
            Покупайте и продавайте премиум-домены на крупнейшей площадке
          </p>
          <form onSubmit={handleSearch} className="mb-3">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Поиск домена..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-white border border-gray-300 text-black text-sm placeholder-gray-500 focus:outline-none focus:border-black transition-all"
              />
            </div>
          </form>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <span className="text-xs text-gray-600 mr-2">Популярные зоны:</span>
            {[".ru", ".рф", ".com", ".онлайн", ".москва", ".net"].map((ext) => (
              <button
                key={ext}
                type="button"
                onClick={() => handleExtensionClick(ext)}
                className="px-3 py-1 bg-gray-100 text-black text-xs font-medium hover:bg-black hover:text-white transition-all"
              >
                {ext}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/domains"
              className="px-5 py-2 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all inline-flex items-center gap-2"
            >
              Смотреть домены
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/sell-domain"
              className="px-5 py-2 bg-white border border-black text-black text-sm font-medium hover:bg-gray-50 transition-all"
            >
              Продать домен
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
          <div className="text-center">
            <div className="text-3xl font-display font-bold text-black mb-1 tracking-tight">
              500К+
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-wide font-medium">
              Премиум доменов
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-display font-bold text-black mb-1 tracking-tight">
              5К+
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-wide font-medium">
              Активных покупателей
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-display font-bold text-black mb-1 tracking-tight">
              $50М+
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-wide font-medium">
              Общие продажи
            </div>
          </div>
        </div>
      </section>

      {/* Featured Domains Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-bold text-black mb-3 tracking-tight">
              Популярные домены
            </h2>
            <p className="text-base text-gray-600 font-light">
              Самые востребованные доменные имена
            </p>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="text-gray-600">Загрузка...</div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredDomains.map((domain) => (
                <DomainCard key={domain.slug} domain={domain} />
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link
              href="/domains"
              className="inline-block px-6 py-2.5 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all"
            >
              Смотреть все домены
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-bold text-black mb-3 tracking-tight">
              Почему выбирают dodomain
            </h2>
            <p className="text-base text-gray-600 font-light">
              Самая надежная платформа для доменных транзакций
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 p-5">
              <div className="w-10 h-10 bg-black flex items-center justify-center mb-4">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-display font-semibold text-black mb-2 tracking-tight">
                Глобальная площадка
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                Доступ к доменам со всего мира
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-5">
              <div className="w-10 h-10 bg-black flex items-center justify-center mb-4">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-display font-semibold text-black mb-2 tracking-tight">
                Безопасные сделки
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                Защита эскроу и гарантия возврата
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-5">
              <div className="w-10 h-10 bg-black flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-display font-semibold text-black mb-2 tracking-tight">
                Экспертная оценка
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                Помощь в оценке доменов
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      {recentPosts.length > 0 && (
        <section className="bg-gray-50 py-12">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-display font-bold text-black mb-3 tracking-tight">
                Последние статьи
              </h2>
              <p className="text-base text-gray-600 font-light">
                Экспертные советы и рыночные тренды
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white border border-gray-200 p-5 hover:border-black transition-all"
                >
                  <div className="px-2 py-0.5 bg-gray-100 text-gray-900 text-xs font-medium mb-3 inline-block">
                    {post.category}
                  </div>
                  <h3 className="text-lg font-display font-bold text-black mb-2 group-hover:underline tracking-tight">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/blog"
                className="inline-block px-6 py-2.5 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all"
              >
                Все статьи
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-black p-10 text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4 tracking-tight">
            Готовы начать?
          </h2>
          <p className="text-base text-gray-300 mb-8 font-light">
            Присоединяйтесь к тысячам доменных инвесторов
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/domains"
              className="px-5 py-2 bg-white text-black text-sm font-medium hover:bg-gray-100 transition-all"
            >
              Посмотреть домены
            </Link>
            <Link
              href="/sell-domain"
              className="px-5 py-2 bg-transparent border border-white text-white text-sm font-medium hover:bg-white hover:text-black transition-all"
            >
              Продать домен
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
