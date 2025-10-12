import { NextRequest, NextResponse } from "next/server";
import db, { initializeDatabase } from "@/lib/database";
import bcrypt from "bcryptjs";
import { RowDataPacket } from "mysql2";
import jwt from "jsonwebtoken";

await initializeDatabase();

interface AdminUser extends RowDataPacket {
  id: number;
  username: string;
  email: string;
  password_hash: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "supersecret"; // set in .env

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

    // ✅ Generate JWT token
    const token = jwt.sign(
      { id: admin.id, username: admin.username, email: admin.email },
      JWT_SECRET,
      { expiresIn: "7d" } // token valid for 7 days
    );

    // ✅ Set cookie
    const response = NextResponse.json({
      success: true,
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
      },
    });

    // Set secure cookie
    response.cookies.set("admin_token", token, {
      httpOnly: true, // not accessible via JS
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: "/", 
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
