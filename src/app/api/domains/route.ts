import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { domains } from "@/db/schema";
import { sql, desc, or, like, eq, and } from "drizzle-orm";
import { DOMAIN_CATEGORIES, DOMAIN_EXTENSIONS } from "@/lib/constants";

/**
 * GET /api/domains
 * Получение списка доменов с фильтрацией и пагинацией
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const extension = searchParams.get("extension") || "";
    const minLength = searchParams.get("minLength");
    const maxLength = searchParams.get("maxLength");
    const sortBy = searchParams.get("sortBy") || "featured";

    const offset = (page - 1) * limit;

    // Построение условий фильтрации
    const conditions = [];

    // Поиск по имени домена
    if (search) {
      conditions.push(
        or(
          like(domains.name, `%${search}%`),
          like(domains.name, `%${search.replace(/\./g, "")}%`)
        )!
      );
    }

    // Фильтр по категории
    if (category && DOMAIN_CATEGORIES.includes(category as any)) {
      conditions.push(eq(domains.category, category));
    }

    // Фильтр по расширению
    if (extension && DOMAIN_EXTENSIONS.includes(extension as any)) {
      conditions.push(eq(domains.extension, extension));
    }

    // Фильтр по длине
    if (minLength) {
      conditions.push(sql`length(${domains.name}) >= ${parseInt(minLength)}`);
    }
    if (maxLength) {
      conditions.push(sql`length(${domains.name}) <= ${parseInt(maxLength)}`);
    }

    // Сортировка
    let orderBy;
    switch (sortBy) {
      case "price_asc":
        orderBy = domains.price;
        break;
      case "price_desc":
        orderBy = desc(domains.price);
        break;
      case "length_asc":
        orderBy = sql`length(${domains.name})`;
        break;
      case "length_desc":
        orderBy = desc(sql`length(${domains.name})`);
        break;
      case "newest":
        orderBy = desc(domains.createdAt);
        break;
      case "featured":
      default:
        orderBy = desc(domains.featured);
        break;
    }

    // Получение доменов
    const domainsList = await db
      .select()
      .from(domains)
      .where(and(...conditions))
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);

    // Получение общего количества для пагинации
    const totalCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(domains)
      .where(and(...conditions))
      .then((result) => result[0]?.count || 0);

    // Добавляем SEO потенциал к каждому домену
    const domainsWithSEO = domainsList.map((domain) => ({
      ...domain,
      seoPotential: calculateSEOPotential(domain),
    }));

    return NextResponse.json({
      success: true,
      data: domainsWithSEO,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching domains:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Ошибка при получении списка доменов",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/domains
 * Создание нового домена (админка)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Валидация
    if (!body.name || !body.price || !body.category) {
      return NextResponse.json(
        {
          success: false,
          message: "Необходимо указать имя, цену и категорию домена",
        },
        { status: 400 }
      );
    }

    // Определение расширения
    const extension =
      DOMAIN_EXTENSIONS.find((ext) => body.name.endsWith(ext)) || "";

    // Создание домена
    const [newDomain] = await db
      .insert(domains)
      .values({
        name: body.name,
        price: body.price,
        category: body.category,
        extension,
        description: body.description || "",
        featured: body.featured || false,
        length: body.name.replace(/\./g, "").length,
        trafficLevel: body.trafficLevel || "Низкий",
        seoPotential: body.seoPotential || 0,
      })
      .returning();

    return NextResponse.json(
      {
        success: true,
        data: newDomain,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating domain:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Ошибка при создании домена",
      },
      { status: 500 }
    );
  }
}

/**
 * Вспомогательная функция для расчета SEO потенциала
 */
function calculateSEOPotential(domain: any): number {
  let score = 0;

  // Длина домена (чем короче, тем лучше)
  const length = domain.name.replace(/\./g, "").length;
  if (length <= 3) score += 30;
  else if (length <= 5) score += 20;
  else if (length <= 7) score += 10;

  // Расширение домена
  if (domain.extension === ".com") score += 20;
  else if (domain.extension === ".ru") score += 15;
  else if (domain.extension === ".рф" || domain.extension === ".рус")
    score += 15;

  // Категория
  if (domain.category === "Брендовые") score += 15;
  else if (domain.category === "Короткие") score += 20;

  // Трафик
  if (domain.trafficLevel === "Высокий") score += 25;
  else if (domain.trafficLevel === "Средний") score += 15;

  return Math.min(score, 100);
}
