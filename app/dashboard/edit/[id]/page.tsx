import { SinResProperty } from "@/types/property";
import dynamic from "next/dynamic";
import React from "react";

let errors = "";
const getData = async (id: string) => {
  errors = "";
  try {
    const response = await fetch(
      `${process.env.PUBLIC_URL}/api/properties?id=${id}`
    );

    if (!response.ok) throw new Error(response.statusText);
    const data: {
      message: string;
      success: boolean;
      property: SinResProperty;
    } = await response.json();

    if (!data.success) throw new Error(data.message);
    return data.property;
  } catch (error) {
    if (error instanceof Error) {
      errors = error.message;
    } else {
      errors = "Something went wrong";
    }
  }
};

const PropertyForm = dynamic(() => import("@/components/PropertyForm"), {
  loading: () => (
    <div className="flex justify-center items-center h-40">
      <div className="w-full max-w-md p-4 mx-auto bg-white rounded-md shadow animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded mb-4"></div>
        <div className="h-4 bg-gray-300 rounded mb-4"></div>
        <div className="h-12 bg-gray-300 rounded"></div>
      </div>
    </div>
  ),
});

async function PropertyEdit({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  if (!id) return null;
  const property = await getData(id);

  return (
    <section className="w-full relative md:py-0 py-5">
      {errors && <small className="text-destructive">{errors}</small>}
      {!errors && property ? (
        <div className="z-10 isolate relative">
          <h2 className="text-center">Edit Property Info</h2>

          <div className="mt-10 bg-white drop-shadow-2xl md:w-11/12 w-full mx-auto rounded-2xl p-3">
            <PropertyForm property={property} />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-40">
          <div className="w-full max-w-md p-4 mx-auto bg-white rounded-md shadow animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 rounded mb-4"></div>
            <div className="h-12 bg-gray-300 rounded"></div>
          </div>
        </div>
      )}
    </section>
  );
}

export default PropertyEdit;
