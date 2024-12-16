import { DataPagination } from "@/components/DataPagination";
import GridCard from "@/components/GridCard";
import GridLoader from "@/components/GridLoader";
import { SinResProperty } from "@/types/property";
import Image from "next/image";
import React, { Suspense } from "react";

export const dynamic = "force-dynamic";

export interface Main {
  success: boolean;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: SinResProperty[];
}

// Filter Interface
interface Filters {
  city?: string;
  area?: string;
  purpose?: string;
  condition?: string;
  propertyType?: string;
  sizeValue?: string;
  sizeUnit?: string;
  sort?: "lowToHigh" | "highToLow";
  bedrooms?: number;
  isFeatured?: boolean;
}

async function getProperties(
  page: number,
  limit: number,
  filters: Filters = {}
): Promise<Main> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...Object.fromEntries(
        Object.entries(filters)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .filter(([_, value]) => value !== undefined) // Filter undefined entries
          .map(([key, value]) => [key, value.toString()])
      ),
    });

    const res = await fetch(
      `${process.env.PUBLIC_URL || ""}/api/get-data?${params.toString()}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch properties: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching properties:", error);
    return {
      success: false,
      data: [],
      total: 0,
      page,
      limit,
      totalPages: 1,
    };
  }
}

// Page Component
async function page({
  searchParams,
}: {
  searchParams: Promise<{
    page: string;
    limit: string;
    city: string;
    area: string;
    purpose: string;
    condition: string;
    sizeValue: string;
    sizeUnit: string;
    propertyType: string;
    sort: string;
    bedrooms: string;

    isFeatured: string;
  }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const limit = parseInt(params.limit || "5", 10);

  const filters: Filters = {
    city: params.city,
    area: params.area,
    purpose: params.purpose,
    condition: params.condition,
    propertyType: params.propertyType,
    sizeValue: params.sizeValue,
    sizeUnit: params.sizeUnit,
    sort: params.sort as Filters["sort"],
    bedrooms: params.bedrooms ? parseInt(params.bedrooms, 10) : undefined,

    isFeatured: params.isFeatured ? params.isFeatured === "true" : undefined,
  };
  console.log("area :: ", filters.area);

  const response: Main = await getProperties(page, limit, filters);

  return (
    <Suspense fallback={<GridLoader />}>
      <div>
        {response.success ? (
          <>
            {response.data.length > 0 ? (
              response.data.map((property) => (
                <GridCard key={property._id} property={property} />
              ))
            ) : (
              <div className="flex justify-center items-center rounded-2xl bg-secondary/50 w-full  min-h-96 flex-col">
                <Image
                  src={"/nodata.svg"}
                  alt="no data"
                  width={200}
                  height={200}
                />
                <h3 className="text-center">No properties found.</h3>
              </div>
            )}
            {response.totalPages > 1 && (
              <DataPagination
                data={{
                  page: response.page,
                  limit: response.limit,
                  totalPages: response.totalPages,
                }}
              />
            )}
          </>
        ) : (
          <h3>Failed to load properties. Please try again later.</h3>
        )}
      </div>
    </Suspense>
  );
}

export default page;
