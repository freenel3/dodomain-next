import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

// Создаем пул соединений к PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // Максимальное количество соединений
  idleTimeoutMillis: 30000, // Таймаут простоя
  connectionTimeoutMillis: 2000, // Таймаут соединения
});

// Экспортируем экземпляр Drizzle с подключенной схемой
export const db = drizzle(pool, { schema });

// Экспортируем схему для удобного импорта
export * from './schema';

// Функция для закрытия соединений (используется при завершении работы)
export async function closePool() {
  await pool.end();
}

// Обработка ошибок подключения
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});
