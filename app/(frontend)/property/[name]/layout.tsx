import { GetPropertyData } from "@/actions/FetchData";
import convertToPkrCurrency from "@/lib/ConvertToPkrCurrency";
import { SinResProperty } from "@/types/property";
import React from "react";
import type { Metadata } from "next";
import { GenerateJsonLD } from "@/lib/GenerateJsonLD";
type PropType = {
  children: React.ReactNode;
  main: React.ReactNode;
  ratings: React.ReactNode;
  similarProperties: React.ReactNode;
};

type Props = { params: { name: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = (await params).name;
  let property: SinResProperty | null = null;
  property = await GetPropertyData(name);

  const fallbackImage = property?.images?.[0] || "";
  const price = property?.price ? convertToPkrCurrency(property.price) : "N/A";

  return {
    keywords: [
      `${property?.PropertyName}`,
      `${property?.size.value} ${property?.size.unit}`,
      `${property?.propertyType}`,
      `${property?.purpose}`,
      `${property?.street}, ${property?.address.area}, ${property?.address.city}`,
      `${property?.bedrooms} bedrooms`,
      `${property?.bathrooms} bathrooms`,
      `${property?.condition} condition`,
      `PKR ${price}`,
    ],
    title: `${property?.PropertyName} | Brighthome`,
    description: `${property?.size.value} ${property?.size.unit} ${property?.propertyType} ${property?.purpose} in ${property?.street}, ${property?.address.area}, ${property?.address.city} with ${property?.bedrooms} bedrooms, ${property?.bathrooms} bathrooms, ${property?.condition} condition, price PKR ${price}`,

    openGraph: {
      title:
        `${property?.PropertyName} | Brighthome` || name.split("-").join(" "),
      description:
        `${property?.size.value} ${property?.size.unit} ${property?.propertyType} ${property?.purpose} in ${property?.street}, ${property?.address.area}, ${property?.address.city} with ${property?.bedrooms} bedrooms, ${property?.bathrooms} bathrooms, ${property?.condition} condition, price PKR ${price}` ||
        name.split("-").join(" "),

      images: fallbackImage ? [fallbackImage] : [],

      url: `${process.env.PUBLIC_URL}/property/${name}`,
    },
    alternates: {
      canonical: `${process.env.PUBLIC_URL}/property/${name}`,
      languages: {
        "en-US": `${process.env.PUBLIC_URL}/property/${name}`,
      },
    },
    twitter: {
      title:
        `${property?.PropertyName} | Brighthome` || name.split("-").join(" "),
      description:
        `${property?.size.value} ${property?.size.unit} ${property?.propertyType} ${property?.purpose} in ${property?.street}, ${property?.address.area}, ${property?.address.city} with ${property?.bedrooms} bedrooms, ${property?.bathrooms} bathrooms, ${property?.condition} condition, price PKR ${price}` ||
        name.split("-").join(" "),
      images: fallbackImage ? [fallbackImage] : [],
    },
    other: {
      "application/ld+json":
        GenerateJsonLD({ property: property as SinResProperty | null }) || "",
    },
  };
}

function PropertyLayout({
  children,
  main,
  ratings,
  similarProperties,
}: PropType) {
  return (
    <>
      <section className="mt-28  md:px-28 px-3">{main}</section>
      <section className="my-20  md:w-11/12 w-full mx-auto">{ratings}</section>
      <section className="md:w-11/12 mt-16 w-full mx-auto relative isolate">
        {similarProperties}
      </section>
      {children}
    </>
  );
}

export default PropertyLayout;
