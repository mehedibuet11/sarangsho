import { type NextRequest, NextResponse } from "next/server";
import db from "@/lib/database"; // mysql2 promise pool

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, description, image_url } = body;
    const id = Number.parseInt(params.id);

    await db.execute(
      `
      UPDATE screenshots 
      SET title = ?, description = ?, image_url = ?
      WHERE id = ?
    `,
      [title, description, image_url, id]
    );

    const [rows] = await db.execute("SELECT * FROM screenshots WHERE id = ?", [
      id,
    ]);
    const updatedScreenshot = (rows as any[])[0];

    return NextResponse.json({ success: true, screenshot: updatedScreenshot });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to update screenshot" },
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

    await db.execute("DELETE FROM screenshots WHERE id = ?", [id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to delete screenshot" },
      { status: 500 }
    );
  }
}
