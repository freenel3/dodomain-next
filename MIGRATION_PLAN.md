# План миграции React SPA на Next.js 15 с SSR

## Общая стратегия миграции

### Исходный стек проекта (\_legacy)

- **Фреймворк**: React 19 + Vite
- **Роутинг**: react-router v7
- **Стили**: Tailwind CSS 3
- **Стейт**: useState (нет Redux/Context)
- **UI компоненты**: lucide-react + собственные
- **API**: Hono на Cloudflare Workers (fetch к /api/domains, /api/blog)
- **Страницы**: 9 (Home, Domains, DomainDetail, DomainSell, Blog, BlogPost, Contact, About, NotFound)

### Целевой стек

- **Фреймворк**: Next.js 15 (App Router)
- **База данных**: PostgreSQL
- **ORM**: Drizzle ORM
- **Стили**: Tailwind CSS 4
- **Рендеринг**: SSR для контента, CSR для интерактивных элементов

---

## 1. План миграции по этапам

### Этап 1: Подготовка инфраструктуры (1-2 дня)

1. Настройка окружения PostgreSQL
2. Создание и запуск миграций Drizzle
3. Наполнение БД тестовыми данными
4. Настройка переменных окружения (.env)

### Этап 2: Миграция компонентов и утилит (1-2 дня)

1. Перенос общих компонентов (Header, Footer, Logo, SEO, Breadcrumbs)
2. Перенос UI компонентов (CustomSelect, ContactModal, ScrollToTop)
3. Создание утилитных функций (formatPrice, getSimilarDomains)
4. Настройка Tailwind CSS 4

### Этап 3: Миграция роутинга и создание страниц (3-4 дня)

1. Создание структуры папок App Router
2. Миграция Home → `/app/page.tsx`
3. Миграция Domains → `/app/domains/page.tsx`
4. Миграция DomainDetail → `/app/domains/[domain]/page.tsx`
5. Миграция Blog → `/app/blog/page.tsx`
6. Миграция BlogPost → `/app/blog/[slug]/page.tsx`
7. Миграция статических страниц (About, Contact, DomainSell)
8. Создание layout.tsx и error handling

### Этап 4: Создание API Routes и Server Actions (2-3 дня)

1. Создание API routes для доменов
2. Создание API routes для блога
3. Реализация Server Actions для форм (контакты, продажа домена)
4. Оптимизация запросов к БД (кэширование, revalidation)

### Этап 5: Оптимизация SEO и производительности (1-2 дня)

1. Настройка metadata API для каждой страницы
2. Реализация sitemap.xml и robots.txt
3. Оптимизация изображений
4. Настройка кэширования (revalidate, ISR)

### Этап 6: Тестирование и деплой (1-2 дня)

1. Тестирование всех страниц и функционала
2. Проверка SEO (метатеги, Open Graph)
3. Деплой на Vercel или другой хостинг
4. Мониторинг и исправление багов

---

## 2. Структура папок для Next.js 15 (App Router)

