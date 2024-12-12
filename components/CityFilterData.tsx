import { SelectComponent } from "@/app/(frontend)/sale/SelectCity";
import React from "react";
function CityFilterData({
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
