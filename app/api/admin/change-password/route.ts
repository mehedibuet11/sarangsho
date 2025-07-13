import { type NextRequest, NextResponse } from "next/server";
import db, { initializeDatabase } from "@/lib/database";
import bcrypt from "bcryptjs";
import type { RowDataPacket } from "mysql2";

initializeDatabase();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Current password and new password are required" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "New password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Cast the query result to RowDataPacket[]
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT password_hash FROM admin_users WHERE username = ?",
      ["admin"]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Access the first row with the password_hash
    const user = rows[0] as { password_hash: string };

    const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 400 }
      );
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    await db.query(
      "UPDATE admin_users SET password_hash = ? WHERE username = ?",
      [newPasswordHash, "admin"]
    );

    return NextResponse.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to change password" },
      { status: 500 }
    );
  }
}
