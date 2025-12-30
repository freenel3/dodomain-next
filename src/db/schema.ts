import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

/**
 * Таблица доменов
 * Хранит информацию о доменах, доступных для покупки
 */
export const domains = pgTable(
  "domains",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull().unique(),
    price: integer("price").notNull(),
    category: varchar("category", { length: 100 }),
    extension: varchar("extension", { length: 20 }),
    description: text("description"),
    length: integer("length"), // Длина домена без точки
    featured: boolean("featured").default(false), // Рекомендуемый домен
    trafficLevel: varchar("traffic_level", { length: 50 }), // Уровень трафика
    seoPotential: integer("seo_potential").default(0), // SEO потенциал (0-100)
    registeredYear: integer("registered_year"),
    traffic: varchar("traffic", { length: 50 }),
    registrationDate: timestamp("registration_date"),
    firstRegistrationDate: timestamp("first_registration_date"),
    listedDate: timestamp("listed_date").defaultNow(),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    // Индексы для оптимизации запросов
    extensionIdx: index("idx_domains_extension").on(table.extension),
    categoryIdx: index("idx_domains_category").on(table.category),
    priceIdx: index("idx_domains_price").on(table.price),
    nameIdx: index("idx_domains_name").on(table.name),
    isActiveIdx: index("idx_domains_is_active").on(table.isActive),
    listedDateIdx: index("idx_domains_listed_date").on(table.listedDate),
  })
);

/**
 * Таблица статей блога
 * Хранит статьи блога о доменах и инвестициях
 */
export const blogPosts = pgTable(
  "blog_posts",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    title: varchar("title", { length: 255 }).notNull(),
    excerpt: text("excerpt"),
    content: text("content"),
    category: varchar("category", { length: 100 }),
    readTime: varchar("read_time", { length: 50 }),
    featuredImage: varchar("featured_image", { length: 500 }),
    publishedDate: timestamp("published_date").defaultNow(),
    isPublished: boolean("is_published").default(true),
    metaTitle: varchar("meta_title", { length: 255 }),
    metaDescription: text("meta_description"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    slugIdx: index("idx_blog_posts_slug").on(table.slug),
    categoryIdx: index("idx_blog_posts_category").on(table.category),
    publishedDateIdx: index("idx_blog_posts_published_date").on(
      table.publishedDate
    ),
    isPublishedIdx: index("idx_blog_posts_is_published").on(table.isPublished),
  })
);

/**
 * Таблица заявок с формы контактов
 * Хранит сообщения, отправленные через контактную форму
 */
export const contactSubmissions = pgTable(
  "contact_submissions",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    subject: varchar("subject", { length: 500 }),
    message: text("message").notNull(),
    domainId: integer("domain_id"), // ID домена, если заявка связана с доменом
    domainName: varchar("domain_name", { length: 255 }),
    type: varchar("type", { length: 50 }).default("general"), // general, offer, buy, sell
    submissionType: varchar("submission_type", { length: 50 }).default(
      "general"
    ),
    status: varchar("status", { length: 50 }).default("new"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    statusIdx: index("idx_contact_submissions_status").on(table.status),
    createdAtIdx: index("idx_contact_submissions_created_at").on(
      table.createdAt
    ),
  })
);

/**
 * Таблица предложений по доменам
 * Хранит предложения на покупку доменов
 */
export const domainOffers = pgTable(
  "domain_offers",
  {
    id: serial("id").primaryKey(),
    domainName: varchar("domain_name", { length: 255 }).notNull(),
    offerPrice: integer("offer_price").notNull(),
    buyerName: varchar("buyer_name", { length: 255 }).notNull(),
    buyerEmail: varchar("buyer_email", { length: 255 }).notNull(),
    buyerPhone: varchar("buyer_phone", { length: 50 }),
    message: text("message"),
    status: varchar("status", { length: 50 }).default("pending"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    domainNameIdx: index("idx_domain_offers_domain_name").on(table.domainName),
    statusIdx: index("idx_domain_offers_status").on(table.status),
    createdAtIdx: index("idx_domain_offers_created_at").on(table.createdAt),
  })
);

// Типы для TypeScript
export type Domain = typeof domains.$inferSelect;
export type NewDomain = typeof domains.$inferInsert;
export type BlogPost = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type NewContactSubmission = typeof contactSubmissions.$inferInsert;
export type DomainOffer = typeof domainOffers.$inferSelect;
export type NewDomainOffer = typeof domainOffers.$inferInsert;
