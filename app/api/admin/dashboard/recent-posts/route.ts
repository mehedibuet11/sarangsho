import { NextResponse } from "next/server";
import db from "@/lib/database";
export const dynamic = "force-dynamic"; 

export async function GET() {
  try {
    // Run the query and get rows
    const [rows] = await db.query(
      `
      SELECT id, title, slug, status, created_at
      FROM blog_posts
      ORDER BY created_at DESC
      LIMIT 5
    `
    );

    return NextResponse.json({ posts: rows });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch recent posts" },
      { status: 500 }
    );
  }
}
