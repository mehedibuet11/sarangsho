import { NextRequest, NextResponse } from "next/server";
import db, { initializeDatabase } from "@/lib/database";
import bcrypt from "bcryptjs";
import { RowDataPacket } from "mysql2";

await initializeDatabase();

interface AdminUser extends RowDataPacket {
  id: number;
  username: string;
  email: string;
  password_hash: string;
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    const [rows] = await db.query<AdminUser[]>(
      "SELECT * FROM admin_users WHERE username = ?",
      [username]
    );

    if (!rows.length) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    const admin = rows[0];

    const isValid = bcrypt.compareSync(password, admin.password_hash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      token: "demo_token", // replace this later
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
