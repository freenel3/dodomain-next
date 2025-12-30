# dodomain - Площадка премиум доменов

Современная платформа для покупки и продажи премиум доменных имен.

## Структура проекта

```
├── src/
│   ├── react-app/           # React frontend
│   │   ├── components/      # Переиспользуемые компоненты UI
│   │   ├── pages/          # Страницы приложения
│   │   ├── hooks/          # React hooks (включая API hooks)
│   │   └── App.tsx         # Главный компонент
│   └── worker/             # Cloudflare Worker backend
│       ├── index.ts        # API endpoints
│       └── env.d.ts        # TypeScript типы для env
├── CONTENT_MANAGEMENT.md   # Руководство по управлению контентом
├── API_DOCUMENTATION.md    # Документация API
└── package.json
```

## Технологии

- **Frontend**: React, React Router, TypeScript, Tailwind CSS
- **Backend**: Cloudflare Workers, Hono
- **База данных**: Cloudflare D1 (SQLite)
- **Email**: Resend API
- **Иконки**: Lucide React

## Управление контентом

Все домены и статьи блога хранятся в базе данных D1. Это делает управление контентом простым и понятным.

### Быстрый старт

1. **Добавить новый домен:**
   ```sql
   INSERT INTO domains (name, price, category, extension, description, registered_year, traffic, registration_date, first_registration_date, listed_date)
   VALUES ('example.com', 500000, 'Премиум', '.com', 'Описание', '2020', '1К посещений', '2020-05-15', '2020-05-15', '2024-01-10');
   ```

2. **Добавить статью в блог:**
   ```sql
   INSERT INTO blog_posts (slug, title, excerpt, content, category, read_time, published_date)
   VALUES ('my-article', 'Заголовок', 'Описание', 'Полный текст...', 'Руководство', '5 мин', '2024-12-25');
   ```

3. **Просмотреть данные:**
   ```sql
   SELECT * FROM domains WHERE is_active = 1;
   SELECT * FROM blog_posts WHERE is_published = 1;
   ```

Подробное руководство см. в файле **CONTENT_MANAGEMENT.md**.

## API

Приложение предоставляет REST API для работы с доменами и блогом:

- `GET /api/domains` - Все активные домены
- `GET /api/domains/:name` - Один домен
- `GET /api/blog` - Все статьи блога
- `GET /api/blog/:slug` - Одна статья
- `POST /api/contact` - Форма обратной связи

Полная документация в файле **API_DOCUMENTATION.md**.

## React Hooks

Для работы с данными используйте готовые hooks:

```typescript
// Получить все домены
import { useDomains } from './hooks/useDomains';
const { domains, loading, error } = useDomains();

// Получить один домен
import { useDomain } from './hooks/useDomains';
const { domain, loading, error } = useDomain('example.com');

// Получить все статьи
import { useBlogPosts } from './hooks/useBlog';
const { posts, loading, error } = useBlogPosts();

// Получить одну статью
import { useBlogPost } from './hooks/useBlog';
const { post, loading, error } = useBlogPost('my-article');
```

## Настройка окружения

### Необходимые секреты

В Cloudflare Dashboard установите следующие секреты:

1. **RESEND_API_KEY** - API ключ от Resend для отправки email
2. **ADMIN_EMAIL** - Email для получения заявок от клиентов

### База данных

База данных D1 автоматически создается при деплое. Миграции находятся в истории проекта.

## Разработка

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Сборка для продакшена
npm run build

# Работа с БД локально
npx wrangler d1 execute DB --command "SELECT * FROM domains"
```

## Деплой

Приложение готово к деплою на Cloudflare Pages с Workers.

1. Настройте секреты в Cloudflare Dashboard
2. Убедитесь что БД D1 создана и привязана к worker
3. Запустите деплой через Cloudflare Pages

## Резервное копирование

Регулярно создавайте резервные копии базы данных:

```bash
# Экспорт
npx wrangler d1 export DB --output=backup.sql

# Импорт
npx wrangler d1 execute DB --file=backup.sql
```

## Поддержка

- **Управление контентом**: См. CONTENT_MANAGEMENT.md
- **API документация**: См. API_DOCUMENTATION.md
- **Вопросы по коду**: Проверьте комментарии в исходниках

## Особенности

✅ Полностью на TypeScript  
✅ Адаптивный дизайн  
✅ SEO-оптимизация  
✅ База данных для контента  
✅ API для расширения функционала  
✅ Email уведомления  
✅ Простое управление контентом  
✅ Хуки для работы с данными  
✅ Модульная архитектура  

## Лицензия

© 2024 dodomain. Все права защищены.
