import React from "react";
import SearchInput from "./SearchInput";
import { headers } from "next/headers";

async function HeroSection() {
  const ReqHeaders = headers();
  const isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Opera Mini/i.test(
    (await ReqHeaders).get("user-agent") || ""
  );
  return (
    <div className="relative md:mt-0 mt-10 isolate md:px-6 px-3 lg:px-8">
      <div
        className="absolute opacity-30 -z-10 inset-0"
        style={{
          backgroundImage: `url('/images/Brighthome.jpg')`,
          backgroundSize: isMobile ? "cover" : "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      <div className="mx-auto  z-10 max-w-4xl py-32 lg:py-32">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            find out hot offers today{" "}
            <a href="#" className="font-semibold text-primary">
              <span aria-hidden="true" className="absolute inset-0" />
              Read more <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-balance text-[40px]   md:leading-[68px] leading-[44px] font-bold tracking-tight text-gray-900 sm:text-7xl">
            Find Your Dream Property with{" "}
            <span className="text-primary">Brighthome</span>
          </h1>
          <p className="md:mt-8 mt-5  font-medium ">
            Discover premium properties in Peshawar and Islamabad&apos;s top
            neighborhoods, from family homes to luxury apartments tailored to
            your lifestyle.
          </p>
          <div className="mt-5 flex justify-center items-center w-full">
            <SearchInput />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
