import dbConnect from "@/lib/Connection";

import adminModel from "@/model/admin.model";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const admins = await adminModel.find({}).sort({ createdAt: -1 });
    if (admins.length <= 0) {
      return NextResponse.json({
        message: "No Admins in database",
        success: false,
      });
    }

    return NextResponse.json({
      message: "Fetched Successfully",
      success: true,

      admins,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        message: error.message,
        success: false,
      });
    }
    return NextResponse.json({
      message: "Server Error : Something Went Wrong",
      success: false,
    });
  }
}
