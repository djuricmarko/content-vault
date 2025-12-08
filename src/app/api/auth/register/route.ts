import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email: string | undefined = body?.email?.toString();
    const password: string | undefined = body?.password?.toString();
    const name: string | undefined = body?.name?.toString();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json({ error: "Invalid email." }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
    }

    const [existing] = await db.select().from(users).where(eq(users.email, normalizedEmail));
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const inserted = await db.insert(users).values({
      email: normalizedEmail,
      name: name || null,
      passwordHash,
    }).returning({ id: users.id, email: users.email, name: users.name });

    return NextResponse.json({ user: inserted[0] }, { status: 201 });
  } catch (err) {
    console.error("Register error", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
