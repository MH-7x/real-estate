"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination as SwiperPagination } from "swiper/modules";
import Image from "next/image";
export function CardImagesPreview({
  images,
  alt,
}: {
  images?: string[];
  alt?: string;
}) {
  return (
    <>
      <Swiper
        modules={[SwiperPagination]}
        pagination={{
          clickable: true,
        }}
        spaceBetween={10}
        slidesPerView={1}
        navigation
        className="md:w-96 relative w-80 bg-white mx-auto rounded-xl overflow-hidden h-64"
      >
        {images?.map((image, i) => (
          <SwiperSlide key={i}>
            <Image
              src={image}
              width={384}
              height={384}
              loading="lazy"
              alt={(alt && alt) || "" + i}
              className="overflow-hidden object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
