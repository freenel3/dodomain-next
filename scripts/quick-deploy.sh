#!/bin/bash

# Быстрый скрипт деплоя для dodomain.ru
# Запуск: sudo ./scripts/quick-deploy.sh

set -e

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Конфигурация сервера
SERVER_IP="94.232.41.46"
DOMAIN="dodomain.ru"
PROJECT_DIR="/var/www/dodomain"
REPO_URL="https://github.com/your-username/dodomain.git"

# Проверка прав root
if [ "$EUID" -ne 0 ]; then 
    log_error "Пожалуйста, запустите скрипт с правами root или sudo"
    exit 1
fi

log_info "========================================"
log_info "Быстрый деплой dodomain.ru"
log_info "========================================"

# 1. Обновление системы
log_info "Обновление системы..."
apt update && apt upgrade -y

# 2. Установка Docker
log_info "Установка Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com | sh
    systemctl enable docker
    systemctl start docker
else
    log_info "Docker уже установлен"
fi

# 3. Установка Docker Compose
log_info "Установка Docker Compose..."
if ! command -v docker compose &> /dev/null; then
    apt install -y docker-compose-plugin
else
    log_info "Docker Compose уже установлен"
fi

# 4. Установка Git
log_info "Установка Git..."
if ! command -v git &> /dev/null; then
    apt install -y git
else
    log_info "Git уже установлен"
fi

# 5. Установка Certbot для SSL
log_info "Установка Certbot..."
apt install -y certbot

# 6. Настройка firewall
log_info "Настройка firewall..."
if command -v ufw &> /dev/null; then
    ufw allow 22/tcp
    ufw allow 80/tcp
    ufw allow 443/tcp
    ufw --force enable
else
    log_warn "UFW не установлен, пропускаем настройку firewall"
fi

# 7. Создание директорий
log_info "Создание директорий проекта..."
mkdir -p "$PROJECT_DIR"
mkdir -p "$PROJECT_DIR/nginx/ssl"
mkdir -p "$PROJECT_DIR/logs/nginx"
mkdir -p "$PROJECT_DIR/backups"
mkdir -p /var/backups/dodomain/postgres
mkdir -p /var/log/dodomain

# 8. Клонирование или обновление репозитория
log_info "Получение кода проекта..."
if [ -d "$PROJECT_DIR/.git" ]; then
    cd "$PROJECT_DIR"
    git fetch origin
    git pull origin main
else
    rm -rf "$PROJECT_DIR"
    git clone -b main "$REPO_URL" "$PROJECT_DIR"
    cd "$PROJECT_DIR"
fi

# 9. Создание .env файла
log_info "Настройка переменных окружения..."
if [ ! -f "$PROJECT_DIR/.env" ]; then
    cat > "$PROJECT_DIR/.env" << EOF
# База данных PostgreSQL
POSTGRES_USER=dodomain
POSTGRES_PASSWORD=$(openssl rand -base64 32)
POSTGRES_DB=dodomain
POSTGRES_PORT=5432

# Базовый URL сайта
NEXT_PUBLIC_BASE_URL=https://$DOMAIN

# Node.js окружение
NODE_ENV=production
EOF
    log_info "Файл .env создан с автоматическим паролем"
else
    log_info "Файл .env уже существует"
fi

# 10. Получение SSL сертификата
log_info "Получение SSL сертификата для $DOMAIN..."
mkdir -p /var/www/certbot
certbot certonly --webroot \
    -w /var/www/certbot \
    -d "$DOMAIN" \
    -d "www.$DOMAIN" \
    --email admin@$DOMAIN \
    --agree-tos \
    --non-interactive \
    --force-renewal || log_warn "Не удалось получить сертификат, используйте самоподписанный"

