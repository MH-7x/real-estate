import dynamic from "next/dynamic";

const CityFilterData = dynamic(() => import("@/components/CityFilterData"));
import PageHeroSection from "@/components/PageHeroSection";
import React from "react";

export interface Main {
  message: string;
  success: boolean;
  totalCount: number;
  data: Data;
}

export interface Data {
  uniqueAreas: string[];
  uniquePropertyTypes: string[];
  uniqueSizes: UniqueSize[];
}

export interface UniqueSize {
  value: number;
  unit: string;
}

const FetchURL = async (url: string) => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return { success: false, message: "Failed to fetch data: " + error };
  }
};

const GetCityData = async () => {
  const data: Main = await FetchURL(
    `${process.env.PUBLIC_URL}/api/get-city-data?city=peshawar&purpose=for+sell`
  );
  if (!data || data.success === false) {
    return {
      success: false,
      message: "No data available at the moment",
      totalCount: 0,
      data: { uniqueAreas: [], uniquePropertyTypes: [], uniqueSizes: [] },
    };
  }
  return data;
};

async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await GetCityData();

  return (
    <section>
      <PageHeroSection
        type="Sale"
        city="Peshawar"
        desc="Discover top properties for sale in Peshawar, including houses, apartments, and plots in prime areas like Hayatabad, DHA Peshawar, and Regi Model Town. Your perfect property awaits!"
        length={data.totalCount}
      />
      {data.success ? (
        <CityFilterData
          sizes={data.data.uniqueSizes}
          propertyTypes={data.data.uniquePropertyTypes}
          areas={data.data.uniqueAreas}
          sort={["lowToHigh", "highToLow", "newest"]}
        />
      ) : (
        <div className="md:w-11/12 w-[98%] mx-auto mt-16 min-20 flex items-center justify-center">
          {data.message}
        </div>
      )}
      {children}
    </section>
  );
}

export default RootLayout;
