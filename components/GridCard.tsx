import React from "react";
import GridImagePreviews from "./GridImagePreviews";
import { SinResProperty } from "@/types/property";
import resizeCloudinaryImages from "@/lib/utils";
import convertToPkrCurrency from "@/lib/ConvertToPkrCurrency";
import {
  ArrowRight,
  BedDoubleIcon,
  HandCoins,
  HouseIcon,
  MapPinHouse,
  MessageCircleReplyIcon,
  PhoneCall,
} from "lucide-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import Link from "next/link";

function GridCard({ property }: { property: SinResProperty }) {
  const resizeImages = resizeCloudinaryImages(property.images, 400, 400);

  return (
    <div className="col-span-3 bg-white drop-shadow-lg grid md:grid-cols-5 grid-cols-1 rounded-xl p-2 gap-5 mb-4">
      <GridImagePreviews images={resizeImages} alt={property.PropertyName} />
      <div className="md:py-2 pb-2 md:col-span-3 col-span-5">
        <Link href={`/property/${property.slug}`}>
          <h3 className="font-bold md:text-2xl/tight">
            {property.PropertyName}
          </h3>
        </Link>
        <p className="font-semibold line-1 mt-2">
          PKR :{" "}
          <span className="text-primary">
            {convertToPkrCurrency(property.price)}
          </span>
        </p>
        <p className="capitalize mt-3 text-lg flex gap-1 items-center">
          <MapPinHouse className="text-primary size-5" /> {property.street},{" "}
          {property.address.area}, {property.address.city}
        </p>
        <Separator className="my-2" />
        <div className="flex items-center md:gap-5 gap-3 flex-wrap">
          <div className="flex items-center gap-1 font-semibold">
            <HouseIcon className="text-primary size-[17px]" />
            <p className="capitalize text-sm">{property.propertyType}</p>
          </div>
          <div className="flex items-center gap-1 font-semibold">
            <BedDoubleIcon className="text-primary size-[17px]" />
            <p className="capitalize text-sm">{property.bedrooms} Bedrooms</p>
          </div>
          <div className="flex items-center gap-1 font-semibold">
            <BedDoubleIcon className="text-primary size-[17px]" />
            <p className="capitalize text-sm">{property.bathrooms} Bathrooms</p>
          </div>
          <div className="flex items-center gap-1 capitalize font-semibold">
            <HandCoins className="text-primary size-[17px]" />
            <p className="capitalize text-sm">{property.condition} Condition</p>
          </div>
        </div>
        <h4 className="mt-2 capitalize text-muted-foreground line-clamp-2">
          {property.size.value} {property.size.unit} {property.propertyType}{" "}
          {property.purpose} in {property.street}, {property.address.area}{" "}
          {property.address.city} with {property.condition} condition
        </h4>

        <div className="flex item-center mt-3 justify-between">
          <Link href={`/property/${property.slug}`}>
            <Button className="text-base text-black" variant={"outline"}>
              View Details <ArrowRight />
            </Button>
          </Link>
          <div className="flex item-center gap-2">
            <Button aria-label="Chat" size={"icon"}>
              <MessageCircleReplyIcon />
            </Button>
            <Button aria-label="call" size={"icon"}>
              <PhoneCall />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GridCard;
