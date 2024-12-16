import ContactForm from "@/components/ContactForm";
import { DataPagination } from "@/components/DataPagination";
import GridCard from "@/components/GridCard";

import IslamabadRentPageContent from "@/components/IslamabadRentPageContent";
import RefreshButton from "@/components/RefreshButton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SinResProperty } from "@/types/property";

import Image from "next/image";
import React from "react";

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
  area?: string;
  propertyType?: string;
  sizeValue?: string;
  sizeUnit?: string;
  sort?: "lowToHigh" | "highToLow";
  isFeatured?: boolean;
}

async function getProperties(
  page: number,
  limit: number,
  city: string,
  purpose: string,
  filters: Filters = {}
): Promise<Main> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      city: city.toString(),
      purpose: purpose.toString(),
      ...Object.fromEntries(
        Object.entries(filters)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .filter(([_, value]) => value !== undefined)
          .map(([key, value]) => [key, value.toString()])
      ),
    });

    const res = await fetch(
      `${process.env.PUBLIC_URL || ""}/api/get-data?${params.toString()}`
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

async function page({
  searchParams,
}: {
  searchParams: Promise<{
    page: string;
    limit: string;
    city: string;
    purpose: string;
    area: string;
    sizeValue: string;
    sizeUnit: string;
    propertyType: string;
    sort: string;
  }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const limit = parseInt(params.limit || "5", 10);
  const city = params.city || "islamabad";
  const purpose = params.purpose || "for rent";
  const filters: Filters = {
    area: params.area,
    propertyType: params.propertyType,
    sizeValue: params.sizeValue,
    sizeUnit: params.sizeUnit,
    sort: params.sort as Filters["sort"],
  };

  const response: Main = await getProperties(
    page,
    limit,
    city,
    purpose,
    filters
  );
  return (
    <>
      <section className="mt-16 md:px-5 px-3 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-8">
        <div className="lg:col-span-5 col-span-3">
          {!response.success ? (
            <div className="min-h-[300px] bg-red-100">
              <h3 className="text-2xl font-bold text-red-500">
                No Properties Found
              </h3>
            </div>
          ) : response.data.length > 0 ? (
            response.data.map((property) => (
              <GridCard key={property._id} property={property} />
            ))
          ) : (
            <div className="col-span-3 mt-5  bg-secondary flex items-center justify-center flex-col rounded-lg min-h-96">
              <Image
                src={"/nodata.svg"}
                width={200}
                height={200}
                alt="no data found"
              />
              <h3 className="my-3">No Data Found For This Filter</h3>
              <RefreshButton />
            </div>
          )}
        </div>
        <div className=" col-span-3 border border-primary/10 mt-3 rounded-lg px-3 py-8">
          <div className="grid grid-cols-2 gap-4">
            <Button size={"lg"} className="flex items-center md:gap-3 gap-1">
              <Image
                src={"/images/whatsapp.svg"}
                alt="whatsapp"
                width={20}
                height={20}
              />
              <p className="text-primary-foreground">WhatsApp</p>
            </Button>
            <Button
              variant={"outline"}
              size={"lg"}
              className="flex items-center md:gap-3 gap-1"
            >
              <Image
                src={"/images/phone-call.svg"}
                alt="phone call"
                width={25}
                height={25}
              />
              <p>Call</p>
            </Button>
          </div>
          <Separator className="my-8" />

          <ContactForm />
          <Separator className="my-8" />
          <div className="grid grid-cols-1 gap-y-2 mt-8">
            <h3 className="font-semibold text-center my-2 text-muted-foreground">
              Stay Connected With Us
            </h3>
            <Button
              variant={"ghost"}
              className="flex justify-start items-center gap-3"
            >
              <Image
                src={"/images/facebook.svg"}
                width={32}
                height={32}
                quality={100}
                alt="facebook page"
              />
              <p className="text-[17px]">facebook.com/brighthome</p>
            </Button>
            <Button
              variant={"ghost"}
              className="flex justify-start items-center gap-3"
            >
              <Image
                src={"/images/tiktok.svg"}
                width={32}
                height={32}
                quality={100}
                alt="tiktok account"
              />
              <p className="text-[17px]">tiktok.com/@brighthome</p>
            </Button>
          </div>
        </div>
      </section>

      {response && response.totalPages > 1 && (
        <div className="min-h-16  mt-5">
          <DataPagination
            data={{
              limit: response.limit,
              page: response.page,
              totalPages: response.totalPages,
            }}
          />
        </div>
      )}
      <IslamabadRentPageContent />
    </>
  );
}

export default page;
