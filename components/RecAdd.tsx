import { ResProperty } from "@/types/property";
import PropertyCard from "./PropertyCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
function RecAdd({ properties }: { properties: ResProperty[] }) {
  return (
    <section
      id="recently-added "
      className="lg:px-10 md:px-5 px-3 relative isolate"
    >
      <h2>Reacntly Added</h2>
      <p>Latest properties added to our listings.</p>

      <div className="mt-5">
        <Carousel draggable={false} className="w-full">
          <CarouselContent className="md:-ml-1 cursor-grab">
            {properties.map((property, index) => (
              <CarouselItem key={index} className=" md:basis-1/2 lg:basis-1/3">
                <div>
                  <CardContent className="flex aspect-square items-center justify-center md:p-6 p-0">
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
      <Button className="-mt-10 ml-4 w-80" variant={"secondary"} size={"lg"}>
        {" "}
        View All Properties
        <ArrowRight />
      </Button>
    </section>
  );
}

export default RecAdd;
