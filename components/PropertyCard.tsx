import React from "react";

import { BedDouble, Gift, HomeIcon, LandPlot } from "lucide-react";

import { ResProperty } from "@/types/property";
import convertToPkrCurrency from "@/lib/ConvertToPkrCurrency";
import Link from "next/link";
import { CardImagesPreview } from "./CardImagePreview";
import resizeCloudinaryImages from "@/lib/utils";
function PropertyCard({
  property,
  Popular = false,
  value = 0,
}: {
  Popular?: boolean;
  value?: number;
  property: ResProperty;
}) {
  const resizeImages = resizeCloudinaryImages(property.images, 400, 400);
  return (
    <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg pb-2">
      <div className="relative m-2.5 text-white rounded-md">
        <CardImagesPreview
          alt={
            property.size.value +
            " " +
            property.size.unit +
            " " +
            property.propertyType +
            " " +
            property.purpose +
            " " +
            property.address.city +
            " "
          }
          price={convertToPkrCurrency(property.price)}
          images={resizeImages}
          location={`${property.street}, ${property.address.area} ${property.address.city}`}
        />
        {Popular && value > 0 && (
          <div className="px-3 py-1 bg-white absolute top-0 border left-0 text-black rounded-xl font-bold">
            <span className="flex items-center gap-1 text-red-600">
              <Gift className="w-5 h-5 stroke-primary" /> {value}%
            </span>
          </div>
        )}
      </div>
      <div className="px-2.5 py-1 relative">
        <div className="flex items-center">
          <Link href={`/property/${property.slug}`}>
            <h3 className=" md:text-xl text-lg line-clamp-1 capitalize ">
              {property.size.value} {property.size.unit} {property.propertyType}{" "}
              {property.purpose} in {property.address.city}
            </h3>
          </Link>
        </div>

        <p className=" text-xs md:text-sm text-muted-foreground line-clamp-2">
          {property.size.value} {property.size.unit} {property.propertyType}{" "}
          {property.purpose} in {property.street}, {property.address.area}{" "}
          {property.address.city} with {property.condition} condition
        </p>
      </div>

      <div className="flex items-start justify-start gap-6 font-semibold text-gray-600 px-2.5 mt-1">
        <div className="flex items-center gap-1">
          <HomeIcon className="w-3.5 h-3.5 stroke-primary" />
          <span className="text-sm">{property.propertyType}</span>
        </div>
        <div className="flex items-center gap-1">
          <BedDouble className="w-3.5 h-3.5 stroke-primary" />
          <span className="text-sm">{property.bedrooms} Bedrooms</span>
        </div>
        <div className="flex items-center gap-1">
          <LandPlot className="w-3.5 h-3.5 stroke-primary" />
          <span className="text-sm">
            {property.size.value} {property.size.unit}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
