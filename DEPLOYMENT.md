# Деплой и обновление проекта dodomain

## Быстрый деплой

### 1. Локальные изменения
```bash
# Добавьте файлы
git add .

# Закоммитьте изменения
git commit -m "Ваше описание изменений"

# Отправьте на GitHub
git push origin master
```

### 2. Деплой на сервере
```bash
# Подключитесь к серверу
ssh root@94.232.41.46

# Перейдите в директорию проекта
cd /var/www/dodomain

# Выполните деплой
bash scripts/deploy.sh
```

## Ручной деплой

### 1. Обновление кода
```bash
# Подключитесь к серверу
ssh root@94.232.41.46

# Перейдите в директорию проекта
cd /var/www/dodomain

# Загрузите изменения
git pull origin master
```

### 2. Обновление базы данных (если нужно)
```bash
# Примените миграцию
docker compose exec -T postgres psql -U dodomain -d dodomain < scripts/seed-data.sql
```

### 3. Пересборка контейнеров
```bash
# Остановите контейнеры
docker compose down

# Пересоберите и запустите
docker compose up -d --build
```

## Управление базой данных

### Просмотр таблиц
```bash
docker compose exec postgres psql -U dodomain -d dodomain -c "\dt"
```

### Просмотр данных
```bash
# Просмотр доменов
docker compose exec postgres psql -U dodomain -d dodomain -c "SELECT * FROM domains LIMIT 10;"

# Просмотр статей блога
docker compose exec postgres psql -U dodomain -d dodomain -c "SELECT * FROM blog_posts LIMIT 10;"
```

### Добавление тестовых данных
```bash
docker compose exec -T postgres psql -U dodomain -d dodomain < scripts/seed-data.sql
```

### Резервное копирование
```bash
# Создание бекапа
docker compose exec postgres pg_dump -U dodomain dodomain > backups/dodomain-$(date +%Y%m%d_%H%M%S).sql

# Восстановление из бекапа
docker compose exec -T postgres psql -U dodomain -d dodomain < backups/dodomain-20241230_123456.sql
```

## Логирование

### Просмотр логов контейнеров
```bash
# Логи Next.js
docker logs dodomain-nextjs

# Логи Nginx
docker logs dodomain-nginx

# Логи PostgreSQL
docker logs dodomain-postgres

# Логи всех контейнеров
docker compose logs
```

### Логи Nginx
```bash
# Просмотр логов доступа
docker exec dodomain-nginx tail -f /var/log/nginx/access.log

# Просмотр логов ошибок
docker exec dodomain-nginx tail -f /var/log/nginx/error.log
```

## Обновление SSL сертификатов

### Ручное обновление
```bash
# Обновление сертификатов
certbot renew --quiet

# Копирование сертификатов в папку nginx
cp /etc/letsencrypt/live/dodomain.ru/fullchain.pem /var/www/dodomain/nginx/ssl/
cp /etc/letsencrypt/live/dodomain.ru/privkey.pem /var/www/dodomain/nginx/ssl/

# Перезапуск nginx
docker restart dodomain-nginx
```

### Автоматическое обновление
SSL сертификаты автоматически обновляются каждый день в 3:00 утра через cron:
```bash
# Просмотр cron-задач
crontab -l
```

## Мониторинг

### Проверка статуса контейнеров
```bash
# Статус всех контейнеров
docker ps

# Статус конкретного контейнера
docker inspect dodomain-nextjs
```

### Проверка работы сайта
```bash
# Проверка HTTP
curl -I http://localhost:3000

# Проверка HTTPS
curl -I https://dodomain.ru

# Проверка health endpoint
curl http://localhost:3000/api/health
```

## Решение проблем

### Контейнер не запускается
```bash
# Просмотр логов
docker logs dodomain-nextjs

# Проверка портов
netstat -tulpn | grep :3000
```

### База данных не работает
```bash
# Проверка статуса PostgreSQL
docker compose ps

# Проверка подключения
docker compose exec postgres psql -U dodomain -d dodomain -c "SELECT 1;"
```

### SSL сертификат истек
```bash
# Обновите сертификат вручную
certbot renew --force

# Перезапустите nginx
docker restart dodomain-nginx
```

### Ошибка 502 Bad Gateway
```bash
# Проверьте, что Next.js контейнер запущен
docker ps | grep nextjs

# Проверьте логи Next.js
docker logs dodomain-nextjs --tail 50
```

## Структура проекта

```
dodomain/
├── src/
│   ├── app/              # Next.js App Router страницы
│   ├── components/       # React компоненты
│   ├── db/             # Drizzle ORM схема и конфигурация
│   └── lib/            # Утилиты и константы
├── public/              # Статические файлы
├── scripts/            # Скрипты деплоя и бекапа
├── nginx/              # Nginx конфигурация
├── docker-compose.yml    # Docker Compose конфигурация
├── Dockerfile          # Docker конфигурация
└── package.json        # NPM зависимости
```

## Полезные команды

### Очистка Docker кэша
```bash
# Удаление неиспользуемых образов
docker image prune -a

# Удаление неиспользуемых контейнеров
docker container prune -a

# Удаление неиспользуемых томов
docker volume prune -a
```

### Перезагрузка сервера
```bash
# Перезагрузка сервера
reboot
```

### Проверка дискового пространства
```bash
# Просмотр использования диска
df -h

# Просмотр использования директорий
du -sh /var/www/dodomain
```

## Контакты

- Сервер: 94.232.41.46
- Домен: dodomain.ru
- GitHub: https://github.com/freenel3/dodomain-next
