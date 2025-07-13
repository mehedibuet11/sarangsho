import { type NextRequest, NextResponse } from "next/server";
import db from "@/lib/database"; // mysql2 promise pool
import { createSlug, ensureUniqueSlug } from "@/lib/utils/slug";

export async function GET() {
  try {
    const [pages] = await db.execute(`
      SELECT * FROM custom_pages 
      ORDER BY created_at DESC
    `);

    return NextResponse.json({ pages });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch pages" },
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
      content,
      status,
      seoTitle,
      seoDescription,
    } = body;

    // Generate or validate slug
    let slug = providedSlug || createSlug(title);

    // Fetch existing slugs that start with the slug prefix
    const [rows] = await db.execute(
      "SELECT slug FROM custom_pages WHERE slug LIKE ?",
      [`${slug}%`]
    );
    const existingSlugs = (rows as any[]).map((row) => row.slug);

    slug = ensureUniqueSlug(slug, existingSlugs);

    // Insert page
    const [result] = await db.execute(
      `INSERT INTO custom_pages (title, slug, content, status, seo_title, seo_description)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [title, slug, content, status, seoTitle, seoDescription]
    );

    // Get inserted id (result.insertId)
    const insertId = (result as any).insertId;

    // Fetch the new page
    const [newPageRows] = await db.execute(
      "SELECT * FROM custom_pages WHERE id = ?",
      [insertId]
    );
    const newPage = (newPageRows as any[])[0];

    return NextResponse.json({ success: true, page: newPage });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to create page" },
      { status: 500 }
    );
  }
}
