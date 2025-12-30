#!/bin/bash

# Скрипт бэкапа базы данных PostgreSQL для проекта dodomain
# Использование: ./scripts/backup.sh [--restore|--list]

set -e

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

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

# Конфигурация
BACKUP_DIR="/var/backups/dodomain/postgres"
RETENTION_DAYS=30
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/dodomain_db_${DATE}.sql.gz"

# Создание директории для бэкапов
mkdir -p "$BACKUP_DIR"

# Проверка прав
if [ "$EUID" -ne 0 ]; then 
    log_error "Пожалуйста, запустите скрипт с правами root или sudo"
    exit 1
fi

# Режим восстановления
if [ "$1" == "--restore" ]; then
    if [ -z "$2" ]; then
        log_error "Укажите файл для восстановления"
        echo "Использование: $0 --restore <backup-file.sql.gz>"
        exit 1
    fi
    
    BACKUP_FILE="$2"
    
    if [ ! -f "$BACKUP_FILE" ]; then
        log_error "Файл бэкапа не найден: $BACKUP_FILE"
        exit 1
    fi
    
    log_info "Восстановление базы данных из: $BACKUP_FILE"
    log_warn "Это действие удалит текущую базу данных!"
    read -p "Вы уверены? (yes/no): " confirm
    
    if [ "$confirm" != "yes" ]; then
        log_info "Операция отменена"
        exit 0
    fi
    
    log_info "Восстановление базы данных..."
    gunzip -c "$BACKUP_FILE" | docker compose exec -T postgres psql -U dodomain -d dodomain
    
    log_info "База данных успешно восстановлена!"
    exit 0
fi

# Режим списка бэкапов
if [ "$1" == "--list" ]; then
    log_info "Список доступных бэкапов:"
    echo ""
    ls -lh "$BACKUP_DIR"/dodomain_db_*.sql.gz 2>/dev/null | awk '{print $9, $5, $6, $7, $8}' || log_warn "Бэкапы не найдены"
    exit 0
fi

# Режим бэкапа
log_info "Создание бэкапа базы данных..."

# Бэкап через Docker
docker compose exec -T postgres pg_dump -U dodomain -d dodomain | gzip > "$BACKUP_FILE"

# Проверка успешности
if [ $? -eq 0 ]; then
    SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
    log_info "Бэкап успешно создан: $BACKUP_FILE"
    log_info "Размер: $SIZE"
else
    log_error "Ошибка при создании бэкапа"
    rm -f "$BACKUP_FILE"
    exit 1
fi

# Очистка старых бэкапов
log_info "Очистка старых бэкапов (старше $RETENTION_DAYS дней)..."
find "$BACKUP_DIR" -name "dodomain_db_*.sql.gz" -type f -mtime +$RETENTION_DAYS -delete

# Вывод информации о свободном месте
USED=$(du -sh "$BACKUP_DIR" | cut -f1)
log_info "Используемое место в директории бэкапов: $USED"

log_info "Бэкап завершен!"
