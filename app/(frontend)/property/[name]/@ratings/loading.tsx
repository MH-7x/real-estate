import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function loading() {
  return (
    <>
      <Skeleton className="w-full h-96" />
    </>
  );
}

export default loading;
