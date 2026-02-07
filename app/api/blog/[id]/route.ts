import { type NextRequest, NextResponse } from "next/server";
import db from "@/lib/database"; // mysql2 promise pool
import { createSlug, ensureUniqueSlug } from "@/lib/utils/slug";

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const id = Number.parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const [rows] = await db.execute("SELECT * FROM blog_posts WHERE id = ?", [
      id,
    ]);
    const post = (rows as any[])[0];

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const id = Number.parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

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

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    // Check if post exists
    const [existingRows] = await db.execute(
      "SELECT * FROM blog_posts WHERE id = ?",
      [id]
    );
    const existingPost = (existingRows as any[])[0];
    if (!existingPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Generate or validate slug
    let slug =
      providedSlug && providedSlug.trim() !== ""
        ? providedSlug
        : createSlug(title);

    // Check if slug already exists (excluding current post)
    const [slugRows] = await db.execute(
      "SELECT slug FROM blog_posts WHERE slug LIKE ? AND id != ?",
      [`${slug}%`, id]
    );
    const existingSlugs = (slugRows as any[]).map((row) => row.slug);

    slug = ensureUniqueSlug(slug, existingSlugs);

    function toMysqlDateTime(date: Date) {
      return date.toISOString().slice(0, 19).replace("T", " ");
    }

    const publishedAt =
      status === "published" && existingPost.status !== "published"
         ? toMysqlDateTime(new Date()) : existingPost.published_at;


    await db.execute(
      `UPDATE blog_posts 
       SET title = ?, slug = ?, excerpt = ?, content = ?, thumbnail = ?, status = ?, 
           seo_title = ?, seo_description = ?, tags = ?, published_at = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
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
        id,
      ]
    );

    const [updatedRows] = await db.execute(
      "SELECT * FROM blog_posts WHERE id = ?",
      [id]
    );
    const updatedPost = (updatedRows as any[])[0];

    return NextResponse.json({ success: true, post: updatedPost });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const id = Number.parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    // Check if post exists
    const [existingRows] = await db.execute(
      "SELECT * FROM blog_posts WHERE id = ?",
      [id]
    );
    const existingPost = (existingRows as any[])[0];
    if (!existingPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    await db.execute("DELETE FROM blog_posts WHERE id = ?", [id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
