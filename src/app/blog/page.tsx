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

  // Загрузка статей (MOCK DATA ONLY FOR DEMO)
  useEffect(() => {
    async function loadPosts() {
      setLoading(true);

      const MOCK_BLOG_POSTS: BlogPost[] = [
        {
          id: 1,
          slug: "domain-zone-2000-hu-guide",
          title: "Доменная зона .2000.hu — полное руководство",
          excerpt: "Полный обзор уникальной венгерской доменной зоны .2000.hu. Узнайте особенности регистрации, преимущества для локального бизнеса и SEO-потенциал.",
          content: `Расширение домена .2000.hu — это домен второго уровня с кодом страны (ccSLD) для Венгрии, названный в честь города Тёкёль, который имеет почтовый индекс 2000. Это особенно актуально для частных лиц, предприятий и организаций, которые работают или имеют тесную связь с этим регионом.

## Что такое доменная зона .2000.hu — краткий обзор

Расширение домена .2000.hu является уникальным специализированным доменом, специально разработанным для Венгрии. Он подпадает под более крупный домен верхнего уровня кода страны .hu (ccTLD), которым управляет Совет венгерских интернет-провайдеров (CHIP).

Домен .2000.hu в основном предназначен для использования организациями и частными лицами, базирующимися в 2000 году в регионе Сентендре в Венгрии. Благодаря своему региональному назначению он предоставляет возможность местным предприятиям и персональным веб-сайтам в регионе Сентендре установить четкое присутствие в Интернете, подчеркивая их географическое положение.

## Основные сведения о зоне .2000.hu

Поскольку домен .2000.hu специализируется на небольшом регионе, он не имеет широкого использования, сопоставимого с более глобальными доменами, но играет жизненно важную роль в продвижении местных венгерских онлайн-идентификаций.

Хотя эти домены могут помочь установить присутствие в Интернете в Венгрии, конкретное использование и регулирование расширения домена .2000.hu управляется правительством Венгрии и назначенным им регистратором.

## Почему стоит выбрать зону .2000.hu

Владение доменным именем с расширением .2000.hu имеет несколько преимуществ:

- Уникальный идентификатор: Служит четким сигналом вашей связи с Венгрией и ориентации на венгерскую аудиторию.
- Доступность имен: Поскольку .2000.hu менее распространен, чем .com или .hu, он предлагает более высокий шанс получить желаемое доменное имя.
- Локальное SEO: Локальный домен может способствовать более высокому рейтингу в результатах локального поиска, повышая видимость вашего бизнеса в Венгрии.
- Маркетинговый инструмент: Укрепляет чувство общности и может быть хорошим маркетинговым инструментом для компаний, занимающихся событиями или продуктами, связанными с 2000 годом.

## Где и как используется доменная зона .2000.hu

Расширение домена .2000.hu в первую очередь предназначено для частных лиц и предприятий, специфичных для Венгрии, что потенциально повышает видимость и авторитет локального поиска.

Это расширение домена может быть использовано бизнесом, стремящимся извлечь выгоду из маркетинга, ориентированного на местоположение, или увеличить свою клиентскую базу в Венгрии. Аналогичным образом, люди, такие как блоггеры или фрилансеры, могут использовать .2000.hu для продвижения своего личного бренда или предложения услуг венгерским общинам.

Он также может служить таможенной областью для организаций и сообществ, таких как спортивные ассоциации или клубы в 2000 году или с «2000» на их имя для брендинга или памятных целей.

## Часто задаваемые вопросы

### Часто задаваемые вопросы о домене .2000.hu

Доменное имя .2000.hu является географическим доменным расширением, характерным для Венгрии. Он часто используется организациями, связанными с графством Дунауйварош, которое исторически известно как «2000» в Венгрии. Управление доменом осуществляет Совет венгерских интернет-провайдеров.

### Зачем использовать домен в зоне .2000.hu — преимущества и цели

Использование расширения доменного имени .2000.hu может быть полезным, если вы являетесь бизнесом, частным лицом или организацией, ориентированной на аудиторию в районе 2000 года. Поскольку это расширение довольно конкретное, оно подчеркивает ваши прямые отношения с этим регионом. Это может улучшить местное доверие, привлечь больше регионального веб-трафика и повысить известность вашего бренда в этом сообществе.

### Кто может зарегистрировать домен .2000.hu и условия регистрации

Чтобы купить доменное имя .2000.hu, покупатель должен быть гражданином или резидентом Венгрии, поскольку такие доменные имена в основном предназначены для таких физических или юридических лиц. Организации или предприятия, занимающиеся деятельностью, связанной с регионом, также могут иметь возможность купить такой домен. Окончательные полномочия по одобрению таких покупок возлагаются на регистратора домена и соответствующие венгерские власти.`,
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

      setAllPosts(MOCK_BLOG_POSTS);
      // Применяем фильтры сразу (без задержки useEffect)
      let filtered = [...MOCK_BLOG_POSTS];
      // Здесь простая фильтрация для инициализации
      setFilteredPosts(filtered); 
      setLoading(false);
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
          (post.title.toLowerCase() || "").includes(searchLower) ||
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
    </div>
  );
}
