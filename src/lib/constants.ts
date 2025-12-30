/**
 * Константы категорий доменов
 */
export const DOMAIN_CATEGORIES = [
  "Брендовые",
  "Короткие",
  "Ключевые слова",
  "Географические",
  "Имена",
  "Технологии",
  "Финансы",
  "Бизнес",
  "Здоровье",
  "Спорт",
  "Образование",
  "Развлечения",
  "Новости",
  "Интернет",
  "Торговля",
] as const;

export type DomainCategory = (typeof DOMAIN_CATEGORIES)[number];

/**
 * Доменные зоны с приоритетом сортировки
 */
export const DOMAIN_EXTENSIONS = [
  ".ru",
  ".рф",
  ".рус",
  ".ru.com",
  ".com",
  ".net",
  ".org",
  ".info",
  ".su",
  ".moscow",
  ".москва",
  ".tatar",
  ".дети",
  ".онлайн",
  ".сайт",
  ".name",
  ".ru.net",
  ".com.ru",
  ".msk.ru",
  ".spb.ru",
  ".спб.рф",
  ".xyz",
  ".site",
  ".online",
  ".website",
  ".space",
  ".pw",
  ".pro",
  ".rent",
  ".tech",
  ".fans",
  ".college",
  ".love",
  ".press",
  ".host",
  ".io",
  ".ai",
  ".co",
  ".me",
  ".tv",
  ".gg",
  ".cc",
  ".app",
] as const;

export type DomainExtension = (typeof DOMAIN_EXTENSIONS)[number];

/**
 * Категории блога
 */
export const BLOG_CATEGORIES = [
  "Доменные зоны",
  "Руководство",
  "Оценка",
  "Индустрия",
  "Инвестиции",
  "SEO",
  "Безопасность",
  "Брендинг",
  "Международное",
  "Монетизация",
  "Аукционы",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

/**
 * Лимиты пагинации
 */
export const PAGINATION = {
  DOMAINS_PER_PAGE: 20,
  BLOG_POSTS_PER_PAGE: 10,
  MAX_VISIBLE_PAGES: 5,
} as const;

/**
 * SEO настройки по умолчанию
 */
export const SEO_DEFAULTS = {
  SITE_NAME: "dodomain",
  SITE_DESCRIPTION:
    "Покупайте и продавайте премиум-домены на крупнейшей площадке.",
  SITE_KEYWORDS: "домены, покупка доменов, продажа доменов, премиум домены",
  TWITTER_HANDLE: "@dodomain",
  OG_IMAGE: "/og-image.png",
} as const;

/**
 * Настройки формы
 */
export const FORM_VALIDATION = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  MESSAGE_MIN_LENGTH: 10,
  MESSAGE_MAX_LENGTH: 2000,
} as const;

/**
 * Типы заявок
 */
export const SUBMISSION_TYPES = {
  GENERAL: "general",
  OFFER: "offer",
  BUY: "buy",
  SELL: "sell",
} as const;

export type SubmissionType =
  (typeof SUBMISSION_TYPES)[keyof typeof SUBMISSION_TYPES];

/**
 * Статусы заявок
 */
export const SUBMISSION_STATUS = {
  NEW: "new",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  ARCHIVED: "archived",
} as const;

export type SubmissionStatus =
  (typeof SUBMISSION_STATUS)[keyof typeof SUBMISSION_STATUS];

/**
 * Статусы предложений
 */
export const OFFER_STATUS = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
  EXPIRED: "expired",
} as const;

export type OfferStatus = (typeof OFFER_STATUS)[keyof typeof OFFER_STATUS];

/**
 * Уровни SEO потенциала
 */
export const TRAFFIC_LEVELS = {
  HIGH: "Высокий",
  MEDIUM: "Средний",
  LOW: "Низкий",
} as const;

export type TrafficLevel = (typeof TRAFFIC_LEVELS)[keyof typeof TRAFFIC_LEVELS];

/**
 * Фильтры длины домена
 */
export const DOMAIN_LENGTH_FILTERS = [
  { value: "2", label: "2 символа" },
  { value: "3", label: "3 символа" },
  { value: "4", label: "4 символа" },
  { value: "5", label: "5 символов" },
  { value: "5+", label: "От 5 символов" },
] as const;

/**
 * Навигационные элементы
 */
export const NAV_ITEMS = [
  { href: "/domains", label: "Домены" },
  { href: "/sell-domain", label: "Продать" },
  { href: "/blog", label: "Блог" },
  { href: "/about", label: "О нас" },
  { href: "/contact", label: "Контакты" },
] as const;

/**
 * Социальные сети
 */
export const SOCIAL_LINKS = {
  TELEGRAM: "https://t.me/pnlup",
  EMAIL: "mailto:info@dodomain.ru",
} as const;

/**
 * Контактная информация
 */
export const CONTACT_INFO = {
  EMAIL: "info@dodomain.ru",
  PHONE: "+7 (999) 123-45-67",
  ADDRESS: "Москва, Россия",
  TELEGRAM: "@pnlup",
} as const;

/**
 * API эндпоинты
 */
export const API_ENDPOINTS = {
  DOMAINS: "/api/domains",
  BLOG: "/api/blog",
  CONTACT: "/api/contact",
  OFFER: "/api/offer",
} as const;

/**
 * Кэширование (в секундах)
 */
export const CACHE_DURATIONS = {
  DOMAINS: 300, // 5 минут
  BLOG_POSTS: 600, // 10 минут
  DOMAIN_DETAIL: 1800, // 30 минут
  BLOG_POST: 3600, // 1 час
} as const;
