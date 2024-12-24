"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="md:w-11/12 w-full mx-auto  rounded-xl flex items-center flex-col justify-center min-h-80">
      <Image src="/error.svg" alt="error" width={200} height={200} />
      <p className="my-4 text-lg text-muted-foreground">{error.message}</p>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}
