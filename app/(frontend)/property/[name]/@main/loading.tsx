import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
function loading() {
  return (
    <>
      <Skeleton className="w-full h-96" />

      <Skeleton className="w-full h-96" />
      <Skeleton className="w-full h-96" />
      <Skeleton className="w-full h-96" />
    </>
  );
}

export default loading;
