"use client";
import React from "react";
import { CldImage } from "next-cloudinary";
import { X } from "lucide-react";

function ImagesPreview({ images }: { images: string[] }) {
  return images.map((img, index) => (
    <div
      key={index}
      className="w-28 h-28 bg-red-200 rounded-lg overflow-hidden shadow-xl relative"
    >
      <div className="w-5 h-5 bg-destructive rounded-full overflow-hidden flex items-center justify-center absolute top-1 right-1">
        <X className="size-3 text-destructive-foreground cursor-pointer" />
      </div>
      <CldImage
        src={img}
        width={150}
        height={150}
        alt="image"
        className="aspect-square object-cover"
        crop={{
          type: "auto",
          source: true,
        }}
      />
    </div>
  ));
}

export default ImagesPreview;
