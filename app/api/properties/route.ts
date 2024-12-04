import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/Connection";
import Property, { Property as PropertyType } from "@/model/property.model";
import { PropertySchema } from "@/lib/PropertyValidation";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedData = PropertySchema.parse(body);

    const fullData = {
      ...validatedData,
      images: body.images,
    };

    await dbConnect();
    const newProperty: PropertyType = await Property.create(fullData);
    return NextResponse.json(
      {
        success: true,
        message: "Property added successfully",
        data: newProperty._id,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: error.errors,
        },
        { status: 400 }
      );
    }
    console.error("Server error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const validatedData = PropertySchema.parse(body);
    console.log("validate Data :: ", validatedData);

    await dbConnect();

    await Property.findOneAndUpdate(
      { _id: body.id },
      { ...validatedData, images: body.images },
      { new: true }
    );
    return NextResponse.json(
      {
        success: true,
        message: "Property Updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: error.errors,
        },
        { status: 400 }
      );
    }
    console.error("Server error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const limit = searchParams.get("limit") || null;
  const id = searchParams.get("id") || null;
  const onlyFeatured = searchParams.get("onlyFeatured") || null;

  try {
    await dbConnect();

    if (limit !== null) {
      const properties = await Property.find({})
        .sort({ createdAt: -1 })
        .limit(parseInt(limit));
      if (properties.length === 0) {
        return NextResponse.json({
          message: "Cannot Found Properties in Database!",
          success: false,
        });
      }
      return NextResponse.json({
        message: "Fetched Successfully limit",
        success: true,
        properties,
      });
    }

    if (id) {
      console.log("ID block :: ", id);
      const property = await Property.findById(id);

      if (!property) {
        return NextResponse.json({
          message: "Cannot Found Property in Database!",
          success: false,
        });
      }
      return NextResponse.json({
        message: "Fetched Successfully by id",
        success: true,
        property,
      });
    }

    if (onlyFeatured) {
      const properties = await Property.find({ isFeatured: true }).sort({
        createdAt: -1,
      });
      if (properties.length === 0) {
        return NextResponse.json({
          message: "Cannot Found Featured Properties in Database!",
          success: false,
        });
      }
      return NextResponse.json({
        message: "Fetched Successfully ",
        success: true,
        properties,
      });
    }

    const properties = await Property.find({}).sort({ createdAt: -1 });
    if (properties.length === 0) {
      return NextResponse.json({
        message: "Cannot Found Properties in Database!",
        success: false,
      });
    }

    return NextResponse.json({
      message: "Fetched Successfully all",
      success: true,
      properties,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        message: "Network Error, try again later or refersh the page",
        success: false,
      });
    }
    return NextResponse.json({
      message: "Server Error : Something Went Wrong",
      success: false,
    });
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({
      message: "Property ID not Recived ",
      success: false,
    });
  }
  try {
    await dbConnect();
    const property = await Property.findById({ _id: id });
    if (!property) throw new Error("ID not found");
    const images = property.images;
    console.log("Images :: ", images);

    const response = await fetch(`${process.env.PUBLIC_URL}/api/upload`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ images }),
    });

    const isDeleted = await response.json();
    console.log(isDeleted);

    if (!isDeleted.success) {
      return NextResponse.json({
        message: "Error deleting images",
        success: false,
      });
    }
    await Property.deleteOne({ _id: id });
    return NextResponse.json({
      message: "Property Deleted Successfully",
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
      message: "Server Error :: Something Went Wrong",
      success: false,
    });
  }
}
