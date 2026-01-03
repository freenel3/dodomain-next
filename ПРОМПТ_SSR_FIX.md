# ЗАДАЧА: Исправить SSR (Server-Side Rendering) в Next.js проекте

## ПРОБЛЕМА
Все страницы в проекте помечены как `"use client"`, из-за чего HTML код страниц пустой. Поисковики и инструменты не видят контент. Заказчик требует рабочий SSR.

## ТЕКУЩАЯ СТРУКТУРА
Проект: Next.js 15.5.9, React 19, TypeScript, App Router
Путь: `src/app/`

Страницы с проблемой (все начинаются с "use client"):
- `src/app/page.tsx` - главная
- `src/app/domains/page.tsx` - каталог доменов
- `src/app/domains/[slug]/page.tsx` - страница домена
- `src/app/blog/page.tsx` - блог
- `src/app/blog/[slug]/page.tsx` - статья блога
- `src/app/contact/page.tsx` - контакты
- `src/app/sell/page.tsx` - продажа
- `src/app/sell-domain/page.tsx` - форма продажи

## ЧТО НУЖНО СДЕЛАТЬ

### 1. Убрать "use client" со всех page.tsx файлов
Страницы должны быть Server Components по умолчанию.

### 2. Выделить интерактивные части в отдельные Client Components
Создать в `src/components/` отдельные файлы:
- `SearchForm.tsx` - форма поиска (использует useState)
- `ContactForm.tsx` - форма контактов (использует useState, useForm)
- `SellDomainForm.tsx` - форма продажи домена
- `DomainFilters.tsx` - фильтры на странице доменов
- `PurchaseButton.tsx` - кнопка покупки

### 3. Структура исправленного Server Component

```tsx
// src/app/page.tsx - ПРИМЕР ИСПРАВЛЕНИЯ
// БЕЗ "use client" - это Server Component!

import { SearchForm } from "@/components/SearchForm";
import Link from "next/link";
import { Globe, TrendingUp, Shield, ArrowRight } from "lucide-react";

// Metadata для SEO (только в Server Components!)
export const metadata = {
  title: "Найдите идеальное доменное имя | dodomain",
  description: "Покупайте и продавайте премиум-домены на крупнейшей площадке",
};

export default function Home() {
  // Здесь можно делать async запросы к БД!
  // const domains = await db.select().from(domainsTable).limit(10);
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-black mb-4">
            Найдите идеальное доменное имя
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Покупайте и продавайте премиум-домены
          </p>
          
          {/* Client Component для интерактивности */}
          <SearchForm />
          
          {/* Статический контент - рендерится на сервере */}
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/domains" className="px-5 py-2 bg-black text-white">
              Смотреть домены
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Остальной статический контент... */}
    </div>
  );
}
```

### 4. Пример Client Component

```tsx
// src/components/SearchForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function SearchForm() {
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

  const handleExtensionClick = (extension: string) => {
    router.push(`/domains?extension=${encodeURIComponent(extension)}`);
  };

  return (
    <>
      <form onSubmit={handleSearch} className="mb-3">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Поиск домена..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2.5 bg-white border border-gray-300"
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
            className="px-3 py-1 bg-gray-100 text-black text-xs"
          >
            {ext}
          </button>
        ))}
      </div>
    </>
  );
}
```

## ПРАВИЛА

1. **Никаких useState/useEffect в Server Components** - это вызывает ошибку
2. **useRouter, useState, useForm** - только в файлах с "use client"
3. **Metadata export** - только в Server Components
4. **async/await для данных** - только в Server Components
5. **Иконки lucide-react** - работают и в Server и в Client Components

## ПОРЯДОК РАБОТЫ

1. Сначала создай все Client Components в `src/components/`
2. Потом исправляй страницы одну за одной
3. После каждой страницы проверяй что билд проходит: `npm run build`
4. Проверяй SSR: открой страницу → View Source → должен быть HTML контент

## ФАЙЛЫ ДЛЯ ИСПРАВЛЕНИЯ (в порядке приоритета)

1. `src/app/page.tsx` - главная (НАЧНИ С НЕЁ)
2. `src/app/domains/page.tsx` - каталог
3. `src/app/domains/[slug]/page.tsx` - детальная
4. `src/app/blog/page.tsx` - блог
5. `src/app/blog/[slug]/page.tsx` - статья
6. `src/app/about/page.tsx` - о нас (проверь есть ли use client)
7. `src/app/contact/page.tsx` - контакты
8. `src/app/sell-domain/page.tsx` - продажа

## ПРОВЕРКА РЕЗУЛЬТАТА

После исправления выполни:
```bash
npm run build
npm run start
```

Открой http://localhost:3000 → Правый клик → "View Page Source"
HTML должен содержать текст страницы, а не пустой div!
