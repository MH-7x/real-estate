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
  // Disable SSR for heavy components
  loading: () => (
    <div className="flex justify-center items-center h-40">
      {/* Skeleton Loader */}
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
  console.log("Property :: ", property);

  return (
    <section className="w-full relative md:py-0 py-5">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary/10 to-primary/30 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>
      {errors && <small className="text-destructive">{errors}</small>}
      {!errors && property ? (
        <div className="z-10 isolate relative">
          <h2 className="text-center">Edit Property Info</h2>

          <div className="mt-10 bg-white drop-shadow-2xl md:w-11/12 w-full mx-auto rounded-2xl p-3">
            {/* Render the dynamically loaded PropertyForm */}
            <PropertyForm property={property} />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-40">
          {/* Skeleton Loader */}
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
