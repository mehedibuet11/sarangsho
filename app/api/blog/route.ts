import { type NextRequest, NextResponse } from "next/server";
import db, { initializeDatabase } from "@/lib/database";
import { createSlug, ensureUniqueSlug } from "@/lib/utils/slug";

// Initialize database on first import
initializeDatabase();

export async function GET() {
  try {
    const [posts] = await db.execute(`
      SELECT * FROM blog_posts 
      ORDER BY created_at DESC
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      slug: providedSlug,
      excerpt,
      content,
      thumbnail,
      status,
      seoTitle,
      seoDescription,
      tags,
    } = body;

    // Generate or validate slug
    let slug = providedSlug || createSlug(title);

    // Check if slug already exists
    const [existingSlugRows] = await db.execute(
      "SELECT slug FROM blog_posts WHERE slug LIKE ?",
      [`${slug}%`]
    );
    const existingSlugs = (existingSlugRows as any[]).map((row) => row.slug);

    slug = ensureUniqueSlug(slug, existingSlugs);

    function toMysqlDateTime(date: Date) {
      return date.toISOString().slice(0, 19).replace("T", " ");
    }

    const publishedAt =
      status === "published" ? toMysqlDateTime(new Date()) : null;

    const [result] = await db.execute(
      `
      INSERT INTO blog_posts 
      (title, slug, excerpt, content, thumbnail, status, seo_title, seo_description, tags, published_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        title,
        slug,
        excerpt || "",
        content || "",
        thumbnail || "",
        status || "draft",
        seoTitle || "",
        seoDescription || "",
        tags || "",
        publishedAt,
      ]
    );

    // result.insertId contains the new inserted post ID
    const insertId = (result as any).insertId;

    const [newPostRows] = await db.execute(
      "SELECT * FROM blog_posts WHERE id = ?",
      [insertId]
    );
    const newPost = (newPostRows as any[])[0];

    return NextResponse.json({ success: true, post: newPost });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
