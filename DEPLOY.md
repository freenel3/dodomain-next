# Деплой проекта dodomain на собственный сервер

Полное руководство по развертыванию проекта dodomain на Ubuntu 22.04+ с использованием Docker, Docker Compose и Nginx.

## 📋 Содержание

- [Требования к серверу](#требования-к-серверу)
- [Установка Docker и Docker Compose](#установка-docker-и-docker-compose)
- [Настройка домена и DNS](#настройка-домена-и-dns)
- [Настройка SSL сертификатов](#настройка-ssl-сертификатов)
- [Первый запуск](#первый-запуск)
- [Обновление проекта](#обновление-проекта)
- [Резервное копирование](#резервное-копирование)
- [Мониторинг и логи](#мониторинг-и-логи)
- [Troubleshooting](#troubleshooting)

## 🔧 Требования к серверу

### Минимальные характеристики

- **ОС**: Ubuntu 22.04 LTS или новее
- **CPU**: 2 ядра
- **RAM**: 4 ГБ
- **Диск**: 20 ГБ SSD
- **Сеть**: Публичный IP адрес

### Открытые порты

- `80` - HTTP (для Let's Encrypt)
- `443` - HTTPS
- `22` - SSH

### Программное обеспечение

- Docker 24.0+
- Docker Compose 2.20+
- Git
- Nginx (через Docker)

## 📦 Установка Docker и Docker Compose

### 1. Обновление системы

```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Установка зависимостей

```bash
sudo apt install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    git
```

### 3. Установка Docker

```bash
# Добавление официального GPG ключа Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Добавление репозитория Docker
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Установка Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Проверка установки
docker --version
docker compose version
```

### 4. Настройка Docker

```bash
# Добавление пользователя в группу docker
sudo usermod -aG docker $USER

# Настройка автозапуска Docker
sudo systemctl enable docker
sudo systemctl start docker

# Проверка статуса
sudo systemctl status docker
```

### 5. Настройка брандмауэра (UFW)

```bash
# Разрешение SSH
sudo ufw allow 22/tcp

# Разрешение HTTP и HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Включение UFW
sudo ufw enable

# Проверка статуса
sudo ufw status
```

## 🌐 Настройка домена и DNS

### 1. Настройка DNS записей

Добавьте следующие DNS записи для вашего домена (например, `dodomain.ru`):

| Тип | Хост | Значение         | TTL  |
| --- | ---- | ---------------- | ---- |
| A   | @    | IP адрес сервера | 3600 |
| A   | www  | IP адрес сервера | 3600 |

### 2. Проверка DNS

```bash
# Проверка A записи
dig dodomain.ru +short
dig www.dodomain.ru +short

# Или с помощью nslookup
nslookup dodomain.ru
```

## 🔒 Настройка SSL сертификатов

### Вариант 1: Let's Encrypt (рекомендуется)

#### Установка Certbot

```bash
sudo apt install -y certbot
```

#### Получение сертификата

```bash
# Создание директории для ACME challenge
sudo mkdir -p /var/www/certbot

# Получение сертификата (замените на ваш домен)
sudo certbot certonly --webroot \
    -w /var/www/certbot \
    -d dodomain.ru \
    -d www.dodomain.ru \
    --email your-email@example.com \
    --agree-tos \
    --non-interactive
```

#### Копирование сертификатов

```bash
# Создание директории для сертификатов
sudo mkdir -p /var/www/dodomain/nginx/ssl

# Копирование сертификатов
sudo cp /etc/letsencrypt/live/dodomain.ru/fullchain.pem /var/www/dodomain/nginx/ssl/
sudo cp /etc/letsencrypt/live/dodomain.ru/privkey.pem /var/www/dodomain/nginx/ssl/

# Установка прав
sudo chmod 644 /var/www/dodomain/nginx/ssl/*.pem
```

#### Автоматическое обновление сертификатов

```bash
# Создание скрипта обновления
sudo nano /etc/cron.weekly/letsencrypt-renew.sh
```

Содержимое скрипта:

```bash
#!/bin/bash
# Обновление сертификатов
sudo certbot renew --quiet

# Копирование новых сертификатов
sudo cp /etc/letsencrypt/live/dodomain.ru/fullchain.pem /var/www/dodomain/nginx/ssl/
sudo cp /etc/letsencrypt/live/dodomain.ru/privkey.pem /var/www/dodomain/nginx/ssl/

# Перезагрузка Nginx
cd /var/www/dodomain && sudo docker-compose restart nginx
```

```bash
# Установка прав на выполнение
sudo chmod +x /etc/cron.weekly/letsencrypt-renew.sh
```

### Вариант 2: Самоподписанные сертификаты (для тестирования)

```bash
# Создание директории
sudo mkdir -p /var/www/dodomain/nginx/ssl

# Генерация самоподписанного сертификата
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /var/www/dodomain/nginx/ssl/privkey.pem \
    -out /var/www/dodomain/nginx/ssl/fullchain.pem \
    -subj "/C=RU/ST=Moscow/L=Moscow/O=dodomain/CN=dodomain.ru"

# Установка прав
sudo chmod 644 /var/www/dodomain/nginx/ssl/*.pem
```

## 🚀 Первый запуск

### 1. Клонирование репозитория

```bash
# Клонирование в директорию проекта
sudo git clone https://github.com/your-username/dodomain.git /var/www/dodomain

# Переход в директорию проекта
cd /var/www/dodomain
```

### 2. Настройка переменных окружения

```bash
# Копирование шаблона
sudo cp .env.example .env

# Редактирование файла
sudo nano .env
```

Содержимое `.env`:

```env
# База данных PostgreSQL
POSTGRES_USER=dodomain
POSTGRES_PASSWORD=your_secure_password_here
POSTGRES_DB=dodomain
POSTGRES_PORT=5432

# Базовый URL сайта
NEXT_PUBLIC_BASE_URL=https://dodomain.ru

# Node.js окружение
NODE_ENV=production
```

**Важно**: Замените `your_secure_password_here` на надежный пароль!

### 3. Установка прав на скрипты

```bash
# Установка прав на выполнение
sudo chmod +x scripts/deploy.sh
sudo chmod +x scripts/backup.sh
```

### 4. Запуск деплоя

```bash
# Запуск скрипта деплоя
sudo ./scripts/deploy.sh
```

Скрипт выполнит следующие действия:

1. Создаст бэкап текущей версии
2. Обновит код из git
3. Соберет Docker образы
4. Запустит контейнеры
5. Применит миграции базы данных
6. Заполнит базу тестовыми данными
7. Выполнит health check

### 5. Проверка работы

```bash
# Проверка статуса контейнеров
cd /var/www/dodomain
sudo docker-compose ps

# Просмотр логов
sudo docker-compose logs -f

# Проверка health endpoint
curl http://localhost:3000/api/health
```

### 6. Доступ к сайту

Откройте в браузере:

- `https://dodomain.ru` - основной сайт
- `https://www.dodomain.ru` - сайт с www

## 🔄 Обновление проекта

### Автоматическое обновление через скрипт

```bash
# Обновление из ветки main
sudo ./scripts/deploy.sh

# Обновление из другой ветки
sudo ./scripts/deploy.sh develop
```

### Ручное обновление

```bash
# Переход в директорию проекта
cd /var/www/dodomain

# Обновление кода
sudo git pull origin main

# Пересборка и перезапуск
sudo docker-compose down
sudo docker-compose build --no-cache
sudo docker-compose up -d

# Применение миграций
sudo docker-compose exec -T nextjs npm run db:push
```

## 💾 Резервное копирование

### Создание бэкапа базы данных

```bash
cd /var/www/dodomain

# Создание бэкапа
sudo ./scripts/backup.sh
```

### Список доступных бэкапов

```bash
# Просмотр списка бэкапов
sudo ./scripts/backup.sh --list
```

### Восстановление из бэкапа

```bash
# Восстановление из конкретного бэкапа
sudo ./scripts/backup.sh --restore /var/backups/dodomain/postgres/dodomain_db_20231201_120000.sql.gz
```

### Автоматическое резервное копирование

Создайте cron задачу для ежедневного бэкапа:

```bash
# Редактирование crontab
sudo crontab -e
```

Добавьте следующую строку:

```bash
# Ежедневный бэкап в 2:00 ночи
0 2 * * * cd /var/www/dodomain && ./scripts/backup.sh >> /var/log/dodomain/backup.log 2>&1
```

## 📊 Мониторинг и логи

### Просмотр логов контейнеров

```bash
# Все логи
sudo docker-compose logs -f

# Логи конкретного сервиса
sudo docker-compose logs -f nextjs
sudo docker-compose logs -f postgres
sudo docker-compose logs -f nginx

# Последние 100 строк
sudo docker-compose logs --tail=100
```

### Просмотр логов Nginx

```bash
# Access лог
sudo tail -f /var/www/dodomain/logs/nginx/access.log

# Error лог
sudo tail -f /var/www/dodomain/logs/nginx/error.log
```

### Мониторинг ресурсов

```bash
# Статистика контейнеров
sudo docker stats

# Использование диска
sudo docker system df

# Информация о контейнерах
sudo docker-compose ps
```

### Health check

```bash
# Проверка health endpoint
curl http://localhost:3000/api/health

# Проверка через Nginx
curl https://dodomain.ru/health
```

## 🔧 Troubleshooting

### Проблема: Контейнеры не запускаются

```bash
# Проверка логов
sudo docker-compose logs

# Проверка статуса
sudo docker-compose ps

# Перезапуск
sudo docker-compose restart
```

### Проблема: Проблемы с базой данных

```bash
# Проверка подключения к базе данных
sudo docker-compose exec postgres psql -U dodomain -d dodomain -c "SELECT version();"

# Проверка таблиц
sudo docker-compose exec postgres psql -U dodomain -d dodomain -c "\dt"

# Применение миграций
sudo docker-compose exec -T nextjs npm run db:push
```

### Проблема: Ошибка SSL сертификата

```bash
# Проверка наличия сертификатов
sudo ls -la /var/www/dodomain/nginx/ssl/

# Получение новых сертификатов
sudo certbot renew

# Копирование сертификатов
sudo cp /etc/letsencrypt/live/dodomain.ru/fullchain.pem /var/www/dodomain/nginx/ssl/
sudo cp /etc/letsencrypt/live/dodomain.ru/privkey.pem /var/www/dodomain/nginx/ssl/

# Перезагрузка Nginx
sudo docker-compose restart nginx
```

### Проблема: Недостаточно места на диске

```bash
# Очистка неиспользуемых Docker ресурсов
sudo docker system prune -a --volumes

# Очистка старых бэкапов
sudo find /var/backups/dodomain -name "*.tar.gz" -mtime +30 -delete
sudo find /var/backups/dodomain/postgres -name "*.sql.gz" -mtime +30 -delete

# Очистка логов
sudo truncate -s 0 /var/www/dodomain/logs/nginx/*.log
```

### Проблема: Сайт недоступен

```bash
# Проверка работы контейнеров
sudo docker-compose ps

# Проверка портов
sudo netstat -tlnp | grep -E ':(80|443|3000|5432)'

# Проверка firewall
sudo ufw status

# Проверка DNS
dig dodomain.ru +short
```

### Полная переустановка

```bash
# Остановка и удаление контейнеров
cd /var/www/dodomain
sudo docker-compose down -v

# Удаление Docker образов
sudo docker rmi $(sudo docker images -q)

# Повторный деплой
sudo ./scripts/deploy.sh
```

## 📞 Поддержка

При возникновении проблем:

1. Проверьте логи: `sudo docker-compose logs`
2. Проверьте статус контейнеров: `sudo docker-compose ps`
3. Обратитесь к документации: [README.md](README.md)
4. Свяжитесь с поддержкой: info@dodomain.ru

## 🔐 Безопасность

### Рекомендации по безопасности

1. **Пароли**: Используйте надежные пароли для PostgreSQL
2. **SSL**: Всегда используйте HTTPS
3. **Обновления**: Регулярно обновляйте систему и Docker
4. **Бэкапы**: Делайте регулярные бэкапы базы данных
5. **Мониторинг**: Следите за логами и ресурсами сервера
6. **SSH**: Отключите вход по паролю, используйте SSH ключи

### Настройка SSH ключей

```bash
# Генерация SSH ключа (на локальной машине)
ssh-keygen -t ed25519 -C "your-email@example.com"

# Копирование ключа на сервер
ssh-copy-id user@your-server-ip

# Отключение входа по паролю
sudo nano /etc/ssh/sshd_config
```

Измените следующие параметры:

```
PasswordAuthentication no
PubkeyAuthentication yes
```

Перезапустите SSH:

```bash
sudo systemctl restart sshd
```

## 📚 Дополнительные ресурсы

- [Docker Documentation](https://docs.docker.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
