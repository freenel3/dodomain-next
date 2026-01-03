import { notFound } from "next/navigation";
import { db } from "@/db";
import { blogPosts, domains } from "@/db";
import { eq, sql } from "drizzle-orm";
import { formatDate, getSimilarDomains } from "@/lib/utils";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { Calendar, Clock, Globe } from "lucide-react";
import ShareButton from "@/components/blog/ShareButton";
import { Metadata } from "next";

// Тип для статьи
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

// В Next.js 15 params это Promise
interface PageProps {
  params: Promise<{ slug: string }>;
}

// Генерация метаданных
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // Quick fix for hardcoded post metadata
  if (slug === "domain-zone-2000-hu-guide") {
    return {
      title: "Доменная зона .2000.hu — полное руководство",
      description: "Полный обзор уникальной венгерской доменной зоны .2000.hu.",
    };
  }

  // TODO: Fetch from DB for dynamic metadata
  return {
    title: `Статья ${slug}`,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  
  let post: BlogPost | null = null;
  let allDomains: any[] = [];
  let similarDomains: any[] = [];

  // 1. HARDCODED MOCK
  if (slug === "domain-zone-2000-hu-guide") {
    post = {
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
    };
  } 
  // 2. DB Fetch
  else {
    try {
      const postData = await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.slug, slug))
        .limit(1);

      if (postData.length > 0) {
        const rawPost = postData[0];
        post = {
          ...rawPost,
          isPublished: rawPost.isPublished ?? false,
          excerpt: rawPost.excerpt || "",
          category: rawPost.category || "Uncategorized",
          readTime: rawPost.readTime || "",
          publishedDate: rawPost.publishedDate,
          createdAt: rawPost.createdAt || new Date(),
          updatedAt: rawPost.updatedAt || new Date(),
        };
      }
    } catch (error) {
      console.error("Error fetching post from DB:", error);
    }

    if (!post && (slug === 'how-to-choose-domain-2025' || slug === 'why-com-domains-expensive')) {
        post = {
            id: 999,
            slug: slug,
            title: slug === 'how-to-choose-domain-2025' ? 'SEO и домены: что важно знать' : 'Безопасность сделок с доменами',
            excerpt: "Это демонстрационная статья, отображаемая так как база данных недоступна локально.",
            content: "База данных PostgreSQL недоступна, поэтому вы видите этот контент-заглушку. \n\n## Пример заголовка статьи\n\nТекст статьи будет загружен из базы данных на реальном сервере. Дизайн и верстка страницы полностью соответствуют макетам.",
            category: "Инвестиции",
            readTime: "5 мин",
            featuredImage: null,
            publishedDate: new Date(),
            isPublished: true,
            metaTitle: "Тестовая статья",
            metaDescription: "Тестовое описание",
            createdAt: new Date(),
            updatedAt: new Date()
        };
    }
  }

  // Если пост не найден
  if (!post) {
    notFound();
  }

  // 3. Fetch similar domains (only if we have a category)
  if (post.category) {
    try {
      const domainsData = await db
        .select()
        .from(domains)
        .where(sql`${domains.isActive} = true`)
        .limit(20);
      
      allDomains = domainsData;
      similarDomains = getSimilarDomains(
        allDomains,
        post.title || "",
        0,
        post.category || "",
        4
      );
    } catch (e) {
      console.error("Error fetching domains:", e);
    }
  }

  // Helper for formatting content
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
              <div className="my-6 -mx-4 md:-mx-12 md:my-10 bg-[#F8F9FA] p-6 md:p-8">
                <div className="max-w-xl mx-auto text-center">
                  <h3 className="text-lg md:text-xl font-display font-bold text-black mb-3 tracking-tight">
                    Подбор и покупка доменов
                  </h3>
                  <p className="text-sm text-gray-600 mb-6 max-w-lg mx-auto leading-relaxed">
                    На dodomain вы можете найти домен для вашего проекта из базы
                    500 000+ имен. Ищите по зоне, цене, длине или ключевым
                    словам — каждый домен с проверенной историей и
                    SEO-потенциалом.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-500 mb-6">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <span>Безопасная сделка</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <span>Проверенная история</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <span>Помощь эксперта</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href="/domains"
                      className="w-full sm:w-auto px-5 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-gray-800 transition-all text-center"
                    >
                      Каталог доменов
                    </a>
                    <a
                      href="/contact"
                      className="w-full sm:w-auto px-5 py-2.5 bg-white border border-gray-300 text-black text-xs font-bold uppercase tracking-wider hover:border-black transition-all text-center"
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
      <div className="max-w-[720px] mx-auto px-4 py-8">
        
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "Главная", path: "/" },
              { label: "Блог", path: "/blog" },
              { label: post.title },
            ]}
          />
        </div>

        {/* Article Card */}
        <article className="bg-white border border-gray-100 shadow-sm p-5 md:p-12 rounded-sm">
          
          {/* Header Section */}
          <div className="mb-8">
            {/* Meta Row */}
            <div className="flex items-center gap-4 mb-4 text-xs">
               <span className="px-2 py-1 bg-black text-white font-bold uppercase tracking-wider">
                 {post.category || "Доменные зоны"}
               </span>
               <div className="flex items-center gap-4 text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{post.publishedDate ? formatDate(post.publishedDate) : ""}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime || "5 мин"}</span>
                  </div>
               </div>
            </div>

            {/* H1 Title */}
            <h1 className="text-2xl md:text-4xl font-display font-bold text-black leading-tight mb-6 tracking-tight">
              {post.title}
            </h1>

            {/* Author */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black flex items-center justify-center text-white font-bold text-lg rounded-sm">
                  D
                </div>
                <div>
                  <div className="text-sm font-bold text-black leading-none mb-1">
                    Команда dodomain
                  </div>
                  <div className="text-xs text-gray-500">Эксперты по доменам</div>
                </div>
              </div>
              
              <ShareButton title={post.title} />
            </div>
          </div>

          <hr className="border-gray-100 mb-8" />

          {/* Content */}
          <div className="prose prose-sm max-w-none text-gray-700">
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
    </div>
  );
}
