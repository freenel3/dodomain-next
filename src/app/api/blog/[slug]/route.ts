import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * GET /api/blog/[slug]
 * Получение статьи блога по slug
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const post = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);

    if (!post || post.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Статья не найдена",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: post[0],
    });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Ошибка при получении статьи",
      },
      { status: 500 }
    );
  }
}
