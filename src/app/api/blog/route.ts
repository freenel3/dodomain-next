import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { desc, or, like, eq, and } from "drizzle-orm";
import { BLOG_CATEGORIES } from "@/lib/constants";

/**
 * GET /api/blog
 * Получение списка статей блога с фильтрацией и пагинацией
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const sortBy = searchParams.get("sortBy") || "newest";

    const offset = (page - 1) * limit;

    // Построение условий фильтрации
    const conditions = [eq(blogPosts.isPublished, true)];

    // Поиск по заголовку и содержимому
    if (search) {
      conditions.push(
        or(
          like(blogPosts.title, `%${search}%`),
          like(blogPosts.content, `%${search}%`),
          like(blogPosts.excerpt, `%${search}%`)
        )!
      );
    }

    // Фильтр по категории
    if (category && BLOG_CATEGORIES.includes(category as any)) {
      conditions.push(eq(blogPosts.category, category));
    }

    // Сортировка
    let orderBy;
    switch (sortBy) {
      case "oldest":
        orderBy = blogPosts.publishedDate;
        break;
      case "newest":
      default:
        orderBy = desc(blogPosts.publishedDate);
        break;
    }

    // Получение статей
    const posts = await db
      .select()
      .from(blogPosts)
      .where(and(...conditions))
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);

    // Получение общего количества для пагинации
    const totalCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(blogPosts)
      .where(and(...conditions))
      .then((result) => result[0]?.count || 0);

    return NextResponse.json({
      success: true,
      data: posts,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Ошибка при получении списка статей",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/blog
 * Создание новой статьи блога (админка)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Валидация
    if (!body.title || !body.content || !body.slug) {
      return NextResponse.json(
        {
          success: false,
          message: "Необходимо указать заголовок, контент и slug статьи",
        },
        { status: 400 }
      );
    }

    // Создание статьи
    const [newPost] = await db
      .insert(blogPosts)
      .values({
        slug: body.slug,
        title: body.title,
        excerpt: body.excerpt || "",
        content: body.content,
        category: body.category || "Руководство",
        readTime: body.readTime || "5 мин",
        featuredImage: body.featuredImage || "",
        isPublished: body.isPublished ?? true,
        metaTitle: body.metaTitle || body.title,
        metaDescription: body.metaDescription || body.excerpt || "",
      })
      .returning();

    return NextResponse.json(
      {
        success: true,
        data: newPost,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Ошибка при создании статьи",
      },
      { status: 500 }
    );
  }
}
