"use client";
import { Amenities } from "@/types/Amenities";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";

function PreviewAmenities({ amenities }: { amenities: Amenities[] }) {
  const [showAll, setShowAll] = useState(false);

  const displayedAmenities = showAll ? amenities : amenities.slice(0, 4);

  return (
    <section className="w-full mt-5">
      <div
        className={`grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2  gap-4 overflow-hidden transition-all duration-500 ${
          showAll ? "max-h-[1000px]" : "max-h-[200px]"
        }`}
      >
        {displayedAmenities.map((amenity) => (
          <div
            key={amenity.id}
            className="bg-secondary flex items-center justify-center rounded-2xl px-2 py-3 flex-col gap-y-1"
          >
            <Image
              src={amenity.icon}
              alt={amenity.name}
              width={22}
              height={22}
              loading="lazy"
            />
            <p className="text-base text-center font-semibold">
              {!amenity.isToggle && amenity.count} {amenity.name}
            </p>
          </div>
        ))}
      </div>
      {amenities.length > 4 && (
        <div className="mt-4 text-center">
          <Button
            variant={"ghost"}
            className="font-semibold"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "View Less" : "View All"} <MoreHorizontal />
          </Button>
        </div>
      )}
    </section>
  );
}

export default PreviewAmenities;
