import React from "react";

import {
  ArrowRight,
  BedDouble,
  Gift,
  HomeIcon,
  LandPlot,
  MapPinCheckIcon,
  MessageCircle,
  PhoneCall,
} from "lucide-react";
import { Button } from "./ui/button";
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
  const resizeImages = resizeCloudinaryImages(property.images, 500, 400);
  return (
    <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg">
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
          images={resizeImages}
        />

        <div className=" absolute -bottom-5 z-10 bg-white right-0 px-2 py-1 rounded-md font-bold">
          <span className="text-primary">
            {convertToPkrCurrency(property.price)}
          </span>
        </div>
        {Popular && (
          <div className="px-3 py-1 bg-white absolute top-0 border left-0 text-black rounded-xl font-bold">
            <span className="flex items-center gap-1 text-red-600">
              <Gift className="w-5 h-5 stroke-primary" /> {value}%
            </span>
          </div>
        )}
      </div>
      <div className="px-2 py-2 relative">
        <div className="flex items-center">
          <Link href={`/property/${property.slug}`}>
            <h3 className=" line-clamp-1">
              {property.size.value} {property.size.unit} {property.propertyType}{" "}
              {property.purpose} in {property.address.city}
            </h3>
          </Link>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {property.size.value} {property.size.unit} {property.propertyType}{" "}
          {property.purpose} in {property.street}, {property.address.area}{" "}
          {property.address.city} with {property.condition} condition
        </p>
      </div>

      <div className="flex items-start justify-start gap-6 border-b font-semibold text-gray-800 px-2">
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
      <div className="mt-1 px-2">
        <div className="flex items-center gap-1">
          <MapPinCheckIcon className="w-3.5 h-3.5 stroke-primary" />
          <span className="text-sm font-semibold line-clamp-1">
            {property.street}, {property.address.area} {property.address.city}
          </span>
        </div>
      </div>
      <div className="px-4 pb-4 pt-0 mt-4">
        <div className="flex items-center gap-3">
          <Link className="w-[70%]" href={`/property/${property.slug}`}>
            <Button className="w-full" variant={"outline"}>
              View Details <ArrowRight />
            </Button>
          </Link>
          <Button size={"icon"}>
            <MessageCircle />
          </Button>
          <Button variant={"secondary"} size={"icon"}>
            <PhoneCall />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
