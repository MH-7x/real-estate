"use client";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";

function GridImagePreviews({ images, alt }: { images: string[]; alt: string }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <div className="bg-red-100 rounded-lg md:col-span-2 col-span-5  overflow-hidden relative">
      <Carousel
        setApi={setApi}
        className="w-full md:h-[300px] h-[250px] overflow-hidden"
      >
        <CarouselContent>
          {images.map((image, i) => (
            <CarouselItem key={i}>
              <Image
                src={image}
                alt={alt}
                width={400}
                height={400}
                className="object-cover h-full w-full object-center "
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="text-center text-sm text-white drop-shadow-xl absolute bottom-4 left-4">
        {current} of {count}
      </div>
    </div>
  );
}

export default GridImagePreviews;
