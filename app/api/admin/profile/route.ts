import { type NextRequest, NextResponse } from "next/server";
import db, { initializeDatabase } from "@/lib/database";
import type { RowDataPacket } from "mysql2";

await initializeDatabase();

type AdminUser = RowDataPacket & {
  username: string;
  email: string;
  last_login: string;
};

export async function GET() {
  try {
    // Cast rows to AdminUser[]
    const [rows] = await db.query<AdminUser[]>(
      "SELECT username, email, last_login FROM admin_users WHERE username = ?",
      ["admin"]
    );

    const user = rows[0];

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      profile: {
        username: user.username,
        email: user.email,
        lastLogin: user.last_login,
      },
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, email } = body;

    if (!username || !email) {
      return NextResponse.json(
        { error: "Username and email are required" },
        { status: 400 }
      );
    }

    const [result] = await db.execute(
      `UPDATE admin_users SET username = ?, email = ? WHERE username = 'admin'`,
      [username, email]
    );

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
