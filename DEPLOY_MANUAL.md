# Ручное развертывание dodomain

Этот документ описывает процесс ручного развертывания проекта на сервере, используя предоставленные доступы.

## Данные сервера

- **IP**: `94.232.41.46`
- **Пользователь**: `root`
- **Пароль**: `Bq93%nRoK`
- **Домен**: `dodomain.ru`

## Шаг 1: Подготовка файлов (на вашем компьютере)

1. Создайте архив проекта.
   В PowerShell в корне проекта выполните команду:
   ```powershell
   Compress-Archive -Path src, public, scripts, nginx, docker-compose.yml, Dockerfile, package.json, package-lock.json, tsconfig.json, next.config.ts, tailwind.config.ts, drizzle.config.ts, postcss.config.mjs, .env.local -DestinationPath deploy.zip -Force
   ```
   *Это создаст файл `deploy.zip` со всеми необходимыми файлами.*

## Шаг 2: Загрузка на сервер

1. Используйте `scp` (или WinSCP/FileZilla) для загрузки архива.
   В PowerShell:
   ```powershell
   scp deploy.zip root@94.232.41.46:/root/deploy.zip
   ```
   *Введите пароль при запросе.*

## Шаг 3: Настройка сервера (SSH)

1. Подключитесь к серверу:
   ```powershell
   ssh root@94.232.41.46
   ```

2. Установите Docker и Docker Compose (если еще не установлены):
   ```bash
   apt update
   apt install docker.io docker-compose -y
   ```

3. Подготовьте директорию проекта:
   ```bash
   mkdir -p /var/www/dodomain
   apt install unzip -y
   unzip -o ~/deploy.zip -d /var/www/dodomain
   ```

## Шаг 4: Запуск

1. Перейдите в папку и запустите скрипт деплоя:
   ```bash
   cd /var/www/dodomain
   chmod +x scripts/deploy.sh
   ./scripts/deploy.sh
   ```

   *Скрипт автоматически:*
   - Соберет Docker образы
   - Запустит контейнеры (Next.js, Postgres, Nginx)
   - Применит миграции базы данных
   - Заполнит базу начальными данными (если она пуста)

## Шаг 5: Настройка SSL (HTTPS)

Для работы HTTPS необходимо получить сертификаты. Рекомендуется использовать Certbot.

1. Установите Certbot на сервере:
   ```bash
   apt install certbot -y
   ```

2. Получите сертификаты (порт 80 должен быть свободен, остановите nginx если запущен `docker-compose down`):
   ```bash
   cd /var/www/dodomain
   docker-compose down
   certbot certonly --standalone -d dodomain.ru -d www.dodomain.ru
   ```

3. Копируйте сертификаты в папку проекта:
   ```bash
   cp /etc/letsencrypt/live/dodomain.ru/fullchain.pem /var/www/dodomain/nginx/ssl/fullchain.pem
   cp /etc/letsencrypt/live/dodomain.ru/privkey.pem /var/www/dodomain/nginx/ssl/privkey.pem
   ```

4. Запустите проект снова:
   ```bash
   ./scripts/deploy.sh
   ```

## Шаг 6: Проверка

Откройте в браузере: [https://dodomain.ru](https://dodomain.ru)


### Полезные команды

- **Логи приложения:**
  ```bash
  cd /var/www/dodomain
  docker-compose logs -f
  ```

- **Резервная копия БД:**
  ```bash
  /var/www/dodomain/scripts/backup.sh
  ```
