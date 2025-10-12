import { NextResponse } from "next/server";
import db from "@/lib/database";

export const dynamic = "force-dynamic"; 

export async function GET() {
  try {
    const [posts] = await db.query(`
      SELECT id, title, slug, excerpt, thumbnail, published_at
      FROM blog_posts
      WHERE status = 'published' AND published_at IS NOT NULL
      ORDER BY published_at DESC
      LIMIT 10
    `);

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
