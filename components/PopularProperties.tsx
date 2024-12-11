import React from "react";
import PropertyCard from "./PropertyCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { ResProperty } from "@/types/property";
import { CardContent } from "./ui/card";

function PopularProperties({ properties }: { properties: ResProperty[] }) {
  return (
    <section
      id="recently-added "
      className="lg:px-10 md:px-5 px-3 relative isolate mt-24"
    >
      <h2 className="text-center">Popular Properties With Special Offers</h2>
      <p className="text-center mx-auto max-w-3xl mt-2">
        Explore top properties with special offers, including discounts and
        added perks. Find your dream home or next investment at a great value!
      </p>

      <div className="mt-5">
        <Carousel draggable={false} className="w-full">
          <CarouselContent className="md:-ml-1">
            {properties.map((property, index) => (
              <CarouselItem key={index} className=" md:basis-1/2 lg:basis-1/3">
                <div>
                  <CardContent className="flex aspect-square items-center justify-center md:p-6 p-2">
                    <PropertyCard
                      Popular
                      value={property.discount}
                      property={property}
                    />
                  </CardContent>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="md:left-[92%] left-[75%] top-0" />
          <CarouselNext className="right-2 -translate-x-1 top-0" />
        </Carousel>
      </div>
      <Button className=" ml-4 w-80" variant={"secondary"} size={"lg"}>
        {" "}
        View All Properties
        <ArrowRight />
      </Button>
    </section>
  );
}

export default PopularProperties;
