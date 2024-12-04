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

const property = {
  address: { city: "peshawar", area: "sheikh-yasin-town" },
  size: { value: 3, unit: "Marla" },
  _id: "674d88a085780b0649815c1d",
  purpose: "for sell",
  propertyType: "house",
  street: "phaze - 2",
  bedrooms: 5,
  bathrooms: 4,
  PropertyName: "9 Marla Brand New House For Sell",
  condition: "Brand New",
  price: 11999999,
  amenities: [],
  description: "this is test description for the property.",
  images: [
    "https://res.cloudinary.com/doxmrrizw/image/upload/v1733134240/mlde9hxwmlac9gzry4it.jpg",
    "https://res.cloudinary.com/doxmrrizw/image/upload/v1733134262/at8iq41zdyy64w6quaac.jpg",
    "https://res.cloudinary.com/doxmrrizw/image/upload/v1733134338/zolwshdanjcwgqkbsczq.jpg",
  ],
  isFeatured: true,
  discount: 2,
  createdAt: new Date("2024-12-02T10:14:56.524Z"),
  updatedAt: new Date("2024-12-02T10:14:56.524Z"),
  __v: 0,
};
function PopularProperties() {
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
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary/10 to-primary/30 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="mt-5">
        <Carousel className=" w-full">
          <CarouselContent>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <PropertyCard property={property} Popular value={10} />
            </CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <PropertyCard property={property} Popular value={5} />
            </CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <PropertyCard property={property} Popular value={15} />
            </CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <PropertyCard property={property} Popular value={30} />
            </CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <PropertyCard property={property} Popular value={33} />
            </CarouselItem>
          </CarouselContent>
          <CarouselNext className="absolute right-1 -top-3 -translate-y-0" />
          <CarouselPrevious className=" md:left-[93%] left-[78%] -top-3  -translate-y-0" />
        </Carousel>
      </div>
      <Button className=" ml-4 w-80" variant={"secondary"} size={"lg"}>
        {" "}
        View All Properties
        <ArrowRight />
      </Button>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary/10 to-primary/30 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>
    </section>
  );
}

export default PopularProperties;
