"use client";
import React from "react";
import { Button } from "./ui/button";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function DeleteRating({ id }: { id: string }) {
  const router = useRouter();
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch("/api/rating", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        router.refresh();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };
  return (
    <Button
      onClick={() => handleDelete(id)}
      className="absolute top-2 w-8 h-8 right-2"
      size={"icon"}
      variant={"destructive"}
    >
      <Trash2Icon />
    </Button>
  );
}

export default DeleteRating;
