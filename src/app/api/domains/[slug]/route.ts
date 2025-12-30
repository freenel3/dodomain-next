import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { domains } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * GET /api/domains/[slug]
 * Получение домена по slug (имени)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const domain = await db
      .select()
      .from(domains)
      .where(eq(domains.name, slug))
      .limit(1);

    if (!domain || domain.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Домен не найден",
        },
        { status: 404 }
      );
    }

    // Добавляем SEO потенциал
    const domainWithSEO = {
      ...domain[0],
      seoPotential: calculateSEOPotential(domain[0]),
    };

    return NextResponse.json({
      success: true,
      data: domainWithSEO,
    });
  } catch (error) {
    console.error("Error fetching domain:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Ошибка при получении домена",
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
