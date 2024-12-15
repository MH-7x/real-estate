import dbConnect from "@/lib/Connection";
import Property from "@/model/property.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");
  const purpose = searchParams.get("purpose");

  if (!city) {
    return NextResponse.json({
      message: "city parameter is required",
      success: false,
    });
  }

  try {
    await dbConnect();

    console.log("Fetching Data for City and Purpose");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: Record<string, any> = {
      "address.city": city,
    };

    if (purpose) {
      query.purpose = purpose; // Add the purpose filter if provided
    }

    // Step 2: Count the total documents for the specified filters
    const totalCount = await Property.countDocuments(query);
    console.log("Completed Counting ...");

    // If no documents are found, return an appropriate response
    if (totalCount === 0) {
      return NextResponse.json({
        success: false,
        message: `No properties found for city: ${city}${
          purpose ? ` and purpose: ${purpose}` : ""
        }`,
        totalCount,
      });
    }

    // Step 3: Perform the aggregation
    const filters = await Property.aggregate([
      {
        $match: query, // Match the city and purpose dynamically
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
