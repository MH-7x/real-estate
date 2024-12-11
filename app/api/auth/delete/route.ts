import dbConnect from "@/lib/Connection";
import adminModel from "@/model/admin.model";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({
      message: "Admin ID not Recived ",
      success: false,
    });
  }
  try {
    await dbConnect();
    await adminModel.deleteOne({ _id: id });
    return NextResponse.json({
      message: "Admin Deleted Successfully",
      success: true,
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
export async function GET() {
  const response = NextResponse.redirect(`${process.env.PUBLIC_URL}/login`);

  response.cookies.set("token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  return response;
}
