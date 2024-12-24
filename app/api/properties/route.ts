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
    const slug = fullData.PropertyName.trim()
      .toLowerCase()
      .split(" ")
      .join("-");

    await dbConnect();
    const newProperty: PropertyType = await Property.create({
      ...fullData,
      slug: slug,
    });
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
    const slug = validatedData.PropertyName.trim()
      .toLowerCase()
      .split(" ")
      .join("-");
    await dbConnect();

    await Property.findOneAndUpdate(
      { _id: body.id },
      { ...validatedData, images: body.images, slug: slug },
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

  const limit = searchParams.get("limit");
  const id = searchParams.get("id");
  const onlyFeatured = searchParams.get("onlyFeatured");
  const slug = searchParams.get("slug");

  try {
    await dbConnect();

    if (limit) {
      const properties = await Property.find({})
        .sort({ createdAt: -1 })
        .limit(parseInt(limit, 10));
      return NextResponse.json({
        message: properties.length
          ? "Fetched properties successfully"
          : "No properties found",
        success: properties.length > 0,
        properties,
      });
    }

    if (id) {
      const property = await Property.findById(id);
      return NextResponse.json({
        message: property
          ? "Fetched property successfully"
          : "Property not found",
        success: !!property,
        property,
      });
    }

    if (onlyFeatured) {
      const properties = await Property.find({ isFeatured: true })
        .sort({ createdAt: -1 })
        .limit(5);
      return NextResponse.json({
        message: properties.length
          ? "Fetched featured properties successfully"
          : "No featured properties found",
        success: properties.length > 0,
        properties,
      });
    }

    if (slug) {
      const property = await Property.findOne({ slug });
      return NextResponse.json({
        message: property
          ? "Fetched property details successfully"
          : "Property not found",
        success: !!property,
        property,
      });
    }

    const properties = await Property.find({}).sort({ createdAt: -1 });
    return NextResponse.json({
      message: properties.length
        ? "Fetched all properties successfully"
        : "No properties found",
      success: properties.length > 0,
      properties,
    });
  } catch (error) {
    console.error("Properties Route ERROR:", error);
    return NextResponse.json({
      message: "Server error: Something went wrong",
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
