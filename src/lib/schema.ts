import { pgTable, serial, varchar, text, integer, boolean, timestamp } from 'drizzle-orm/pg-core';

export const domains = pgTable('domains', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  price: integer('price').notNull(),
  category: varchar('category', { length: 100 }),
  extension: varchar('extension', { length: 20 }),
  description: text('description'),
  registeredYear: integer('registered_year'),
  traffic: varchar('traffic', { length: 50 }),
  registrationDate: timestamp('registration_date'),
  firstRegistrationDate: timestamp('first_registration_date'),
  listedDate: timestamp('listed_date').defaultNow(),
  isActive: boolean('is_active').default(true),
});

export const blogPosts = pgTable('blog_posts', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  excerpt: text('excerpt'),
  content: text('content'),
  category: varchar('category', { length: 100 }),
  readTime: varchar('read_time', { length: 50 }),
  publishedDate: timestamp('published_date').defaultNow(),
  isPublished: boolean('is_published').default(true),
});
