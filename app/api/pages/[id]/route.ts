import { type NextRequest, NextResponse } from "next/server";
import db from "@/lib/database"; // mysql2 pool

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number.parseInt(params.id);

    const [rows] = await db.execute("SELECT * FROM custom_pages WHERE id = ?", [
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
      { error: "Failed to fetch Page" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number.parseInt(params.id);

    const [result] = await db.execute("DELETE FROM custom_pages WHERE id = ?", [
      id,
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to delete page" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, slug, content, status, seoTitle, seoDescription } = body;
    const id = Number.parseInt(params.id);

    await db.execute(
      `UPDATE custom_pages 
      SET title = ?, slug = ?, content = ?, status = ?, seo_title = ?, seo_description = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`,
      [title, slug, content, status, seoTitle, seoDescription, id]
    );

    const [rows] = await db.execute("SELECT * FROM custom_pages WHERE id = ?", [
      id,
    ]);
    const updatedPage = (rows as any[])[0];

    return NextResponse.json({ success: true, page: updatedPage });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to update page" },
      { status: 500 }
    );
  }
}
