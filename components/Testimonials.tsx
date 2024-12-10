"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export function Testimonials() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnMouseEnter: true })
  );
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
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full mx-auto mt-10 max-w-2xl"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem className="mt-5" key={index}>
              <div className="p-1">
                <Card className="bg-secondary cursor-grab select-none border-none  bg-white">
                  <CardContent className="text-center">
                    <img
                      className="object-cover w-32 h-32 mx-auto rounded-full"
                      src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/4/avatar.jpg"
                      alt=""
                    />
                    <p className="mt-6 text-lg font-semibold text-black">
                      Mark Tanker,{" "}
                      <span className="font-normal text-gray-600">
                        California
                      </span>
                    </p>
                    <blockquote className="max-w-xl mx-auto mt-7">
                      <p className="text-xl leading-relaxed text-black">
                        “Amet minim mollit non deserunt ullam co est sit aliqua
                        dolor do amet sint. Velit officia consequat duis enim
                        velit mollit. Exercitation veniam consequat.”
                      </p>
                    </blockquote>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        {current} of {count}
      </div>
    </>
  );
}
