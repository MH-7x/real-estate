import { NextResponse } from "next/server";
import Property, { Property as PropertyType } from "@/model/property.model";
import dbConnect from "@/lib/Connection";

interface QueryParams {
  search?: string;
  page?: string;
  limit?: string;
}

interface Pagination {
  total: number;
  page: number;
  totalPages: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const buildSearchFilter = (query: QueryParams): Record<string, any> => {
  if (!query.search) return {};

  const searchTokens = query.search.split(" ").map((token) => ({
    $regex: token,
    $options: "i",
  }));

  return {
    $or: [
      ...searchTokens.map((regex) => ({ "address.city": regex })),
      ...searchTokens.map((regex) => ({ "address.area": regex })),
      ...searchTokens.map((regex) => ({ PropertyName: regex })),
      ...searchTokens.map((regex) => ({ street: regex })),
      ...searchTokens.map((regex) => ({ condition: regex })),
    ],
  };
};

export async function GET(request: Request): Promise<Response> {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const query: QueryParams = Object.fromEntries(searchParams.entries());

    const page = parseInt(query.page || "1", 10);
    const limit = parseInt(query.limit || "10", 10);
    const skip = (page - 1) * limit;

    const filter = buildSearchFilter(query);

    const properties: PropertyType[] = await Property.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalCount: number = await Property.countDocuments(filter);

    const pagination: Pagination = {
      total: totalCount,
      page,
      totalPages: Math.ceil(totalCount / limit),
    };

    return NextResponse.json({
      success: true,
      data: properties,
      pagination,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching properties.",
      },
      { status: 500 }
    );
  }
}
