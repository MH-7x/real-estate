import Cities from "@/components/Cities";
import FAQs from "@/components/FAQs";
import HeroSection from "@/components/heroSection";
import PopularProperties from "@/components/PopularProperties";
import RecAdd from "@/components/RecAdd";
import OurTeam from "@/components/Team";
import { Testimonials } from "@/components/Testimonials";
import { Button } from "@/components/ui/button";
import WhyChooseUs from "@/components/WhyChooseUs";
import { faqs } from "@/types/CONSTANT";
import { ResponseProperty } from "@/types/property";
import Image from "next/image";
import React from "react";

async function RecentlyAdded() {
  try {
    const response = await fetch(
      `${process.env.PUBLIC_URL}/api/properties?limit=5`,
      {
        cache: "no-store",
      }
    );
    const data: ResponseProperty = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching recently added properties:", error.message);
    } else {
      console.error(
        "Unknown error occurred while fetching recently added properties"
      );
    }
  }
}
const FeturedProperties = async () => {
  try {
    const response = await fetch(
      `${process.env.PUBLIC_URL}/api/properties?onlyFeatured=true`,
      {
        cache: "no-store",
      }
    );
    const data: ResponseProperty = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching recently added properties:", error.message);
    } else {
      console.error(
        "Unknown error occurred while fetching recently added properties"
      );
    }
  }
};

async function page() {
  const recentlyAdded = RecentlyAdded();
  const Featured = FeturedProperties();

  const [recentlyAddedProperties, FeaturedProperties] = await Promise.all([
    recentlyAdded,
    Featured,
  ]);

  return (
    <section>
      <HeroSection />
      {!recentlyAddedProperties?.success ? (
        <div className="min-h-96 bg-secondary flex items-center flex-col justify-center w-11/12 mx-auto rounded-xl text-destructive">
          <Image src={"/error.svg"} width={150} height={150} alt="error" />
          {recentlyAddedProperties?.message}
          <a href={process.env.PUBLIC_URL}>
            <Button variant={"link"}>Resfersh The Page</Button>
          </a>
        </div>
      ) : (
        <RecAdd properties={recentlyAddedProperties.properties} />
      )}
      {!FeaturedProperties?.success ? (
        <div className="min-h-96 mt-16 bg-secondary flex items-center flex-col justify-center w-11/12 mx-auto rounded-xl text-destructive">
          <Image src={"/error.svg"} width={150} height={150} alt="error" />
          {FeaturedProperties?.message}
          <a href={process.env.PUBLIC_URL}>
            <Button variant={"link"}>Resfersh The Page</Button>
          </a>
        </div>
      ) : (
        <PopularProperties properties={FeaturedProperties.properties} />
      )}

      <WhyChooseUs />
      <Cities />
      <Testimonials />
      <OurTeam />
      <FAQs faqs={faqs} />
    </section>
  );
}

export default page;
