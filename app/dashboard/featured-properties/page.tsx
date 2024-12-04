"use client";
import { PropertyTable } from "@/components/PropertyTable";
import { Skeleton } from "@/components/ui/skeleton";
import { ResponseProperty, ResProperty } from "@/types/property";

import { FileWarning, LucideLoader } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function ListAll() {
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState<ResProperty[]>([]);
  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/properties?onlyFeatured=true");
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
      <h2 className="text-center">Featured Properties</h2>
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
      {!loading && !properties && (
        <div className="md:w-[550px] w-80 p-4 rounded-lg mx-auto bg-secondary border border-yellow-500 flex items-center justify-center gap-y-3 flex-col">
          <FileWarning />
          <h3 className="text-center text-yellow-500">
            enable featured option true, to see properties
          </h3>
        </div>
      )}
    </>
  );
}

export default ListAll;
