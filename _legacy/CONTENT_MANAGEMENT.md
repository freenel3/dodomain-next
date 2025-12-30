# Управление контентом dodomain

Этот документ объясняет, как добавлять и управлять контентом на сайте dodomain.

## База данных

Весь контент (домены и статьи блога) хранится в базе данных D1 (SQLite). Это упрощает управление и позволяет легко добавлять новый контент.

## Добавление новых доменов

### Через SQL (рекомендуется)

Подключитесь к базе данных и выполните SQL-запрос:

```sql
INSERT INTO domains (
  name, 
  price, 
  category, 
  extension, 
  description, 
  registered_year, 
  traffic, 
  registration_date, 
  first_registration_date, 
  listed_date
) VALUES (
  'example.com',           -- Имя домена
  500000,                  -- Цена в рублях (целое число)
  'Премиум',              -- Категория: Премиум, Бизнес, Коммерция, Медиа, Технологии
  '.com',                 -- Зона домена
  'Описание домена',      -- Описание (необязательно)
  '2020',                 -- Год регистрации
  '1,5К посещений',       -- Трафик (текст)
  '2020-05-15',          -- Дата регистрации (YYYY-MM-DD)
  '2020-05-15',          -- Первая дата регистрации (YYYY-MM-DD)
  '2024-01-10'           -- Дата выставления на продажу (YYYY-MM-DD)
);
```

### Примеры для разных категорий

**Премиум домен:**
```sql
INSERT INTO domains (name, price, category, extension, description, registered_year, traffic, registration_date, first_registration_date, listed_date)
VALUES ('best.com', 2500000, 'Премиум', '.com', 'Один из лучших односложных доменов', '2010', '3К посещений', '2010-03-15', '2010-03-15', '2024-01-20');
```

**Бизнес домен:**
```sql
INSERT INTO domains (name, price, category, extension, description, registered_year, traffic, registration_date, first_registration_date, listed_date)
VALUES ('бизнес.рф', 180000, 'Бизнес', '.рф', 'Деловой кириллический домен', '2019', '850 посещений', '2019-06-10', '2019-06-10', '2024-02-01');
```

**Технологический домен:**
```sql
INSERT INTO domains (name, price, category, extension, description, registered_year, traffic, registration_date, first_registration_date, listed_date)
VALUES ('tech.io', 320000, 'Технологии', '.io', 'Идеален для IT-стартапов', '2018', '1,2К посещений', '2018-09-22', '2018-09-22', '2024-03-05');
```

### Деактивация домена

Если домен продан или нужно его скрыть:

```sql
UPDATE domains SET is_active = 0 WHERE name = 'example.com';
```

Вернуть обратно:

```sql
UPDATE domains SET is_active = 1 WHERE name = 'example.com';
```

### Изменение цены

```sql
UPDATE domains SET price = 600000, updated_at = CURRENT_TIMESTAMP 
WHERE name = 'example.com';
```

## Добавление статей в блог

### SQL запрос для новой статьи

```sql
INSERT INTO blog_posts (
  slug,
  title,
  excerpt,
  content,
  category,
  read_time,
  published_date
) VALUES (
  'my-article-url',                    -- URL статьи (только латиница и дефисы)
  'Заголовок статьи',                  -- Заголовок
  'Краткое описание статьи',          -- Краткое описание для списка
  'Полный текст статьи...',           -- Полный текст (можно использовать ## для заголовков)
  'Руководство',                       -- Категория
  '5 мин',                            -- Время чтения
  '2024-12-25'                        -- Дата публикации (YYYY-MM-DD)
);
```

### Форматирование контента статьи

Используйте markdown-подобный синтаксис в поле `content`:

```
## Основной заголовок раздела

Обычный абзац текста.

### Подзаголовок

Еще один абзац.

- Пункт списка 1
- Пункт списка 2
- **Жирный текст** в пункте списка
```

### Пример полной статьи

```sql
INSERT INTO blog_posts (slug, title, excerpt, content, category, read_time, published_date)
VALUES (
  'buying-first-domain',
  'Как купить первый домен: Полное руководство',
  'Пошаговая инструкция для новичков по покупке доменного имени.',
  '
Покупка первого домена - важный шаг в создании онлайн-присутствия.

## Шаг 1: Выбор имени

Выберите короткое и запоминающееся имя.

## Шаг 2: Проверка доступности

Убедитесь, что домен свободен.

## Шаг 3: Регистрация

Зарегистрируйте домен у надежного регистратора.

- **Проверьте** условия продления
- **Настройте** DNS-записи
- **Защитите** домен от передачи
  ',
  'Руководство',
  '6 мин',
  '2024-12-25'
);
```

### Категории статей

Используйте одну из следующих категорий:
- `Доменные зоны`
- `Руководство`
- `Оценка`
- `Индустрия`
- `Инвестиции`
- `SEO`
- `Безопасность`
- `Брендинг`
- `Международное`
- `Монетизация`
- `Аукционы`

### Скрытие статьи

```sql
UPDATE blog_posts SET is_published = 0 WHERE slug = 'my-article-url';
```

### Редактирование статьи

```sql
UPDATE blog_posts 
SET 
  title = 'Новый заголовок',
  content = 'Обновленный контент',
  updated_at = CURRENT_TIMESTAMP
WHERE slug = 'my-article-url';
```

## Просмотр данных

### Все активные домены

```sql
SELECT name, price, category, extension FROM domains WHERE is_active = 1 ORDER BY price DESC;
```

### Все опубликованные статьи

```sql
SELECT slug, title, category, published_date FROM blog_posts WHERE is_published = 1 ORDER BY published_date DESC;
```

### Домены в определенной зоне

```sql
SELECT name, price FROM domains WHERE extension = '.com' AND is_active = 1;
```

### Статьи по категории

```sql
SELECT title, published_date FROM blog_posts WHERE category = 'Руководство' AND is_published = 1;
```

## Доступ к базе данных

### Локально (разработка)

Используйте Wrangler CLI:

```bash
npx wrangler d1 execute DB --command "SELECT * FROM domains LIMIT 5"
```

### На продакшене

Через Cloudflare Dashboard:
1. Откройте Workers & Pages
2. Выберите ваше приложение
3. Перейдите в раздел D1 Databases
4. Выберите вашу базу данных
5. Используйте Console для выполнения SQL-запросов

## Резервное копирование

Регулярно создавайте резервные копии базы данных:

```bash
npx wrangler d1 export DB --output=backup.sql
```

Восстановление из резервной копии:

```bash
npx wrangler d1 execute DB --file=backup.sql
```

## Важные примечания

1. **Всегда используйте одинарные кавычки** для строковых значений в SQL
2. **Цены указывайте в рублях** как целые числа (без пробелов и символов)
3. **Даты в формате YYYY-MM-DD** (например, 2024-12-25)
4. **Slug статьи должен быть уникальным** и содержать только латиницу, цифры и дефисы
5. **Имя домена должно быть уникальным**
6. **Не забывайте обновлять updated_at** при изменении записей

## Поддержка

При возникновении проблем проверьте:
- Правильность SQL-синтаксиса
- Уникальность значений (name для доменов, slug для статей)
- Формат дат и чисел
- Наличие обязательных полей
