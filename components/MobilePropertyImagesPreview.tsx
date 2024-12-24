"use client";
import React from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import resizeCloudinaryImages from "@/lib/utils";
import Image from "next/image";

function MobilePropertyImagesPreview({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const ResizeImages = resizeCloudinaryImages(images, 400, 400);
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
    <Carousel
      setApi={setApi}
      className="col-span-5 min-h-96 rounded-2xl relative overflow-hidden"
    >
      <CarouselContent>
        {ResizeImages.map((image, i) => (
          <CarouselItem key={alt + i}>
            <Image
              alt={`${alt} ${i + 1}`}
              src={image}
              width={400}
              height={400}
              className="object-cover h-full rounded-2xl w-full object-center "
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="top-[92%] left-[45%] -translate-x-full " />
      <CarouselNext className="top-[92%] left-[60%] -translate-x-full " />
      <div className="text-center text-xs text-white bg-black/60 px-2 py-1 rounded-lg drop-shadow-xl z-20 absolute bottom-10  right-4">
        {current} of {count}
      </div>
    </Carousel>
  );
}

export default MobilePropertyImagesPreview;
