# dodomain - Next.js Migration

Миграция проекта dodomain с React + Cloudflare Workers на Next.js 15 + PostgreSQL.

⚠️ **ВАЖНО:** Проект должен находиться в пути БЕЗ кириллицы (русских букв). Например:  
✅ Правильно: `C:\Projects\dodomain-next`  
❌ Неправильно: `C:\Проекты\dodomain-next`

## 🚀 Быстрый старт

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка базы данных

#### Вариант A: Локальная PostgreSQL

Установите PostgreSQL и создайте базу данных:

```sql
CREATE DATABASE dodomain;
```

#### Вариант B: Docker (Рекомендуется для разработки)

```bash
docker run --name dodomain-postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=dodomain \
  -p 5432:5432 \
  -d postgres
```

### 3. Настройка переменных окружения

Скопируйте `.env.example` в `.env`:

```bash
copy .env.example .env
```

Отредактируйте `.env` и укажите ваш DATABASE_URL:

```
DATABASE_URL="postgresql://postgres:password@localhost:5432/dodomain?schema=public"
```

### 4. Запуск миграций

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Запуск сервера разработки

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

---

## 📁 Структура проекта

```
dodomain-next/
├── app/                # Next.js App Router
│   ├── page.tsx       # Главная страница
│   ├── about/         # О нас
│   ├── domains/       # Каталог доменов
│   ├── blog/          # Блог
│   ├── contact/       # Контакты
│   └── api/           # API Routes
├── components/        # React компоненты
├── lib/              # Утилиты
│   └── prisma.ts     # Prisma клиент
├── prisma/           # База данных
│   └── schema.prisma # Схема БД
└── public/           # Статические файлы
```

---

## 🗄️ База данных

### Таблицы

**domains** - Таблица доменов  
**blog_posts** - Таблица статей блога

### Команды Prisma

```bash
# Создать миграцию
npx prisma migrate dev --name migration_name

# Применить миграции на production
npx prisma migrate deploy

# Открыть Prisma Studio (GUI для БД)
npx prisma studio

# Сбросить БД (осторожно!)
npx prisma migrate reset
```

---

## 🔧 Команды разработки

```bash
# Запуск dev сервера
npm run dev

# Сборка production
npm run build

# Запуск production
npm run start

# Линтинг
npm run lint

# Prisma Studio
npx prisma studio
```

---

## 📊 API Endpoints

### Домены
- `GET /api/domains` - Список всех доменов
- `GET /api/domains/[name]` - Детали домена

### Блог
- `GET /api/blog` - Список статей
- `GET /api/blog/[slug]` - Статья по slug

### Контакты
- `POST /api/contact` - Отправка формы

---

## 📝 Добавление контента

### Добавление домена

```bash
npx prisma studio
```

Или через SQL:

```sql
INSERT INTO domains (name, price, category, extension, description)
VALUES ('example.com', 500000, 'Премиум', '.com', 'Описание домена');
```

### Добавление статьи блога

```sql
INSERT INTO blog_posts (slug, title, excerpt, content, category, read_time, published_date)
VALUES (
  'my-article',
  'Заголовок статьи',
  'Краткое описание',
  'Полный текст статьи...',
  'Руководство',
  '5 мин',
  '2024-12-28'
);
```

---

## 🚀 Деплой

### Vercel (Рекомендуется)

1. Push на GitHub
2. Подключите к Vercel
3. Добавьте `DATABASE_URL` в Environment Variables
4. Deploy

### Railway

1. Создайте проект на Railway
2. Добавьте PostgreSQL service
3. Добавьте Next.js service
4. Подключите GitHub repo
5. Установите переменные окружения
6. Deploy

### VPS

```bash
# Установите Node.js, PostgreSQL
npm install
npm run build
npm run start

# Или используйте PM2
pm2 start npm --name dodomain -- start
```

---

## 🔄 Миграция данных

Если у вас есть данные в старой (Cloudflare D1) базе, экспортируйте их в SQL и импортируйте:

```bash
psql -U postgres -d dodomain -f export.sql
```

---

## 📚 Документация

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

## 🛠️ Технологический стек

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Validation:** Zod

---

## 📞 Поддержка

При возникновении вопросов обращайтесь к разработчику.

---

**Создано:** 28 декабря 2024  
**Версия:** 1.0.0  
**Статус:** ✅ В разработке
