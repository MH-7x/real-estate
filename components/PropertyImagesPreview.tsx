"use client";
import resizeCloudinaryImages from "@/lib/utils";
import React from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";
import Image from "next/image";

function PropertyImagesPreview({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const ResizeImages = resizeCloudinaryImages(images, 600, 500);

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
    <>
      <Carousel
        className="md:col-span-3  col-span-5 relative rounded-2xl overflow-hidden "
        setApi={setApi}
      >
        <CarouselContent className="md:h-[494px]">
          {ResizeImages.map((image, i) => (
            <CarouselItem key={i}>
              <Image
                src={image}
                alt={alt + i}
                width={700}
                height={700}
                quality={70}
                loading="eager"
                className="object-cover rounded-2xl h-auto w-auto object-center"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="text-center text-sm text-white drop-shadow-xl z-20 absolute bottom-3 bg-black/80 py-2 px-4 rounded-xl left-4">
          {current} of {count}
        </div>
      </Carousel>

      {ResizeImages.length > 2 && (
        <div className="col-span-2 md:grid md:grid-rows-2 grid-rows-1  hidden gap-3">
          <div className="row-span-1 overflow-hidden bg-secondary h-60 rounded-2xl">
            <Image
              alt={alt}
              src={ResizeImages[1]}
              width={450}
              height={400}
              loading="eager"
              className="object-cover rounded-2xl h-auto w-auto object-center"
            />
          </div>
          <div className="row-span-1 overflow-hidden bg-secondary h-60 rounded-2xl">
            <Image
              alt={alt}
              src={ResizeImages[2]}
              width={450}
              height={400}
              loading="eager"
              className="object-cover rounded-2xl h-auto w-auto object-center"
            />{" "}
          </div>
        </div>
      )}
    </>
  );
}

export default PropertyImagesPreview;
