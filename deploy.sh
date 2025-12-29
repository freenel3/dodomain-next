#!/bin/bash

# Dodomain Next.js Deployment Script
# Автоматическая установка и настройка проекта на сервере

set -e  # Остановка при ошибке

echo "🚀 Начинаем деплой Dodomain на Next.js..."

# Цвета для вывода
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 1. Проверка и установка Node.js
echo -e "${BLUE}📦 Проверка Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo "Node.js не найден. Устанавливаем..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

NODE_VERSION=$(node -v)
echo -e "${GREEN}✅ Node.js установлен: $NODE_VERSION${NC}"

# 2. Проверка и установка PostgreSQL
echo -e "${BLUE}🗄️  Проверка PostgreSQL...${NC}"
if ! command -v psql &> /dev/null; then
    echo "PostgreSQL не найден. Устанавливаем..."
    sudo apt-get update
    sudo apt-get install -y postgresql postgresql-contrib
    sudo systemctl start postgresql
    sudo systemctl enable postgresql
fi

echo -e "${GREEN}✅ PostgreSQL установлен${NC}"

# 3. Создание базы данных
echo -e "${BLUE}💾 Настройка базы данных...${NC}"
sudo -u postgres psql -c "CREATE DATABASE dodomain;" 2>/dev/null || echo "База данных уже существует"
sudo -u postgres psql -c "CREATE USER dodomain_user WITH PASSWORD 'dodomain_password_2024';" 2>/dev/null || echo "Пользователь уже существует"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE dodomain TO dodomain_user;"
echo -e "${GREEN}✅ База данных настроена${NC}"

# 4. Установка зависимостей проекта
echo -e "${BLUE}📚 Установка зависимостей...${NC}"
npm install

# 5. Настройка .env файла
echo -e "${BLUE}⚙️  Создание .env файла...${NC}"
cat > .env.local << EOF
# Database
DATABASE_URL="postgresql://dodomain_user:dodomain_password_2024@localhost:5432/dodomain"

# App
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://dodomain.ru
EOF

echo -e "${GREEN}✅ .env файл создан${NC}"

# 6. Инициализация Prisma и миграция БД
echo -e "${BLUE}🔄 Инициализация базы данных...${NC}"
npx prisma generate
npx prisma db push
npx prisma db seed 2>/dev/null || echo "Seed скрипт не найден, пропускаем"

echo -e "${GREEN}✅ База данных инициализирована${NC}"

# 7. Сборка проекта
echo -e "${BLUE}🏗️  Сборка проекта...${NC}"
npm run build

echo -e "${GREEN}✅ Проект собран${NC}"

# 8. Установка PM2 для управления процессом
echo -e "${BLUE}🔧 Установка PM2...${NC}"
npm install -g pm2

# 9. Запуск приложения
echo -e "${BLUE}🚀 Запуск приложения...${NC}"
pm2 stop dodomain 2>/dev/null || true
pm2 delete dodomain 2>/dev/null || true
pm2 start npm --name "dodomain" -- start
pm2 save
pm2 startup

echo -e "${GREEN}✅ Приложение запущено!${NC}"

# 10. Установка и настройка Nginx
echo -e "${BLUE}🌐 Настройка Nginx...${NC}"
if ! command -v nginx &> /dev/null; then
    sudo apt-get install -y nginx
fi

# Создание конфигурации Nginx
sudo tee /etc/nginx/sites-available/dodomain.ru > /dev/null << 'NGINX_EOF'
server {
    listen 80;
    server_name dodomain.ru www.dodomain.ru;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
NGINX_EOF

# Активация конфигурации
sudo ln -sf /etc/nginx/sites-available/dodomain.ru /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx

echo -e "${GREEN}✅ Nginx настроен${NC}"

# 11. Установка SSL сертификата (опционально)
echo -e "${BLUE}🔒 Хотите установить SSL сертификат? (y/n)${NC}"
read -r install_ssl
if [ "$install_ssl" = "y" ]; then
    sudo apt-get install -y certbot python3-certbot-nginx
    sudo certbot --nginx -d dodomain.ru -d www.dodomain.ru --non-interactive --agree-tos --email admin@dodomain.ru
    echo -e "${GREEN}✅ SSL сертификат установлен${NC}"
fi

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🎉 ДЕПЛОЙ ЗАВЕРШЁН УСПЕШНО!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}📊 Информация о проекте:${NC}"
echo -e "  🌐 URL: http://dodomain.ru"
echo -e "  📁 Директория: $(pwd)"
echo -e "  🗄️  База данных: dodomain"
echo -e "  🔧 PM2 процесс: dodomain"
echo ""
echo -e "${BLUE}📝 Полезные команды:${NC}"
echo -e "  pm2 status          - Статус приложения"
echo -e "  pm2 logs dodomain   - Логи приложения"
echo -e "  pm2 restart dodomain - Перезапуск"
echo -e "  pm2 stop dodomain   - Остановка"
echo ""
echo -e "${GREEN}✨ Проект готов к работе!${NC}"
