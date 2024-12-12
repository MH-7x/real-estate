import dbConnect from "@/lib/Connection";
import Property from "@/model/property.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");

  if (!city) {
    return NextResponse.json({
      message: "city parameter is required",
      success: false,
    });
  }

  try {
    await dbConnect();

    console.log("Comes To Get City Data");

    // Step 1: Count the total documents for the specified city
    const totalCount = await Property.countDocuments({ "address.city": city });
    console.log("Completed Counting ...");
    // If no documents are found, return an appropriate response
    if (totalCount === 0) {
      return NextResponse.json({
        success: false,
        message: `No properties found for city: ${city}`,
        totalCount,
      });
    }

    // Step 2: Perform the aggregation
    const filters = await Property.aggregate([
      {
        $match: {
          "address.city": city,
        },
      },
      {
        $group: {
          _id: null,
          uniqueAreas: { $addToSet: "$address.area" },
          uniquePropertyTypes: { $addToSet: "$propertyType" },
          uniqueSizes: { $addToSet: "$size" },
        },
      },
      {
        $project: {
          _id: 0, // Exclude the _id field from the results
          uniqueAreas: 1,
          uniquePropertyTypes: 1,
          uniqueSizes: 1,
        },
      },
    ]);
    console.log("Completed Filtering ...");
    return NextResponse.json({
      message: "Fetched data successfully",
      success: true,
      totalCount,
      data: filters[0],
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({
      success: false,
      message: "An error occurred while fetching property data.",
    });
  }
}
