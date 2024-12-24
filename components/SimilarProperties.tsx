import { SinResProperty } from "@/types/property";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { CardContent } from "./ui/card";
import PropertyCard from "./PropertyCard";

const SimilarProperties = ({
  properties,
  city,
}: {
  properties: SinResProperty[];
  city: string;
}) => {
  return (
    <>
      <h2 className="text-center">Similar Properties in {city}</h2>
      <p className="text-center">
        More similar properties in {city} and its area
      </p>

      <div className="mt-5">
        <Carousel draggable={false} className="w-full">
          <CarouselContent className="md:-ml-1">
            {properties.map((property, index) => (
              <CarouselItem key={index} className=" md:basis-1/2 lg:basis-1/3">
                <div>
                  <CardContent className="flex aspect-square items-center justify-center md:p-6 p-2">
                    <PropertyCard property={property} />
                  </CardContent>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="md:left-[92%] left-[75%] top-0" />
          <CarouselNext className="right-2 -translate-x-1 top-0" />
        </Carousel>
      </div>
    </>
  );
};

export default SimilarProperties;
