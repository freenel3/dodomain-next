#!/bin/bash

# Скрипт деплоя проекта dodomain на сервер
# Использование: ./scripts/deploy.sh [branch]
# По умолчанию используется ветка main

set -e  # Остановка при ошибке

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Логирование
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Проверка прав root
if [ "$EUID" -ne 0 ]; then 
    log_error "Пожалуйста, запустите скрипт с правами root или sudo"
    exit 1
fi

# Конфигурация
BRANCH=${1:-main}
PROJECT_DIR="/var/www/dodomain"
BACKUP_DIR="/var/backups/dodomain"
DATE=$(date +%Y%m%d_%H%M%S)
LOG_FILE="/var/log/dodomain/deploy_${DATE}.log"

# Создание директорий
mkdir -p "$BACKUP_DIR"
mkdir -p "$(dirname "$LOG_FILE")"

log_info "Начинаем деплой проекта dodomain..."
log_info "Ветка: $BRANCH"
log_info "Лог-файл: $LOG_FILE"

# Перенаправление вывода в лог
exec > >(tee -a "$LOG_FILE") 2>&1

# 1. Бэкап текущей версии
log_info "Создание бэкапа текущей версии..."
if [ -d "$PROJECT_DIR" ]; then
    BACKUP_FILE="$BACKUP_DIR/dodomain_backup_${DATE}.tar.gz"
    tar -czf "$BACKUP_FILE" -C "$PROJECT_DIR" . 2>/dev/null || true
    log_info "Бэкап сохранен: $BACKUP_FILE"
else
    log_warn "Директория проекта не существует, пропускаем бэкап"
fi

# 2. Обновление кода из git
log_info "Обновление кода..."
if [ -d "$PROJECT_DIR/.git" ]; then
    log_info "Обнаружен git репозиторий. Обновляем из origin..."
    cd "$PROJECT_DIR"
    git fetch origin
    git checkout "$BRANCH"
    git pull origin "$BRANCH"
    log_info "Код обновлен из git"
elif [ -d "$PROJECT_DIR" ]; then
    log_info "Директория проекта существует, но это не git репозиторий."
    log_info "Предполагается ручная загрузка файлов. Пропускаем git operations."
else
    log_info "Директория не найдена. Пытаемся клонировать (если настроен git)..."
    # Placeholder for git clone if needed, or error out if strictly manual
    if [ "$1" == "git" ]; then
         git clone -b "$BRANCH" https://github.com/your-username/dodomain.git "$PROJECT_DIR"
         cd "$PROJECT_DIR"
         log_info "Репозиторий склонирован"
    else
         log_warn "Проест не найден и git url не настроен. Ожидается ручная загрузка файлов в $PROJECT_DIR"
         # Создаем директорию, чтобы скрипт мог продолжить после ручной загрузки (хотя файлы уже должны быть там)
         mkdir -p "$PROJECT_DIR"
    fi
fi

# 3. Создание .env файла если не существует
if [ ! -f "$PROJECT_DIR/.env" ]; then
    log_warn "Файл .env не найден, создаем из .env.example..."
    cp "$PROJECT_DIR/.env.example" "$PROJECT_DIR/.env"
    log_warn "Пожалуйста, отредактируйте $PROJECT_DIR/.env с вашими настройками"
fi

# 4. Создание необходимых директорий
log_info "Создание необходимых директорий..."
mkdir -p "$PROJECT_DIR/nginx/ssl"
mkdir -p "$PROJECT_DIR/logs/nginx"
mkdir -p "$PROJECT_DIR/backups"

# 5. Остановка старых контейнеров
log_info "Остановка старых контейнеров..."
cd "$PROJECT_DIR"
docker compose down || true

# 6. Сборка Docker образов
log_info "Сборка Docker образов..."
docker compose build --no-cache

# 7. Запуск контейнеров
log_info "Запуск контейнеров..."
docker compose up -d

# 8. Ожидание запуска PostgreSQL
log_info "Ожидание запуска PostgreSQL..."
sleep 10

# 9. Применение миграций базы данных
log_info "Применение миграций базы данных..."
docker compose exec -T nextjs npm run db:push || {
    log_warn "Не удалось применить миграции, пробуем повторно..."
    sleep 5
    docker compose exec -T nextjs npm run db:push
}

# 10. Заполнение базы данных (если пустая)
log_info "Проверка необходимости заполнения базы данных..."
DB_COUNT=$(docker compose exec -T postgres psql -U dodomain -d dodomain -tAc "SELECT COUNT(*) FROM domains" 2>/dev/null || echo "0")
if [ "$DB_COUNT" -eq 0 ]; then
    log_info "База данных пустая, заполняем тестовыми данными..."
    docker compose exec -T nextjs npm run db:seed
else
    log_info "База данных уже содержит данные: $DB_COUNT доменов"
fi

# 11. Health check
log_info "Проверка работоспособности сервисов..."
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

# 12. Очистка старых бэкапов (оставляем последние 7)
log_info "Очистка старых бэкапов..."
find "$BACKUP_DIR" -name "dodomain_backup_*.tar.gz" -type f -mtime +7 -delete 2>/dev/null || true

# 13. Очистка старых Docker образов
log_info "Очистка старых Docker образов..."
docker image prune -f

# 14. Вывод статуса контейнеров
log_info "Статус контейнеров:"
docker compose ps

log_info "========================================"
log_info "Деплой успешно завершен!"
log_info "========================================"
log_info "URL: https://dodomain.ru"
log_info "Логи: docker compose logs -f"
log_info "Бэкап: $BACKUP_FILE"
log_info "========================================"
