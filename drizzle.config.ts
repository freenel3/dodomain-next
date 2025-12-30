import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

// Загружаем переменные окружения из .env.local
config({ path: ".env.local" });

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url:
      process.env.DATABASE_URL ||
      "postgresql://postgres:postgres@localhost:5432/dodomain",
  },
  verbose: true,
  strict: true,
});