```
dodomain/
├── src/
│   ├── app/                          # App Router
│   │   ├── (marketing)/              # Группа маркетинговых страниц
│   │   │   ├── about/
│   │   │   │   └── page.tsx         # /about
│   │   │   ├── contact/
│   │   │   │   └── page.tsx         # /contact
│   │   │   ├── sell-domain/
│   │   │   │   └── page.tsx         # /sell-domain
│   │   │   └── layout.tsx           # Общий layout для группы
│   │   ├── blog/                     # Блог
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx         # /blog/:slug
│   │   │   └── page.tsx             # /blog
│   │   ├── domains/                  # Домены
│   │   │   ├── [domain]/
│   │   │   │   └── page.tsx         # /domains/:domain
│   │   │   └── page.tsx             # /domains
│   │   ├── favicon.ico
│   │   ├── globals.css              # Глобальные стили
│   │   ├── layout.tsx                # Root layout
│   │   ├── not-found.tsx            # 404 страница
│   │   ├── robots.ts                 # robots.txt
│   │   ├── sitemap.ts               # sitemap.xml
│   │   └── page.tsx                 # Главная страница /
│   ├── components/                   # React компоненты
│   │   ├── layout/                   # Layout компоненты
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Logo.tsx
│   │   ├── ui/                       # UI компоненты
│   │   │   ├── CustomSelect.tsx
│   │   │   ├── ContactModal.tsx
│   │   │   ├── Breadcrumbs.tsx
│   │   │   ├── ScrollToTop.tsx
│   │   │   └── SEO.tsx
│   │   ├── domain/                   # Компоненты доменов
│   │   │   ├── DomainCard.tsx
│   │   │   ├── DomainFilters.tsx
│   │   │   ├── DomainGrid.tsx
│   │   │   └── Pagination.tsx
│   │   └── blog/                     # Компоненты блога
│   │       ├── BlogCard.tsx
│   │       ├── BlogGrid.tsx
│   │       └── BlogContent.tsx
│   ├── lib/                          # Утилиты и конфигурации
│   │   ├── db.ts                     # Drizzle клиент
│   │   ├── schema.ts                 # Схема БД
│   │   ├── utils.ts                  # Утилитные функции
│   │   └── constants.ts              # Константы
│   ├── actions/                      # Server Actions
│   │   ├── domains.ts                # Actions для доменов
│   │   ├── blog.ts                   # Actions для блога
│   │   └── contact.ts                # Actions для контактов
│   ├── types/                        # TypeScript типы
│   │   ├── domain.ts
│   │   ├── blog.ts
│   │   └── index.ts
│   └── styles/                       # Дополнительные стили
│       └── globals.css
├── drizzle/                          # Миграции Drizzle
│   ├── 0001_init.sql
│   └── ...
├── public/                           # Статические файлы
│   ├── images/
│   └── icons/
├── .env.local                        # Переменные окружения
├── .env.example                      # Пример переменных
├── drizzle.config.ts                 # Конфигурация Drizzle
├── next.config.ts                    # Конфигурация Next.js
├── tailwind.config.ts                # Конфигурация Tailwind
├── tsconfig.json                     # Конфигурация TypeScript
└── package.json                      # Зависимости
```

---

## 3. Список всех зависимостей

### Уже установлены (текущий package.json)

```json
{
  "dependencies": {
    "clsx": "^2.1.1",
    "drizzle-orm": "^0.45.1",
    "lucide-react": "^0.562.0",
    "next": "15.5.9",
    "pg": "^8.16.3",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "tailwind-merge": "^3.4.0"
  }
}
```

### Дополнительные зависимости для миграции

```bash
# Для работы с формами
npm install react-hook-form zod @hookform/resolvers

# Для SEO и метаданных
npm install next-seo

# Для оптимизации изображений (опционально)
npm install sharp

# Для аутентификации (если потребуется в будущем)
# npm install next-auth @auth/prisma-adapter

# Для работы с датами
npm install date-fns

# Для валидации URL и доменов
npm install validator

# Dev зависимости
npm install -D @types/validator
```

### Итоговый package.json

