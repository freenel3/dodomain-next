import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Объединяет классы Tailwind CSS с помощью clsx и tailwind-merge
 * @param inputs - Классы для объединения
 * @returns Объединенная строка классов
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Форматирует цену в рублях
 * @param price - Цена в рублях
 * @returns Отформатированная строка цены
 */
export function formatPrice(price: number | null | undefined): string {
  if (price === undefined || price === null) return "— ₽";
  return `${price.toLocaleString("ru-RU")} ₽`;
}

/**
 * Получает похожие домены на основе текущего
 * @param allDomains - Массив всех доменов
 * @param currentDomain - Имя текущего домена
 * @param currentPrice - Цена текущего домена
 * @param currentExtension - Зона текущего домена
 * @param limit - Максимальное количество результатов (по умолчанию 4)
 * @returns Массив похожих доменов отсортированных по релевантности
 */
export function getSimilarDomains(
  allDomains: any[],
  currentDomain: string,
  currentPrice: number,
  currentExtension: string,
  limit: number = 4
) {
  // Фильтруем текущий домен
  const filtered = allDomains.filter((d) => d.name !== currentDomain);

  // Считаем релевантность для каждого домена
  const scored = filtered.map((d) => {
    let score = 0;

    // Та же зона - самый высокий приоритет
    if (d.extension === currentExtension) score += 10;

    // Схожая цена
    const priceDiff = Math.abs(d.price - currentPrice);
    if (priceDiff < currentPrice * 0.5) score += 5;
    else if (priceDiff < currentPrice * 1.5) score += 3;
    else if (priceDiff < currentPrice * 3) score += 1;

    // Схожая длина
    const currentLength = currentDomain.split(".")[0].length;
    const domainLength = d.name.split(".")[0].length;
    if (Math.abs(currentLength - domainLength) <= 2) score += 2;

    return { ...d, score };
  });

  // Сортируем по релевантности и возвращаем top N
  return scored.sort((a, b) => b.score - a.score).slice(0, limit);
}

/**
 * Форматирует дату в локальный формат
 * @param date - Дата для форматирования
 * @returns Отформатированная строка даты
 */
export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "";

  const d = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

/**
 * Форматирует дату в короткий формат
 * @param date - Дата для форматирования
 * @returns Отформатированная строка даты (ДД ММ ГГГГ)
 */
export function formatDateShort(
  date: Date | string | null | undefined
): string {
  if (!date) return "";

  const d = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

/**
 * Получает длину доменного имени без расширения
 * @param domainName - Полное доменное имя
 * @returns Длина доменного имени
 */
export function getDomainLength(domainName: string): number {
  return domainName.split(".")[0].length;
}

/**
 * Проверяет, является ли строка валидным доменом
 * @param domain - Доменное имя для проверки
 * @returns true если домен валидный
 */
export function isValidDomain(domain: string): boolean {
  const domainRegex = /^(?!-)[A-Za-z0-9]{1,63}(?<!-)(\.[A-Za-z0-9]{1,63})+$/;
  return domainRegex.test(domain);
}

/**
 * Форматирует число с разделителями тысяч
 * @param num - Число для форматирования
 * @returns Отформатированная строка
 */
export function formatNumber(num: number): string {
  return num.toLocaleString("ru-RU");
}

/**
 * Обрезает текст до указанной длины с добавлением многоточия
 * @param text - Текст для обрезки
 * @param maxLength - Максимальная длина
 * @returns Обрезанный текст
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

/**
 * Создает slug из строки
 * @param text - Текст для преобразования
 * @returns Slug строка
 */
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Получает URL страницы с учетом текущего домена
 * @param path - Путь страницы
 * @returns Полный URL
 */
export function getFullUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return `${baseUrl}${path.startsWith("/") ? path : "/" + path}`;
}
