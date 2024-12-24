import { GetPropertyData, getSimilarProperties } from "@/actions/FetchData";
import SimilarProperties from "@/components/SimilarProperties";
import { SinResProperty } from "@/types/property";
import React from "react";

async function SimilarPropertiesPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const name = (await params).name;
  let property: SinResProperty | null = null;
  let similarProperties: SinResProperty[] = [];
  property = await GetPropertyData(name);
  if (property) {
    similarProperties = await getSimilarProperties(property?.address.city);
    return (
      <SimilarProperties
        properties={similarProperties}
        city={property?.address.city}
      />
    );
  }
  return <div>Similar Properties not found</div>;
}

export default SimilarPropertiesPage;