```json
{
  "dependencies": {
    "clsx": "^2.1.1",
    "date-fns": "^4.1.0",
    "drizzle-orm": "^0.45.1",
    "lucide-react": "^0.562.0",
    "next": "15.5.9",
    "next-seo": "^6.6.0",
    "pg": "^8.16.3",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "react-hook-form": "^7.54.2",
    "tailwind-merge": "^3.4.0",
    "validator": "^13.12.0",
    "zod": "^3.24.3",
    "@hookform/resolvers": "^3.10.0"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/pg": "^8.16.0",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@types/validator": "^13.12.2",
    "drizzle-kit": "^0.31.8",
    "eslint": "^9",
    "eslint-config-next": "15.5.9",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

---

## 4. Как переделать роутинг из React в Next.js

### React Router → Next.js App Router

| React Router                                                   | Next.js App Router               | Описание                  |
| -------------------------------------------------------------- | -------------------------------- | ------------------------- |
| `<Route path="/" element={<Home />} />`                        | `/app/page.tsx`                  | Главная страница          |
| `<Route path="/domains" element={<Domains />} />`              | `/app/domains/page.tsx`          | Каталог доменов           |
| `<Route path="/domains/:domain" element={<DomainDetail />} />` | `/app/domains/[domain]/page.tsx` | Детальная страница домена |
| `<Route path="/blog" element={<Blog />} />`                    | `/app/blog/page.tsx`             | Список статей             |
| `<Route path="/blog/:slug" element={<BlogPost />} />`          | `/app/blog/[slug]/page.tsx`      | Статья блога              |
| `<Route path="/about" element={<About />} />`                  | `/app/about/page.tsx`            | О компании                |
| `<Route path="/contact" element={<Contact />} />`              | `/app/contact/page.tsx`          | Контакты                  |
| `<Route path="/sell-domain" element={<DomainSell />} />`       | `/app/sell-domain/page.tsx`      | Продажа домена            |
| `<Route path="*" element={<NotFound />} />`                    | `/app/not-found.tsx`             | 404 страница              |

### Замена хуков React Router

| React Router хук    | Next.js альтернатива | Пример                                                                          |
| ------------------- | -------------------- | ------------------------------------------------------------------------------- |
| `useNavigate()`     | `useRouter()`        | `router.push('/domains')`                                                       |
| `useParams()`       | `params` (prop)      | `export default function Page({ params }: { params: { domain: string } })`      |
| `useSearchParams()` | `useSearchParams()`  | `const searchParams = useSearchParams(); const page = searchParams.get('page')` |
| `useLocation()`     | `usePathname()`      | `const pathname = usePathname()`                                                |

### Пример миграции навигации

**React Router:**

```tsx
import { Link, useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Link to="/domains">Домены</Link>
      <button onClick={() => navigate("/domains")}>Перейти</button>
    </>
  );
}
```

**Next.js App Router:**

```tsx
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Link href="/domains">Домены</Link>
      <button onClick={() => router.push("/domains")}>Перейти</button>
    </>
  );
}
```

### Пример миграции динамических роутов

**React Router:**

```tsx
function DomainDetail() {
  const { domain } = useParams();
  const decodedDomain = domain ? decodeURIComponent(domain) : "";
  // ...
}
```

**Next.js App Router:**

```tsx
interface DomainPageProps {
  params: {
    domain: string;
  };
}

export default async function DomainDetail({ params }: DomainPageProps) {
  const domain = decodeURIComponent(params.domain);
  // ...
}
```

---

## 5. Какие компоненты будут Server Components, какие Client

### Server Components (по умолчанию)

Компоненты, которые рендерятся на сервере и не требуют интерактивности:

| Компонент       | Тип    | Причина                               |
| --------------- | ------ | ------------------------------------- |
| `Header`        | Server | Статичная навигация, SEO              |
| `Footer`        | Server | Статичный контент                     |
| `Logo`          | Server | Статичный элемент                     |
| `SEO`           | Server | Мета-теги для SSR                     |
| `Breadcrumbs`   | Server | Отображение пути, без интерактивности |
| `DomainCard`    | Server | Карточка домена (ссылка через Link)   |
| `BlogCard`      | Server | Карточка статьи блога                 |
| `DomainGrid`    | Server | Сетка доменов                         |
| `BlogGrid`      | Server | Сетка статей                          |
| `DomainFilters` | Server | Фильтры (с Server Actions)            |
| `BlogContent`   | Server | Контент статьи                        |

### Client Components

Компоненты, требующие интерактивности (useState, useEffect, event handlers):

| Компонент        | Тип    | Причина                                        |
| ---------------- | ------ | ---------------------------------------------- |
| `CustomSelect`   | Client | useState для открытия/закрытия dropdown        |
| `ContactModal`   | Client | useState для открытия/закрытия модального окна |
| `ScrollToTop`    | Client | useEffect для прокрутки                        |
| `Pagination`     | Client | useState для текущей страницы                  |
| `DomainSearch`   | Client | useState для поиска, debounce                  |
| `ContactForm`    | Client | react-hook-form для валидации                  |
| `DomainSellForm` | Client | react-hook-form для валидации                  |

### Пример разметки компонентов

```tsx
// Server Component (по умолчанию)
export default function Header() {
  return <nav>...</nav>;
}

// Client Component
("use client");

import { useState } from "react";

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  return <div>...</div>;
}
```

### Гибридные компоненты

```tsx
// Server Component
import ContactModal from "@/components/ui/ContactModal";

