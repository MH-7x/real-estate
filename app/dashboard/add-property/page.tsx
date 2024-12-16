import dynamic from "next/dynamic";
import React from "react";

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

async function AddPropertyPage() {
  return (
    <section className="w-full relative md:py-0 py-5">
      <div className="z-10 isolate relative">
        <h2 className="text-center">Add New Property</h2>

        <div className="mt-10 bg-white drop-shadow-2xl md:w-11/12 w-full mx-auto rounded-2xl p-3">
          <PropertyForm />
        </div>
      </div>
    </section>
  );
}

export default AddPropertyPage;
