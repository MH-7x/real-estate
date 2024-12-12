"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";

function RefreshButton() {
  const router = useRouter();

  const handleResetFilters = () => {
    const url = window.location.origin + window.location.pathname;
    router.push(url);
  };

  return (
    <Button onClick={handleResetFilters} variant={"link"}>
      Reset Filters
    </Button>
  );
}

export default RefreshButton;