# Копирование сертификатов
if [ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
    cp "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" "$PROJECT_DIR/nginx/ssl/"
    cp "/etc/letsencrypt/live/$DOMAIN/privkey.pem" "$PROJECT_DIR/nginx/ssl/"
    chmod 644 "$PROJECT_DIR/nginx/ssl/"*.pem
    log_info "SSL сертификаты скопированы"
else
    log_warn "Создание самоподписанного сертификата..."
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout "$PROJECT_DIR/nginx/ssl/privkey.pem" \
        -out "$PROJECT_DIR/nginx/ssl/fullchain.pem" \
        -subj "/C=RU/ST=Moscow/L=Moscow/O=dodomain/CN=$DOMAIN"
    chmod 644 "$PROJECT_DIR/nginx/ssl/"*.pem
fi

# 11. Установка прав на скрипты
log_info "Установка прав на скрипты..."
chmod +x "$PROJECT_DIR/scripts/deploy.sh"
chmod +x "$PROJECT_DIR/scripts/backup.sh"

# 12. Остановка старых контейнеров
log_info "Остановка старых контейнеров..."
cd "$PROJECT_DIR"
docker compose down 2>/dev/null || true

# 13. Сборка и запуск контейнеров
log_info "Сборка и запуск контейнеров..."
docker compose up -d

# 14. Ожидание запуска PostgreSQL
log_info "Ожидание запуска PostgreSQL..."
sleep 15

# 15. Применение миграций
log_info "Применение миграций базы данных..."
docker compose exec -T nextjs npm run db:push || {
    log_warn "Не удалось применить миграции, пробуем повторно..."
    sleep 5
    docker compose exec -T nextjs npm run db:push
}

# 16. Заполнение базы данных
log_info "Проверка необходимости заполнения базы данных..."
DB_COUNT=$(docker compose exec -T postgres psql -U dodomain -d dodomain -tAc "SELECT COUNT(*) FROM domains" 2>/dev/null || echo "0")
if [ "$DB_COUNT" -eq 0 ]; then
    log_info "База данных пустая, заполняем тестовыми данными..."
    docker compose exec -T nextjs npm run db:seed
else
    log_info "База данных уже содержит данные: $DB_COUNT доменов"
fi

# 17. Health check
log_info "Проверка работоспособности приложения..."
MAX_RETRIES=30
RETRY=0
while [ $RETRY -lt $MAX_RETRIES ]; do
    if curl -f http://localhost:3000/api/health >/dev/null 2>&1; then
        log_info "Приложение успешно запущено!"
        break
    fi
    RETRY=$((RETRY + 1))
    log_warn "Ожидание запуска приложения... ($RETRY/$MAX_RETRIES)"
    sleep 2
done

if [ $RETRY -eq $MAX_RETRIES ]; then
    log_error "Не удалось запустить приложение"
    log_info "Просмотр логов: docker compose logs"
    exit 1
fi

# 18. Настройка автоматического обновления SSL
log_info "Настройка автоматического обновления SSL..."
cat > /etc/cron.weekly/letsencrypt-renew.sh << 'EOF'
#!/bin/bash
certbot renew --quiet
cp /etc/letsencrypt/live/dodomain.ru/fullchain.pem /var/www/dodomain/nginx/ssl/
cp /etc/letsencrypt/live/dodomain.ru/privkey.pem /var/www/dodomain/nginx/ssl/
cd /var/www/dodomain && docker compose restart nginx
EOF
chmod +x /etc/cron.weekly/letsencrypt-renew.sh

# 19. Настройка автоматического бэкапа
log_info "Настройка автоматического бэкапа..."
(crontab -l 2>/dev/null | grep -v "backup.sh"; echo "0 2 * * * cd /var/www/dodomain && ./scripts/backup.sh >> /var/log/dodomain/backup.log 2>&1") | crontab -

# 20. Вывод статуса
log_info "========================================"
log_info "Деплой успешно завершен!"
log_info "========================================"
log_info "URL: https://$DOMAIN"
log_info "IP: $SERVER_IP"
log_info ""
log_info "Полезные команды:"
log_info "  - Статус: cd $PROJECT_DIR && docker compose ps"
log_info "  - Логи: cd $PROJECT_DIR && docker compose logs -f"
log_info "  - Обновление: cd $PROJECT_DIR && ./scripts/deploy.sh"
log_info "  - Бэкап: cd $PROJECT_DIR && ./scripts/backup.sh"
log_info "========================================"
