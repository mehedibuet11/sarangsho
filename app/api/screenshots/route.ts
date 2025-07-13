import { type NextRequest, NextResponse } from "next/server";
import db from "@/lib/database"; // mysql2 promise pool

export async function GET() {
  try {
    const [screenshots] = await db.execute(`
      SELECT * FROM screenshots 
      ORDER BY sort_order ASC, created_at DESC
    `);
    // screenshots is of type RowDataPacket[], cast if needed
    return NextResponse.json({ screenshots });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch screenshots" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, image_url } = body;

    // Get max sort_order
    const [maxOrderRows] = await db.execute(
      "SELECT MAX(sort_order) as max_order FROM screenshots"
    );
    const maxOrder = (maxOrderRows as any[])[0]?.max_order || 0;
    const sortOrder = maxOrder + 1;

    // Insert new screenshot
    const [result] = await db.execute(
      `
      INSERT INTO screenshots (title, description, image_url, sort_order)
      VALUES (?, ?, ?, ?)
      `,
      [title, description, image_url, sortOrder]
    );

    // result is OkPacket, get insertedId
    const insertId = (result as any).insertId;

    // Fetch the newly inserted row
    const [rows] = await db.execute("SELECT * FROM screenshots WHERE id = ?", [
      insertId,
    ]);
    const newScreenshot = (rows as any[])[0];

    return NextResponse.json({ success: true, screenshot: newScreenshot });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to create screenshot" },
      { status: 500 }
    );
  }
}
