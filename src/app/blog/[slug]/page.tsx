"use client";

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import { db } from "@/db";
import { blogPosts, domains } from "@/db";
import { eq, sql, desc } from "drizzle-orm";
import { formatDate, getSimilarDomains } from "@/lib/utils";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Clock, Share2, Globe, ArrowRight } from "lucide-react";

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

/**
 * Детальная страница статьи блога
 * Client Component - требует useState для модального окна
 */
export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [allDomains, setAllDomains] = useState<any[]>([]);
  const [similarDomains, setSimilarDomains] = useState<any[]>([]);

  const slug = decodeURIComponent(params.slug || "");

  // Загрузка данных
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        // Загружаем статью по slug
        const postData = await db
          .select()
          .from(blogPosts)
          .where(eq(blogPosts.slug, slug))
          .limit(1);

        if (postData.length === 0) {
          setPost(null);
        } else {
          setPost(postData[0]);
        }

        // Загружаем все домены для похожих (по категории)
        if (postData.length > 0 && postData[0].category) {
          const domainsData = await db
            .select()
            .from(domains)
            .where(sql`${domains.isActive} = true`)
            .limit(20);

          setAllDomains(domainsData);
        }
      } catch (error) {
        console.error("Error loading blog post:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [slug]);

  // Обновляем похожие домены
  useEffect(() => {
    if (post && allDomains.length > 0) {
      const similar = getSimilarDomains(
        allDomains,
        post.name || "",
        0,
        post.category || "",
        4
      );
      setSimilarDomains(similar);
    }
  }, [post, allDomains]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title || "",
        url: window.location.href,
      });
    }
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

  if (!post) {
    notFound();
  }

  // Форматируем контент (Markdown-подобный)
  const formatContent = (content: string) => {
    return content.split("\n").map((line, index) => {
      // Подсчет заголовков для баннера
      const headingsBefore = content
        .split("\n")
        .slice(0, index)
        .filter((l) => l.startsWith("## ")).length;
      const shouldShowBanner = line.startsWith("## ") && headingsBefore === 2;

      if (line.startsWith("## ")) {
        return (
          <div key={index}>
            {shouldShowBanner && (
              <div className="my-8 -mx-6 border-y border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-6">
                <div className="max-w-xl mx-auto text-center">
                  <h3 className="text-lg font-display font-semibold text-black mb-2 tracking-tight">
                    Подбор и покупка доменов
                  </h3>
                  <p className="text-sm text-gray-700 font-light leading-relaxed mb-4">
                    На dodomain вы можете найти домен для вашего проекта из базы
                    500 000+ имен. Ищите по зоне, цене, длине или ключевым
                    словам — каждый домен с проверенной историей и
                    SEO-потенциалом.
                  </p>
                  <div className="flex items-center justify-center gap-6 text-xs text-gray-600 mb-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                      <span>Безопасная сделка</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                      <span>Проверенная история</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                      <span>Помощь эксперта</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <a
                      href="/domains"
                      className="px-4 py-1.5 bg-black text-white text-xs font-medium hover:bg-gray-800 transition-colors"
                    >
                      Каталог доменов
                    </a>
                    <a
                      href="/contact"
                      className="px-4 py-1.5 border border-white text-black text-xs font-medium hover:bg-white hover:text-black transition-colors"
                    >
                      Связаться с нами
                    </a>
                  </div>
                </div>
              </div>
            )}
            <h2 className="text-2xl font-display font-bold text-black mt-8 mb-4 pb-2 border-b border-gray-200 tracking-tight">
              {line.replace("## ", "")}
            </h2>
          </div>
        );
      } else if (line.startsWith("### ")) {
        return (
          <h3
            key={index}
            className="text-xl font-display font-bold text-black mt-6 mb-3 tracking-tight"
          >
            {line.replace("### ", "")}
          </h3>
        );
      } else if (line.startsWith("- ")) {
        return (
          <li
            key={index}
            className="text-sm text-gray-700 leading-relaxed mb-2 ml-4"
          >
            {line.replace("- ", "")}
          </li>
        );
      } else if (line.trim()) {
        return (
          <p key={index} className="text-sm text-gray-700 leading-relaxed mb-4">
            {line}
          </p>
        );
      }
      return null;
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <Breadcrumbs
        items={[
          { label: "Главная", path: "/" },
          { label: "Блог", path: "/blog" },
          { label: post.title || "" },
        ]}
      />

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Article */}
        <article className="border border-gray-200 p-6">
          {/* Meta info */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`px-2 py-0.5 text-xs font-medium ${
                post.category
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
              {post.category || "Статья"}
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>
                  {post.publishedDate ? formatDate(post.publishedDate) : ""}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{post.readTime || ""}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleShare}
              className="p-2 border border-gray-200 hover:border-black transition-all"
              aria-label="Поделиться"
            >
              <Share2 className="w-4 h-4 text-black" />
            </button>
          </div>

          {/* Author */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black flex items-center justify-center text-white text-sm font-bold">
                D
              </div>
              <div>
                <div className="text-sm font-medium text-black">
                  Команда dodomain
                </div>
                <div className="text-xs text-gray-600">Эксперты по доменам</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-sm max-w-none">
            {post.content ? (
              formatContent(post.content)
            ) : (
              <p className="text-sm text-gray-700">Содержимое статьи...</p>
            )}
          </div>
        </article>

        {/* Similar Domains */}
        {similarDomains.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-display font-bold text-black mb-6 tracking-tight">
              Похожие домены
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {similarDomains.map((domain) => (
                <a
                  key={domain.name}
                  href={`/domains/${encodeURIComponent(domain.name)}`}
                  className="group bg-white border border-gray-200 p-4 hover:border-black transition-all block"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="px-2 py-0.5 bg-gray-100 text-gray-900 text-xs font-medium">
                      {domain.category}
                    </div>
                    <div className="text-lg font-display font-bold text-black tracking-tight">
                      {domain.price.toLocaleString("ru-RU")} ₽
                    </div>
                  </div>
                  <h3 className="text-xl font-display font-bold text-black mb-1.5 group-hover:underline tracking-tight">
                    {domain.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <Globe className="w-3.5 h-3.5" />
                    <span className="text-xs">домен {domain.extension}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
