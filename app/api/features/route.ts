import { type NextRequest, NextResponse } from "next/server";
import pool from "@/lib/database";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface Feature extends RowDataPacket {
  id: number;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  sort_order: number;
  is_active: number;
  created_at: string;
  updated_at: string;
}

interface MaxOrderRow extends RowDataPacket {
  max_order: number | null;
}
export async function GET() {
  try {
    const [features] = await pool.query<Feature[]>(
      `SELECT * FROM app_features ORDER BY sort_order ASC, created_at DESC`
    );

    return NextResponse.json({ features });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch features" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, icon, gradient, is_active } = body;

    // Get current max sort_order
    const [[{ max_order }]] = await pool.query<MaxOrderRow[]>(
      "SELECT MAX(sort_order) AS max_order FROM app_features"
    );
    const sortOrder = (max_order ?? 0) + 1;

    // Insert new feature
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO app_features (title, description, icon, gradient, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?)`,
      [title, description, icon, gradient, sortOrder, is_active ? 1 : 0]
    );

    // Fetch the newly inserted feature
    const [[newFeature]] = await pool.query<Feature[]>(
      `SELECT * FROM app_features WHERE id = ?`,
      [result.insertId]
    );

    return NextResponse.json({ success: true, feature: newFeature });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to create feature" },
      { status: 500 }
    );
  }
}
