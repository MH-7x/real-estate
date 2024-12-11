import React from "react";
import { Skeleton } from "./ui/skeleton";

function GridLoader() {
  return (
    <div className="col-span-3 bg-white drop-shadow-lg grid md:grid-cols-5 grid-cols-1 rounded-xl p-2 gap-5 mb-4">
      <Skeleton className="rounded-lg md:col-span-2 col-span-5" />
      <Skeleton className="md:py-2 pb-2 md:col-span-3 col-span-5" />
    </div>
  );
}

export default GridLoader;
