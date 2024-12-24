import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
function loading() {
  return (
    <>
      <Skeleton className="w-full h-96" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Skeleton className="w-full h-96" />
        <Skeleton className="w-full h-96" />
        <Skeleton className="w-full h-96" />
      </div>
    </>
  );
}

export default loading;
