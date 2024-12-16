import dbConnect from "@/lib/Connection";
import Property from "@/model/property.model";
import { Unit } from "@/types/property";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(request.url);

  // Pagination parameters
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "2");

  // Filter parameters
  const city = searchParams.get("city");
  const area = searchParams.get("area");
  const purpose = searchParams.get("purpose");
  const condition = searchParams.get("condition");
  const propertyType = searchParams.get("propertyType");
  const bedrooms = parseInt(searchParams.get("bedrooms") || "0");
  const isFeatured = searchParams.get("isFeatured") === "true";
  const sortOption = searchParams.get("sort");
  const sizeValue = parseInt(searchParams.get("sizeValue") || "0");
  const sizeUnit = searchParams.get("sizeUnit") as Unit;
  // Build the query object based on filters
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: any = {};

  if (city) query["address.city"] = city;
  if (area) query["address.area"] = area;
  if (sizeValue && sizeUnit) query.size = { value: sizeValue, unit: sizeUnit };
  if (purpose) query.purpose = purpose;
  if (condition) query.condition = condition;
  if (propertyType) query.propertyType = propertyType;
  if (bedrooms) query.bedrooms = { $gte: bedrooms };
  if (isFeatured) query.isFeatured = true;
  // Determine sorting order
  const sort: Record<string, 1 | -1> = {};

  if (sortOption === "lowToHigh") {
    sort["price"] = 1;
  } else if (sortOption === "highToLow") {
    sort["price"] = -1;
  } else {
    sort["createdAt"] = -1;
  }

  try {
    const total = await Property.countDocuments(query);
    const properties = await Property.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sort);

    return NextResponse.json({
      success: true,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: properties,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}

// Get filters data
export async function POST() {
  try {
    await dbConnect();
    const result = await Property.aggregate([
      {
        $group: {
          _id: null,
          uniqueValues: {
            $addToSet: {
              city: "$address.city",
              area: "$address.area",
              condition: "$condition",
              size: "$size",
            },
          },
        },
      },
      {
        $unwind: "$uniqueValues",
      },
      {
        $group: {
          _id: null,
          cities: { $addToSet: "$uniqueValues.city" },
          areas: { $addToSet: "$uniqueValues.area" },
          conditions: { $addToSet: "$uniqueValues.condition" },
          sizes: { $addToSet: "$uniqueValues.size" },
        },
      },
      {
        $project: {
          _id: 0,
          cities: 1,
          areas: 1,
          conditions: 1,
          sizes: 1,
        },
      },
    ]);
    if (result.length === 0) throw new Error("No Data Found");
    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        success: false,
        message: error.message,
      });
    }
    return NextResponse.json({
      success: false,
      message: "Server Error: Something Went Wrong",
    });
  }
}
