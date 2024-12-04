// app/api/auth/signup.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Admin from "@/model/admin.model";
import dbConnect from "@/lib/Connection";


export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    await dbConnect()

    const AleradyExist = await Admin.findOne({ email });
    if (AleradyExist) {
      return NextResponse.json({ success: false, message: "Admin already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    await admin.save();
    return NextResponse.json({ success: true, message: "Admin created successfully" });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error creating admin" });
  }
}
