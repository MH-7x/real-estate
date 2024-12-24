import { NextRequest, NextResponse } from "next/server";
import { ratingValidation } from "@/lib/ratingValidation";
import ratingModel from "@/model/rating.model";

import { z } from "zod";
import dbConnect from "@/lib/Connection";
export async function POST(req: NextRequest) {
  const { rating, review, UserName, property } = await req.json();

  if ([rating, review, UserName, property].some((item) => !item)) {
    return NextResponse.json({
      message: "All fields are required",
      success: false,
    });
  }

  try {
    const validateData = ratingValidation.parse({
      rating: parseInt(rating),
      review,
      UserName,
    });
    await dbConnect();
    const newRating = new ratingModel({
      ...validateData,
      property,
    });
    await newRating.save();
    return NextResponse.json({
      message: "Your Rating has been added successfully",
      success: true,
    });
  } catch (error) {
    console.log("Rating Route ERROR :: ", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({
        message: error.errors[0].message,
        success: false,
      });
    }
    return NextResponse.json({
      message: error instanceof Error ? error.message : "An error occurred",
      success: false,
    });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({
      message: "Property id is required",
      success: false,
    });
  }
  await dbConnect();
  const ratings = await ratingModel
    .find({ property: id })
    .select(" -__v -updatedAt")
    .sort({ createdAt: -1 })
    .exec();
  return NextResponse.json({
    data: ratings,
    success: true,
  });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({
      message: "Rating id is required",
      success: false,
    });
  }
  try {
    await dbConnect();
    await ratingModel.findByIdAndDelete(id);
    return NextResponse.json({
      message: "Rating has been deleted successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: error instanceof Error ? error.message : "An error occurred",
      success: false,
    });
  }
}
