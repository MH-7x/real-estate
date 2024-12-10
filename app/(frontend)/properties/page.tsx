import { DataPagination } from "@/components/DataPagination";
import GridCard from "@/components/GridCard";
import { SinResProperty } from "@/types/property";
import React from "react";

export interface Main {
  success: boolean;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: SinResProperty[];
}

let errors = "";
async function getProperties(page: number, limit: number) {
  errors = "";
  const res = await fetch(
    `${process.env.PUBLIC_URL}/api/get-data?page=${page}&limit=${limit}`,
    {
      cache: "no-store", // Prevent caching for fresh data
    }
  );

  if (!res.ok) {
    errors = "Failed to get properties" + res.statusText;
  }
  return res.json();
}
async function page({
  searchParams,
}: {
  searchParams: Promise<{ page: string; limit: string }>;
}) {
  const page = parseInt((await searchParams).page || "1");
  const limit = parseInt((await searchParams).limit || "5");

  const response: Main = await getProperties(page, limit);

  //
  return (
    <>
      {response.success ? (
        response.data.map((property) => (
          <GridCard key={property._id} property={property} />
        ))
      ) : (
        <h3>{errors}</h3>
      )}

      <DataPagination
        data={{
          page: response.page,
          limit: response.limit,
          totalPages: response.totalPages,
        }}
      />
    </>
  );
}

export default page;
