import dbConnect from "@/lib/Connection";
import Property from "@/model/property.model";
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
  const propertyType = searchParams.get("propertyType");
  const minPrice = parseInt(searchParams.get("minPrice") || "0");
  const maxPrice = parseInt(searchParams.get("maxPrice") || "1000000000");
  const bedrooms = parseInt(searchParams.get("bedrooms") || "0");
  const bathrooms = parseInt(searchParams.get("bathrooms") || "0");
  const isFeatured = searchParams.get("isFeatured") === "true";

  // Build the query object based on filters
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: any = {};

  if (city) query["address.city"] = city;
  if (area) query["address.area"] = area;
  if (propertyType) query.propertyType = propertyType;
  if (bedrooms) query.bedrooms = { $gte: bedrooms };
  if (bathrooms) query.bathrooms = { $gte: bathrooms };
  if (isFeatured) query.isFeatured = true;
  query.price = { $gte: minPrice, $lte: maxPrice };

  try {
    const total = await Property.countDocuments(query); // Total matching documents
    const properties = await Property.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 }); // Sort by latest created

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

//get filters data
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
          conditions: { $addToSet: "$uniqueValues.condition" },
          sizes: { $addToSet: "$uniqueValues.size" },
        },
      },
      {
        $project: {
          _id: 0,
          cities: 1,
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
      message: "Server Error : Something Went Wrong",
    });
  }
}