export default function DomainDetail({ params }: DomainPageProps) {
  const domain = await getDomain(params.domain);

  return (
    <div>
      <h1>{domain.name}</h1>
      <ContactModal domainName={domain.name} />
    </div>
  );
}
```

---

## 6. Схема базы данных для контента

### Таблица `domains`

```sql
CREATE TABLE domains (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,           -- Полное доменное имя (example.com)
  price INTEGER NOT NULL,                       -- Цена в рублях
  category VARCHAR(100),                        -- Категория (Брендовые, Короткие, etc.)
  extension VARCHAR(20),                        -- Зона (.com, .ru, .рф)
  description TEXT,                             -- Описание домена
  registered_year INTEGER,                      -- Год регистрации (для отображения)
  traffic VARCHAR(50),                          -- SEO потенциал (Высокий, Средний, Низкий)
  registration_date TIMESTAMP,                  -- Дата текущей регистрации
  first_registration_date TIMESTAMP,            -- Дата первой регистрации
  listed_date TIMESTAMP DEFAULT NOW(),          -- Дата добавления на продажу
  is_active BOOLEAN DEFAULT TRUE,               -- Активен ли домен
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Индексы для оптимизации запросов
CREATE INDEX idx_domains_extension ON domains(extension);
CREATE INDEX idx_domains_category ON domains(category);
CREATE INDEX idx_domains_price ON domains(price);
CREATE INDEX idx_domains_name ON domains(name);
CREATE INDEX idx_domains_is_active ON domains(is_active);
```

### Таблица `blog_posts`

```sql
CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) NOT NULL UNIQUE,           -- URL slug (domain-valuation-2024)
  title VARCHAR(255) NOT NULL,                  -- Заголовок статьи
  excerpt TEXT,                                 -- Краткое описание
  content TEXT,                                 -- Полный контент (Markdown/HTML)
  category VARCHAR(100),                        -- Категория (SEO, Инвестиции, etc.)
  read_time VARCHAR(50),                        -- Время чтения (5 мин)
  featured_image VARCHAR(500),                  -- URL изображения (опционально)
  published_date TIMESTAMP DEFAULT NOW(),       -- Дата публикации
  is_published BOOLEAN DEFAULT TRUE,            -- Опубликована ли статья
  meta_title VARCHAR(255),                      -- SEO заголовок
  meta_description TEXT,                        -- SEO описание
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Индексы
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_published_date ON blog_posts(published_date);
CREATE INDEX idx_blog_posts_is_published ON blog_posts(is_published);
```

### Таблица `contact_submissions` (для формы контактов)

```sql
CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(500),
  message TEXT NOT NULL,
  domain_name VARCHAR(255),                    -- Связанный домен (опционально)
  submission_type VARCHAR(50) DEFAULT 'general', -- Тип: general, offer, buy
  status VARCHAR(50) DEFAULT 'new',              -- Статус: new, in_progress, completed
  created_at TIMESTAMP DEFAULT NOW()
);

