"use client";
import { PropertyTable } from "@/components/PropertyTable";
import { Skeleton } from "@/components/ui/skeleton";
import { ResponseProperty, ResProperty } from "@/types/property";

import { Building2, LucideLoader } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function ListAll() {
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState<ResProperty[]>([]);
  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/properties");
      if (!response.ok) throw new Error(response.statusText);
      const data: ResponseProperty = await response.json();
      if (!data.success) {
        toast.error(data.message);
      }
      setProperties(data.properties);
      console.log("Data :: ", data);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <>
      <div className="w-full grid  md:grid-cols-3 grid-cols-1 md:gap-7 gap-4 md:px-0 ">
        <div className="drop-shadow-lg bg-white border border-primary/50  rounded-2xl flex flex-col items-start justify-center p-3">
          <h3 className="">Total Listed Properties</h3>
          <div className="mt-2 flex items-center gap-3">
            <div className="w-12 rounded-xl h-12 flex items-center justify-center drop-shadow-md bg-white">
              <Building2 className="text-primary size-7" />
            </div>
            <h3 className="font-bold text-4xl drop-shadow font-sans">53</h3>
          </div>
        </div>
        <div className="drop-shadow-lg bg-white border border-primary/50 rounded-2xl flex flex-col items-start justify-center p-3">
          <h3 className=" text-secondary-foreground">Properties for Sell</h3>
          <div className="mt-2 flex items-center gap-3">
            <div className="w-12 rounded-xl h-12 flex items-center justify-center drop-shadow-md bg-white">
              <Building2 className="text-primary size-7" />
            </div>
            <h3 className="text-secondary-foreground font-bold text-4xl drop-shadow font-sans">
              34
            </h3>
          </div>
        </div>
        <div className="drop-shadow-lg bg-white border border-primary/50 rounded-2xl flex flex-col items-start justify-center p-3">
          <h3 className=" text-secondary-foreground">Rental Properties</h3>
          <div className="mt-2 flex items-center gap-3">
            <div className="w-12 rounded-xl h-12 flex items-center justify-center drop-shadow-md bg-white">
              <Building2 className="text-primary size-7" />
            </div>
            <h3 className="text-secondary-foreground font-bold text-4xl drop-shadow font-sans">
              19
            </h3>
          </div>
        </div>
      </div>
      <div className="mt-10 rounded-2xl overflow-hidden">
        {loading &&
          [1, 2, 3, 4, 5].map((i) => (
            <Skeleton
              key={i}
              className="w-full h-40 flex items-center justify-center mb-4"
            >
              <LucideLoader size={40} className="text-primary animate-spin" />
            </Skeleton>
          ))}
        {!loading && properties && properties.length > 0 && (
          <PropertyTable
            properties={properties}
            fetchProperties={fetchProperties}
          />
        )}
      </div>
    </>
  );
}

export default ListAll;
