import extractPublicIdFromUrl from "@/lib/ExtractPublicID";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { paramsToSign } = body;

    if (!process.env.CLOUDINARY_API_SECRET) {
      throw new Error("Cloudinary API Secret is missing.");
    }

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET
    );

    return new Response(JSON.stringify({ signature }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { images } = await req.json();
    console.log("comes here");

    const publicIDs = extractPublicIdFromUrl(images);
    console.log("public_id", publicIDs);

    if (publicIDs.length === 0) {
      console.error("Invalid image URL:", publicIDs);
      return NextResponse.json({
        success: false,
        message: "Invalid image URL",
      });
    }

    // Use the promise-based API instead of a callback
    const result = await cloudinary.api.delete_resources(publicIDs, {
      type: "upload",
      resource_type: "image",
    });

    console.log("Image deleted:", result.message);

    return NextResponse.json({
      success: true,
      message: "All images deleted",
    });
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json({
      success: false,
      message: "Unexpected error occurred",
    });
  }
}