-- Индексы
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at);
```

### Таблица `domain_offers` (для предложений по доменам)

```sql
CREATE TABLE domain_offers (
  id SERIAL PRIMARY KEY,
  domain_name VARCHAR(255) NOT NULL,
  offer_price INTEGER NOT NULL,                 -- Предложенная цена
  buyer_name VARCHAR(255) NOT NULL,
  buyer_email VARCHAR(255) NOT NULL,
  buyer_phone VARCHAR(50),
  message TEXT,
  status VARCHAR(50) DEFAULT 'pending',          -- pending, accepted, rejected
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Индексы
CREATE INDEX idx_domain_offers_domain_name ON domain_offers(domain_name);
CREATE INDEX idx_domain_offers_status ON domain_offers(status);
```

### Drizzle Schema (расширенная)

```typescript
// src/lib/schema.ts
import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const domains = pgTable("domains", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  price: integer("price").notNull(),
  category: varchar("category", { length: 100 }),
  extension: varchar("extension", { length: 20 }),
  description: text("description"),
  registeredYear: integer("registered_year"),
  traffic: varchar("traffic", { length: 50 }),
  registrationDate: timestamp("registration_date"),
  firstRegistrationDate: timestamp("first_registration_date"),
  listedDate: timestamp("listed_date").defaultNow(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  excerpt: text("excerpt"),
  content: text("content"),
  category: varchar("category", { length: 100 }),
  readTime: varchar("read_time", { length: 50 }),
  featuredImage: varchar("featured_image", { length: 500 }),
  publishedDate: timestamp("published_date").defaultNow(),
  isPublished: boolean("is_published").default(true),
  metaTitle: varchar("meta_title", { length: 255 }),
  metaDescription: text("meta_description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 500 }),
  message: text("message").notNull(),
  domainName: varchar("domain_name", { length: 255 }),
  submissionType: varchar("submission_type", { length: 50 }).default("general"),
  status: varchar("status", { length: 50 }).default("new"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const domainOffers = pgTable("domain_offers", {
  id: serial("id").primaryKey(),
  domainName: varchar("domain_name", { length: 255 }).notNull(),
  offerPrice: integer("offer_price").notNull(),
  buyerName: varchar("buyer_name", { length: 255 }).notNull(),
  buyerEmail: varchar("buyer_email", { length: 255 }).notNull(),
  buyerPhone: varchar("buyer_phone", { length: 50 }),
  message: text("message"),
  status: varchar("status", { length: 50 }).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
```

---

## 7. Детальное описание первых 3 этапов

### Этап 1: Подготовка инфраструктуры

#### 1.1 Настройка PostgreSQL

```bash
# Установка PostgreSQL (Linux/Mac)
brew install postgresql@16

# Или через Docker
docker run --name dodomain-db \
  -e POSTGRES_PASSWORD=dodomain123 \
  -e POSTGRES_DB=dodomain \
  -p 5432:5432 \
  -d postgres:16-alpine
```

#### 1.2 Создание файла .env.local

```env
# .env.local
DATABASE_URL=postgresql://postgres:dodomain123@localhost:5432/dodomain

# Next.js
NEXT_PUBLIC_SITE_URL=https://dodomain.ru
NEXT_PUBLIC_SITE_NAME=dodomain

# Email (для отправки уведомлений)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=info@dodomain.ru
SMTP_PASS=your_password
```

#### 1.3 Создание миграций Drizzle

```bash
# Генерация миграции
npx drizzle-kit generate

# Применение миграции
npx drizzle-kit migrate
```

#### 1.4 Наполнение БД тестовыми данными

Создать файл `src/lib/seed.ts`:

```typescript
import { db } from "./db";
import { domains, blogPosts } from "./schema";

async function seed() {
  // Домены
  await db.insert(domains).values([
    {
      name: "example.com",
      price: 500000,
      category: "Брендовые",
      extension: ".com",
      description: "Премиум домен для вашего бизнеса",
      registeredYear: 2010,
      traffic: "Высокий",
    },
    // ... больше доменов
  ]);

  // Статьи блога
  await db.insert(blogPosts).values([
    {
      slug: "domain-valuation-2024",
      title: "Как оценить ваш домен в 2024 году",
      excerpt: "Ключевые факторы стоимости домена.",
      content: "...",
      category: "Оценка",
      readTime: "7 мин",
    },
    // ... больше статей
  ]);
}

seed();
```

---

### Этап 2: Миграция компонентов и утилит

#### 2.1 Создание утилитных функций

`src/lib/utils.ts`:

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return `${price.toLocaleString("ru-RU")} ₽`;
}

export function getSimilarDomains(
  allDomains: any[],
  currentDomain: string,
  currentPrice: number,
  currentExtension: string,
  limit: number = 4
) {
  const filtered = allDomains.filter((d) => d.name !== currentDomain);

  const scored = filtered.map((d) => {
    let score = 0;

    if (d.extension === currentExtension) score += 10;

    const priceDiff = Math.abs(d.price - currentPrice);
    if (priceDiff < currentPrice * 0.5) score += 5;
    else if (priceDiff < currentPrice * 1.5) score += 3;
    else if (priceDiff < currentPrice * 3) score += 1;

    const currentLength = currentDomain.split(".")[0].length;
    const domainLength = d.name.split(".")[0].length;
    if (Math.abs(currentLength - domainLength) <= 2) score += 2;

    return { ...d, score };
  });

  return scored.sort((a, b) => b.score - a.score).slice(0, limit);
}
```

#### 2.2 Миграция Logo компонента

`src/components/layout/Logo.tsx`:

```tsx
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="w-8 h-8 bg-black flex items-center justify-center">
        <span className="text-white font-bold text-sm">D</span>
      </div>
      <span className="text-xl font-bold text-black">dodomain</span>
    </Link>
  );
}
```

#### 2.3 Миграция Header компонента

`src/components/layout/Header.tsx`:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const navItems = [
  { href: "/domains", label: "Домены" },
  { href: "/sell-domain", label: "Продать" },
  { href: "/blog", label: "Блог" },
  { href: "/about", label: "О нас" },
  { href: "/contact", label: "Контакты" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <Logo />
        <nav className="flex gap-6 items-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors ${
                pathname === item.href
                  ? "text-black font-medium"
                  : "text-gray-900 hover:text-black"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
```

#### 2.4 Миграция Footer компонента

`src/components/layout/Footer.tsx`:

```tsx
import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-12">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div>
            <Logo />
            <p className="text-xs text-gray-600 mt-2">
              Ведущая площадка доменов
            </p>
          </div>
          <div>
            <h4 className="text-black font-bold mb-2 text-xs">Площадка</h4>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="/domains"
                  className="text-gray-600 hover:text-black transition-colors text-xs"
                >
                  Все домены
                </Link>
              </li>
              <li>
                <Link
                  href="/sell-domain"
                  className="text-gray-600 hover:text-black transition-colors text-xs"
                >
                  Продать домен
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-black font-bold mb-2 text-xs">Ресурсы</h4>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 hover:text-black transition-colors text-xs"
                >
                  Блог
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-black font-bold mb-2 text-xs">Компания</h4>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-black transition-colors text-xs"
                >
                  О нас
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-black transition-colors text-xs"
                >
                  Контакты
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4 text-center text-xs text-gray-600">
          © 2024 dodomain. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
```

#### 2.5 Миграция SEO компонента

`src/components/ui/SEO.tsx`:

```tsx
import { Metadata } from "next";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  noindex?: boolean;
}

export function generateSEO(props: SEOProps): Metadata {
  const { title, description, keywords, ogImage, noindex } = props;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "dodomain",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: noindex ? { index: false, follow: false } : undefined,
  };
}
```

---

### Этап 3: Миграция роутинга и создание страниц

#### 3.1 Создание Root Layout

`src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "dodomain - Премиум площадка доменов",
  description: "Покупайте и продавайте премиум-домены на крупнейшей площадке.",
  keywords: "домены, покупка доменов, продажа доменов, премиум домены",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

#### 3.2 Миграция Home страницы

`src/app/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Globe, TrendingUp, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";
import { generateSEO } from "@/components/ui/SEO";

export const metadata = generateSEO({
  title: "dodomain - Премиум площадка доменов",
  description: "Покупайте и продавайте премиум-домены на крупнейшей площадке.",
  keywords: "домены, покупка доменов, продажа доменов, премиум домены",
});

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/domains?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/domains");
    }
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
            <div className="relative">
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
          {/* ... остальной контент ... */}
        </div>
      </section>
      {/* ... остальные секции ... */}
    </div>
  );
}
```

#### 3.3 Миграция Domains страницы

`src/app/domains/page.tsx`:

```tsx
import { db } from "@/lib/db";
import { domains } from "@/lib/schema";
import { desc, sql } from "drizzle-orm";
import DomainFilters from "@/components/domain/DomainFilters";
import DomainGrid from "@/components/domain/DomainGrid";
import { generateSEO } from "@/components/ui/SEO";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata = generateSEO({
  title: "Все домены - dodomain",
  description: "Каталог премиум доменов. Фильтруйте по зоне, цене и длине.",
  keywords: "каталог доменов, купить домен, премиум домены",
});

interface DomainsPageProps {
  searchParams: {
    search?: string;
    extension?: string;
    priceFrom?: string;
    priceTo?: string;
    length?: string;
    page?: string;
  };
}

export default async function DomainsPage({ searchParams }: DomainsPageProps) {
  const page = parseInt(searchParams.page || "1", 10);
  const ITEMS_PER_PAGE = 20;

  // Получение доменов из БД
  let query = db
    .select()
    .from(domains)
    .where(sql`${domains.isActive} = true`)
    .orderBy(desc(domains.listedDate));

  // Применение фильтров
  if (searchParams.search) {
    query = query.where(
      sql`${domains.name} ILIKE ${`%${searchParams.search}%`}`
    );
  }

  if (searchParams.extension) {
    query = query.where(sql`${domains.extension} = ${searchParams.extension}`);
  }

  if (searchParams.priceFrom) {
    query = query.where(
      sql`${domains.price} >= ${parseInt(searchParams.priceFrom)}`
    );
  }

  if (searchParams.priceTo) {
    query = query.where(
      sql`${domains.price} <= ${parseInt(searchParams.priceTo)}`
    );
  }

  const allDomains = await query;

  // Пагинация на клиенте
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedDomains = allDomains.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(allDomains.length / ITEMS_PER_PAGE);

  // Получение уникальных расширений
  const extensions = Array.from(
    new Set(allDomains.map((d) => d.extension))
  ).sort();

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

        <DomainFilters extensions={extensions} currentFilters={searchParams} />

        <div className="mb-4 text-sm text-gray-600">
          Найдено доменов: {allDomains.length}
        </div>

        <DomainGrid domains={paginatedDomains} />
      </div>
    </div>
  );
}
```

#### 3.4 Миграция DomainDetail страницы

`src/app/domains/[domain]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { domains } from "@/lib/schema";
import { eq, sql } from "drizzle-orm";
import { getSimilarDomains, formatPrice } from "@/lib/utils";
import ContactModal from "@/components/ui/ContactModal";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { generateSEO } from "@/components/ui/SEO";

interface DomainDetailPageProps {
  params: {
    domain: string;
  };
}

export async function generateMetadata({ params }: DomainDetailPageProps) {
  const domainName = decodeURIComponent(params.domain);
  const domain = await db
    .select()
    .from(domains)
    .where(eq(domains.name, domainName))
    .limit(1);

  if (!domain[0]) {
    return {
      title: "Домен не найден - dodomain",
    };
  }

  return generateSEO({
    title: `${domain[0].name} - ${formatPrice(domain[0].price)} | dodomain`,
    description: domain[0].description || `Премиум домен ${domain[0].name}`,
    keywords: `${domain[0].name}, купить ${domain[0].name}, домен ${domain[0].extension}`,
  });
}

export default async function DomainDetail({ params }: DomainDetailPageProps) {
  const domainName = decodeURIComponent(params.domain);

  const domainData = await db
    .select()
    .from(domains)
    .where(eq(domains.name, domainName))
    .limit(1);

  if (!domainData[0]) {
    notFound();
  }

  const domain = domainData[0];

  // Получение похожих доменов
  const allDomains = await db
    .select()
    .from(domains)
    .where(sql`${domains.isActive} = true`);

  const similarDomains = getSimilarDomains(
    allDomains,
    domain.name,
    domain.price,
    domain.extension
  );

  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs
        items={[
          { label: "Главная", path: "/" },
          { label: "Домены", path: "/domains" },
          { label: domain.name },
        ]}
      />

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Domain Header */}
        <div className="border border-gray-200 p-5 mb-6">
          <div className="flex items-start justify-between mb-3">
            <div className="px-2 py-0.5 bg-gray-100 text-gray-900 text-xs font-medium">
              {domain.category}
            </div>
            <div className="text-right">
              <div className="text-3xl font-display font-bold text-black tracking-tight">
                {formatPrice(domain.price)}
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-display font-bold text-black mb-3 tracking-tight">
            {domain.name}
          </h1>
          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            {domain.description}
          </p>
        </div>

        {/* Similar Domains */}
        <div className="mt-12">
          <h2 className="text-3xl font-display font-bold text-black mb-6 tracking-tight">
            Похожие домены
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {similarDomains.map((similar) => (
              <a
                key={similar.name}
                href={`/domains/${encodeURIComponent(similar.name)}`}
                className="group bg-white border border-gray-200 p-4 hover:border-black transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="px-2 py-0.5 bg-gray-100 text-gray-900 text-xs font-medium">
                    {similar.category}
                  </div>
                  <div className="text-lg font-display font-bold text-black tracking-tight">
                    {formatPrice(similar.price)}
                  </div>
                </div>
                <h3 className="text-xl font-display font-bold text-black mb-1.5 group-hover:underline tracking-tight">
                  {similar.name}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## Резюме

Этот план миграции покрывает все аспекты перехода от React SPA к Next.js 15 с SSR:

1. **6 основных этапов** с четким распределением задач
2. **Полная структура папок** для App Router
3. **Список всех зависимостей** для установки
4. **Таблица соответствия** роутинга React Router → Next.js
5. **Классификация компонентов** на Server и Client
6. **Полная схема БД** с 4 таблицами
7. **Детальное описание первых 3 этапов** с примерами кода

Следуя этому плану, можно успешно мигрировать проект за 10-14 дней.
