import { DataPagination } from "@/components/DataPagination";
import GridCard from "@/components/GridCard";
import { SinResProperty } from "@/types/property";
import React from "react";

export const dynamic = "force-dynamic";

export interface Main {
  success: boolean;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: SinResProperty[];
}

// Function to fetch properties
async function getProperties(page: number, limit: number) {
  try {
    const res = await fetch(
      `${
        process.env.PUBLIC_URL || ""
      }/api/get-data?page=${page}&limit=${limit}`,
      {
        cache: "no-store", // Avoid caching to ensure fresh data
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch properties: ${res.statusText}`);
    }
    return res.json();
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
  searchParams: Promise<{ page?: string; limit?: string }>;
}) {
  const page = parseInt((await searchParams).page || "1");
  const limit = parseInt((await searchParams).limit || "5");

  const response: Main = await getProperties(page, limit);

  return (
    <div>
      {response.success ? (
        <>
          {response.data.map((property) => (
            <GridCard key={property._id} property={property} />
          ))}
          <DataPagination
            data={{
              page: response.page,
              limit: response.limit,
              totalPages: response.totalPages,
            }}
          />
        </>
      ) : (
        <h3>Failed to load properties. Please try again later.</h3>
      )}
    </div>
  );
}

export default page;
