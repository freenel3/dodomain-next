
import { Search, Globe, TrendingUp, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";
import { db } from "@/db";
import { domains, blogPosts } from "@/db";
import { desc, sql, eq } from "drizzle-orm";
import { PAGINATION } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import DomainCard from "@/components/domains/DomainCard";
import HomeSearch from "@/components/home/HomeSearch";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Купить домен - площадка премиум имен dodomain",
  description: "Огромный выбор красивых доменов для бизнеса. Покупка, продажа, гарант сделок. Найдите имя для своего проекта сегодня.",
};


/**
 * Главная страница
 * Server Component
 */
export default async function Home() {
  let featuredDomains: any[] = [];
  let recentPosts: any[] = [];

  // Загружаем топ-8 доменов (по цене)
  try {
    const topDomains = await db
        .select()
        .from(domains)
        .where(sql`${domains.isActive} = true`)
        .orderBy(desc(domains.listedDate))
        .limit(8);

    if (topDomains.length > 0) {
        featuredDomains = topDomains;
    } else {
        throw new Error("No domains found");
    }
  } catch (e) {
      // Mock fallback
      featuredDomains = [
        { id: 1, slug: 'start-ru', name: 'start.ru', price: 250000, category: 'Бизнес', extension: '.ru', isActive: true, traffic: 'Высокий', registeredYear: 2020 },
        { id: 2, slug: 'shop-com', name: 'shop.com', price: 1500000, category: 'Премиум', extension: '.com', isActive: true, traffic: 'Очень высокий', registeredYear: 2010 },
        { id: 3, slug: 'bank-net', name: 'bank.net', price: 800000, category: 'Финансы', extension: '.net', isActive: true, traffic: 'Высокий', registeredYear: 2015 },
        { id: 4, slug: 'play-io', name: 'play.io', price: 450000, category: 'Гейминг', extension: '.io', isActive: true, traffic: 'Средний', registeredYear: 2021 },
        { id: 5, slug: 'code-dev', name: 'code.dev', price: 120000, category: 'IT', extension: '.dev', isActive: true, traffic: 'Средний', registeredYear: 2022 },
        { id: 6, slug: 'art-gallery', name: 'art.gallery', price: 95000, category: 'Искусство', extension: '.gallery', isActive: true, traffic: 'Низкий', registeredYear: 2023 },
        { id: 7, slug: 'tech-ai', name: 'tech.ai', price: 550000, category: 'AI', extension: '.ai', isActive: true, traffic: 'Высокий', registeredYear: 2024 },
        { id: 8, slug: 'moscow-city', name: 'moscow.city', price: 300000, category: 'Гео', extension: '.city', isActive: true, traffic: 'Средний', registeredYear: 2019 },
      ];
  }

  // Загружаем последние 3 статьи блога
  try {
     const latestPosts = await db
        .select()
        .from(blogPosts)
        .where(sql`${blogPosts.isPublished} = true`)
        .orderBy(desc(blogPosts.publishedDate))
        .limit(3);
    
     if (latestPosts.length > 0) {
         recentPosts = latestPosts.map(p => ({
             ...p,
             slug: p.slug,
             title: p.title,
             excerpt: p.excerpt || "",
             category: p.category || "General"
         }));
     } else {
         throw new Error("No posts found");
     }
  } catch (e) {
      // Mock fallback
      recentPosts = [
        {
          slug: "domain-zone-2000-hu-guide",
          title: "Руководство по инвестициям в домены",
          excerpt: "Как начать зарабатывать на перепродаже доменных имен.",
          category: "Инвестиции",
        },
        {
           slug: "how-to-choose-domain-2025",
           title: "SEO и домены: что важно знать",
           excerpt: "Влияние доменного имени на ранжирование в поисковых системах.",
           category: "SEO",
        },
        {
          slug: "why-com-domains-expensive",
          title: "Безопасность сделок с доменами",
          excerpt: "Как не стать жертвой мошенников при покупке домена.",
          category: "Безопасность",
        }
      ];
  }

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
          
          <HomeSearch />

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
