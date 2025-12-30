# API Документация dodomain

Этот документ описывает REST API endpoints для работы с доменами и статьями блога.

## База данных

Все API endpoints работают с базой данных D1. Данные автоматически загружаются из базы, так что вам нужно только добавлять контент через SQL (см. CONTENT_MANAGEMENT.md).

## Endpoints

### Домены

#### GET /api/domains

Получить список всех активных доменов.

**Ответ:**
```json
[
  {
    "name": "example.com",
    "price": 500000,
    "category": "Премиум",
    "extension": ".com",
    "description": "Описание домена",
    "registered": "2020",
    "traffic": "1,5К посещений",
    "registrationDate": "2020-05-15",
    "firstRegistrationDate": "2020-05-15",
    "listedDate": "2024-01-10"
  }
]
```

#### GET /api/domains/:name

Получить информацию об одном домене по имени.

**Параметры:**
- `name` - имя домена (например, `example.com`)

**Ответ:**
```json
{
  "name": "example.com",
  "price": 500000,
  "category": "Премиум",
  "extension": ".com",
  "description": "Описание домена",
  "registered": "2020",
  "traffic": "1,5К посещений",
  "registrationDate": "2020-05-15",
  "firstRegistrationDate": "2020-05-15",
  "listedDate": "2024-01-10"
}
```

**Ошибки:**
- `404` - Домен не найден

### Блог

#### GET /api/blog

Получить список всех опубликованных статей блога.

**Ответ:**
```json
[
  {
    "slug": "my-article",
    "title": "Заголовок статьи",
    "excerpt": "Краткое описание",
    "category": "Руководство",
    "readTime": "5 мин",
    "date": "2024-12-25"
  }
]
```

#### GET /api/blog/:slug

Получить полную статью блога по slug.

**Параметры:**
- `slug` - URL-идентификатор статьи (например, `my-article`)

**Ответ:**
```json
{
  "slug": "my-article",
  "title": "Заголовок статьи",
  "excerpt": "Краткое описание",
  "content": "Полный текст статьи...",
  "category": "Руководство",
  "readTime": "5 мин",
  "date": "2024-12-25"
}
```

**Ошибки:**
- `404` - Статья не найдена

### Контакты

#### POST /api/contact

Отправить форму обратной связи (покупка или предложение по домену).

**Тело запроса:**
```json
{
  "name": "Иван Иванов",
  "email": "ivan@example.com",
  "phone": "+7 (999) 123-45-67",
  "message": "Дополнительное сообщение",
  "domainName": "example.com",
  "type": "buy"
}
```

**Поля:**
- `name` (обязательно) - Имя отправителя
- `email` (обязательно) - Email отправителя
- `phone` (необязательно) - Телефон отправителя
- `message` (необязательно) - Сообщение
- `domainName` (обязательно) - Имя домена
- `type` (обязательно) - Тип запроса: `buy` или `offer`

**Ответ:**
```json
{
  "success": true,
  "message": "Заявка успешно отправлена"
}
```

**Ошибки:**
- `400` - Не заполнены обязательные поля
- `500` - Ошибка сервера или отправки email

## React Hooks

Для удобной работы с API в React-компонентах используйте готовые hooks:

### useDomains()

Получить все домены.

```typescript
import { useDomains } from '../hooks/useDomains';

function MyComponent() {
  const { domains, loading, error } = useDomains();
  
  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  
  return (
    <div>
      {domains.map(domain => (
        <div key={domain.name}>{domain.name}</div>
      ))}
    </div>
  );
}
```

### useDomain(name)

Получить один домен по имени.

```typescript
import { useDomain } from '../hooks/useDomains';

function DomainPage({ name }: { name: string }) {
  const { domain, loading, error } = useDomain(name);
  
  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (!domain) return <div>Домен не найден</div>;
  
  return <div>{domain.name} - {domain.price}₽</div>;
}
```

### useBlogPosts()

Получить все статьи блога.

```typescript
import { useBlogPosts } from '../hooks/useBlog';

function BlogList() {
  const { posts, loading, error } = useBlogPosts();
  
  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  
  return (
    <div>
      {posts.map(post => (
        <article key={post.slug}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
```

### useBlogPost(slug)

Получить одну статью по slug.

```typescript
import { useBlogPost } from '../hooks/useBlog';

function BlogPostPage({ slug }: { slug: string }) {
  const { post, loading, error } = useBlogPost(slug);
  
  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (!post) return <div>Статья не найдена</div>;
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  );
}
```

## Примечания

1. Все endpoints возвращают JSON
2. Даты возвращаются в формате `YYYY-MM-DD`
3. Цены возвращаются как числа (рубли)
4. Только активные домены (`is_active = 1`) и опубликованные статьи (`is_published = 1`) возвращаются через API
5. Endpoints `/api/domains/:name` и `/api/blog/:slug` автоматически декодируют URL-encoded параметры
6. CORS включен для всех API endpoints

## Интеграция с фронтендом

Чтобы использовать API в ваших компонентах:

1. Используйте готовые hooks из `src/react-app/hooks/`
2. Или делайте прямые fetch-запросы к `/api/...` endpoints
3. Обрабатывайте состояния loading и error для лучшего UX
4. Кэшируйте данные если нужно (hooks делают это автоматически)

## Добавление новых данных

Для добавления новых доменов или статей см. документацию в файле `CONTENT_MANAGEMENT.md`.
