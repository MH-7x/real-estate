import Cities from "@/components/Cities";
import FAQs from "@/components/FAQs";
import HeroSection from "@/components/heroSection";
import PopularProperties from "@/components/PopularProperties";
import RecAdd from "@/components/RecAdd";
import OurTeam from "@/components/Team";
import WhyChooseUs from "@/components/WhyChooseUs";
import { faqs } from "@/types/CONSTANT";
import React from "react";

async function page() {
  return (
    <section>
      <HeroSection />
      <RecAdd />
      <PopularProperties />
      <WhyChooseUs />
      <Cities />
      <OurTeam />
      <FAQs faqs={faqs} />
    </section>
  );
}

export default page;
