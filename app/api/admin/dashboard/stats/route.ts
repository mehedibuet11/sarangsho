import { NextResponse } from "next/server";
import db from "@/lib/database";
export const dynamic = "force-dynamic"; 
import { RowDataPacket } from "mysql2";

interface CountRow extends RowDataPacket {
  count: number;
}

export async function GET() {
  try {
    const [totalPostRows] = await db.query<CountRow[]>(
      "SELECT COUNT(*) AS count FROM blog_posts"
    );
    const totalPosts = totalPostRows[0]?.count || 0;

    const [publishedPostRows] = await db.query<CountRow[]>(
      "SELECT COUNT(*) AS count FROM blog_posts WHERE status = 'published'"
    );
    const publishedPosts = publishedPostRows[0]?.count || 0;

    const [draftPostRows] = await db.query<CountRow[]>(
      "SELECT COUNT(*) AS count FROM blog_posts WHERE status = 'draft'"
    );
    const draftPosts = draftPostRows[0]?.count || 0;

    const [screenshotRows] = await db.query<CountRow[]>(
      "SELECT COUNT(*) AS count FROM screenshots"
    );
    const totalScreenshots = screenshotRows[0]?.count || 0;

    const [pageRows] = await db.query<CountRow[]>(
      "SELECT COUNT(*) AS count FROM custom_pages"
    );
    const totalPages = pageRows[0]?.count || 0;

    const [featureRows] = await db.query<CountRow[]>(
      "SELECT COUNT(*) AS count FROM app_features"
    );
    const totalFeatures = featureRows[0]?.count || 0;

    const stats = {
      totalPosts,
      publishedPosts,
      draftPosts,
      totalScreenshots,
      totalPages,
      totalFeatures,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}
