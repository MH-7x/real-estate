import { ResponseProperty } from "@/types/property";
import PropertyCard from "./PropertyCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
async function fetchUsers(): Promise<ResponseProperty> {
  const res = await fetch(`${process.env.PUBLIC_URL}/api/properties?limit=5`, {
    cache: "no-store", // To ensure it fetches fresh data
  });
  return res.json();
}

async function RecAdd() {
  const data = await fetchUsers();

  return (
    <section
      id="recently-added "
      className="lg:px-10 md:px-5 px-3 relative isolate"
    >
      <h2>Reacntly Added</h2>
      <p>Latest properties added to our listings.</p>
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
        {data.success ? (
          <>
            <Carousel className="w-full">
              <CarouselContent className="md:-ml-1">
                {data.properties.map((property, index) => (
                  <CarouselItem
                    key={index}
                    className=" md:basis-1/2 lg:basis-1/3"
                  >
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
          </>
        ) : (
          <div className="min-h-96 bg-secondary flex items-center flex-col justify-center">
            <Image src={"/error.svg"} width={150} height={150} alt="error" />
            {data.message}
          </div>
        )}
      </div>
      <Button className="-mt-10 ml-4 w-80" variant={"secondary"} size={"lg"}>
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

export default RecAdd;
