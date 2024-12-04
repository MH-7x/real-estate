"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { BreadcrumbItem, BreadcrumbPage } from "./ui/breadcrumb";
function Bread() {
  const path = usePathname();
  console.log("path :: ", path);

  const pathname = path.split("/")[2];

  return (
    <>
      <BreadcrumbItem>
        <BreadcrumbPage>{pathname}</BreadcrumbPage>
      </BreadcrumbItem>
    </>
  );
}

export default Bread;
