"use client";
import React from "react";
import { CldImage } from "next-cloudinary";

function ImagesPreview({ images }: { images: string[] }) {
  return images.map((img, index) => (
    <div
      key={index}
      className="w-28 h-28 bg-white rounded-lg overflow-hidden shadow-xl"
    >
      <CldImage
        src={img}
        width={150}
        height={150}
        alt="image"
        className="object-contain object-center"
        crop={{
          type: "auto",
          source: true,
        }}
      />
    </div>
  ));
}

export default ImagesPreview;
