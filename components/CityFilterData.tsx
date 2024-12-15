import { SelectComponent } from "@/app/(frontend)/sale/SelectCity";
import { headers } from "next/headers";
import React from "react";
import { MoreFilters } from "./MoreFilters";
async function CityFilterData({
  areas,
  propertyTypes,
  sizes,
  sort,
}: {
  areas?: string[];
  propertyTypes?: string[];
  sizes?: { value: number; unit: string }[];
  sort?: string[];
}) {
  const header = await headers();
  const userAgent = header.get("user-agent") || "";
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );

  if (isMobile) {
    return (
      <div className="w-[98%] mt-5 mx-auto flex items-center justify-start gap-2 bg-white shadow-lg shadow-black/5 border py-3 px-2 rounded-lg">
        <SelectComponent
          type="sort"
          data={sort && sort?.map((type) => ({ label: type, value: type }))}
        />
        <SelectComponent
          type="area"
          data={areas && areas?.map((area) => ({ label: area, value: area }))}
        />
        <MoreFilters>
          <SelectComponent
            type="type"
            data={
              propertyTypes &&
              propertyTypes?.map((type) => ({ label: type, value: type }))
            }
          />
          <SelectComponent
            type="size"
            data={
              sizes &&
              sizes?.map((type) => ({ label: type.value, value: type.unit }))
            }
          />
        </MoreFilters>
      </div>
    );
  }
  return (
    <section
      className="
    md:w-11/12 w-[98%] mx-auto bg-white shadow-lg shadow-black/5 border rounded-lg p-5 mt-10"
    >
      <div className="flex items-center justify-evenly gap-3">
        <SelectComponent
          type="area"
          data={areas && areas?.map((area) => ({ label: area, value: area }))}
        />
        <SelectComponent
          type="type"
          data={
            propertyTypes &&
            propertyTypes?.map((type) => ({ label: type, value: type }))
          }
        />
        <SelectComponent
          type="size"
          data={
            sizes &&
            sizes?.map((type) => ({ label: type.value, value: type.unit }))
          }
        />
        <SelectComponent
          type="sort"
          data={sort && sort?.map((type) => ({ label: type, value: type }))}
        />
      </div>
    </section>
  );
}

export default CityFilterData;
