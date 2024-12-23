// app/api/auth/login.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Admin from "@/model/admin.model";
import dbConnect from "@/lib/Connection";
import adminModel from "@/model/admin.model";
import { generateToken } from "@/lib/jwt";
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    console.log("email", email);
    console.log("password", password);

    await dbConnect();

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return NextResponse.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken({ email });
    const response = NextResponse.json(
      { message: "Login successful", token, success: true },
      { status: 200 }
    );
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log("error", error);

    return NextResponse.json({ success: false, message: "Error logging in" });
  }
}

export async function PUT(req: NextRequest) {
  const { name, email, password, id } = await req.json();

  if (name === "" || email === "") {
    return NextResponse.json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  try {
    const user = await adminModel.findById(id);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }
    const hasedPassword =
      password === "" ? user.password : await bcrypt.hash(password, 10);

    const updatedUser = await adminModel.findByIdAndUpdate(
      id,
      { name, email, password: hasedPassword },
      { new: true }
    );
    if (!updatedUser) {
      return NextResponse.json({
        success: false,
        message: "Error updating user",
      });
    }
    return NextResponse.json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: error.message });
    }
    return NextResponse.json({
      success: false,
      message: "Error updating user",
    });
  }
}
