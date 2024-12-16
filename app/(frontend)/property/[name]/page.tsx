import ContactForm from "@/components/ContactForm";
import DetailPropertyTable from "@/components/DetailPropertyTable";
import PropertyImagesPreview from "@/components/PropertyImagesPreview";
import SimilarProperties from "@/components/SimilarProperties";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import VideoLoadTrigger from "@/components/VideoLoadTrigger";
import convertToPkrCurrency from "@/lib/ConvertToPkrCurrency";
import { FormatConditions } from "@/lib/FormatConditions";
import { Condition, SinResProperty } from "@/types/property";
import { Bath, BedDoubleIcon, Building2, MoveDiagonal2 } from "lucide-react";
import { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import { GenerateJsonLD } from "../../../../lib/GenerateJsonLD";
import Link from "next/link";
type Props = {
  params: Promise<{ name: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = (await params).name;
  let property: SinResProperty | null = null;
  property = await GetPropertyData(name);

  const fallbackImage = property?.images?.[0] || ""; // Safeguard for empty image array
  const price = property?.price ? convertToPkrCurrency(property.price) : "N/A"; // Default price if unavailable

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
        `${property?.size.value} ${property?.size.unit} ${property?.propertyType} ${property?.purpose} in ${property?.street}, ${property?.address.area}, ${property?.address.city} with ${property?.bedrooms} bedrooms, ${property?.bathrooms} bathrooms, $${property?.condition} condition, price PKR ${price}` ||
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
        `${property?.size.value} ${property?.size.unit} ${property?.propertyType} ${property?.purpose} in ${property?.street}, ${property?.address.area}, ${property?.address.city} with ${property?.bedrooms} bedrooms, ${property?.bathrooms} bathrooms, $${property?.condition} condition, price PKR ${price}` ||
        name.split("-").join(" "),
      images: fallbackImage ? [fallbackImage] : [],
    },
    other: {
      "application/ld+json":
        GenerateJsonLD({ property: property as SinResProperty | null }) || "",
    },
  };
}

const fetchWithErrorHandling = async (url: string) => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.log("Response status is not ok:", res.status);

      throw new Error(`Failed to fetch: ${res.statusText}`);
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { success: false, message: "something went wrong" + error };
  }
};

const GetPropertyData = async (name: string) => {
  const data = await fetchWithErrorHandling(
    `${process.env.PUBLIC_URL}/api/properties?slug=${name}`
  );
  if (data.success === false) {
    throw new Error(data.message);
  }
  return data.property;
};

const getSimilarProperties = async (city: string | undefined) => {
  if (!city) return [];
  const data = await fetchWithErrorHandling(
    `${process.env.PUBLIC_URL}/api/get-data?city=${city}&limit=5`
  );
  if (data.success === false) {
    throw new Error(data.message);
  }
  return data.data;
};

async function SinglePropertyDetail({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const name = (await params).name;
  let property: SinResProperty | null = null;
  let similarProperties: SinResProperty[] = [];
  let errors = "";

  try {
    property = await GetPropertyData(name);
    console.log("property", property);

    similarProperties = await getSimilarProperties(property?.address.city);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    errors = err.message;
  }

  const ReqHeaders = headers();
  const isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Opera Mini/i.test(
    (await ReqHeaders).get("user-agent") || ""
  );

  if (errors) {
    return (
      <div className="mt-28 bg-secondary w-11/12 mx-auto min-h-96 flex items-center justify-center">
        <Image src={"/error.svg"} alt="error" width={100} height={100} />
        <h3>{errors}</h3>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="mt-28 bg-secondary w-11/12 mx-auto min-h-96 flex items-center justify-center">
        <h3>Property not found</h3>
      </div>
    );
  }

  return (
    <>
      <section className="mt-28 min-h-96 md:px-28 px-3">
        <div className="grid md:grid-cols-5 grid-cols-1 gap-10">
          <PropertyImagesPreview
            images={property.images}
            alt={property.PropertyName}
          />
        </div>

        <div className="md:mt-8 mt-5 grid md:grid-cols-5 grid-cols-1 items-start justify-start gap-10">
          <div className="col-span-3 min-h-[420px] py-5">
            <h1 className="capitalize md:text-3xl text-2xl font-medium">
              {name.split("-").join(" ")}
            </h1>
            <Separator className="my-4" />
            <div className="flex flex-wrap items-center md:gap-10 gap-5 mt-5">
              <div className="flex items-center gap-2 font-semibold">
                <Building2 className="text-primary" size={20} />
                <p className="text-base">{property.propertyType}</p>
              </div>
              <div className="flex items-center gap-2 font-semibold">
                <MoveDiagonal2 className="text-primary" size={20} />
                <p className="text-base">
                  {property.size.value} {property.size.unit}
                </p>
              </div>
              <div className="flex items-center gap-2 font-semibold">
                <BedDoubleIcon className="text-primary" size={20} />
                <p className="text-base">{property.bedrooms} Bedrooms</p>
              </div>
              <div className="flex items-center gap-2 font-semibold">
                <Bath className="text-primary" size={20} />
                <p className="text-base">{property.bathrooms} Bathrooms</p>
              </div>
            </div>
            <h3 className="md:text-2xl text-black mt-8">
              PKR :{" "}
              <span className="text-primary">
                {convertToPkrCurrency(property.price)}
              </span>
            </h3>

            {isMobile && (
              <>
                <Separator className="my-4" />
                <div className="grid grid-cols-2 gap-4">
                  <Link href={"https://wa.me/923000000000"}>
                    <Button
                      size={"lg"}
                      className="flex items-center md:gap-3 gap-1"
                    >
                      <Image
                        src={"/images/whatsapp.svg"}
                        alt="whatsapp"
                        width={20}
                        height={20}
                      />
                      <p className="text-primary-foreground">WhatsApp</p>
                    </Button>
                  </Link>
                  <Button
                    variant={"outline"}
                    size={"lg"}
                    className="flex items-center md:gap-3 gap-1"
                  >
                    <Image
                      src={"/images/phone-call.svg"}
                      alt="phone call"
                      width={25}
                      height={25}
                    />
                    <p>Call</p>
                  </Button>
                </div>
              </>
            )}

            <Separator className="my-4" />
            <h3 className="mt-5">Property Condition</h3>
            <p className="text-gray-700 md:text-lg text-base mt-3">
              {FormatConditions(property.condition as Condition)}
            </p>
            <h3 className="mt-5">Description</h3>
            <p className="text-gray-700 md:text-lg text-base mt-3">
              {property.description}
            </p>

            {property.FacebookVideoLink && (
              <div className="mt-10 overflow-hidden bg-white rounded-xl">
                <h3>Property Detail Video</h3>
                <VideoLoadTrigger url={property.FacebookVideoLink} />
              </div>
            )}
            <h3 className="mt-10">Complete Property Details</h3>

            <DetailPropertyTable property={property} />
          </div>
          <div className="md:col-span-2 col-span-3 border border-primary/10 mt-3 rounded-lg px-3 py-8">
            {!isMobile && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    size={"lg"}
                    className="flex items-center md:gap-3 gap-1"
                  >
                    <Image
                      src={"/images/whatsapp.svg"}
                      alt="whatsapp"
                      width={20}
                      height={20}
                    />
                    <p className="text-primary-foreground">WhatsApp</p>
                  </Button>
                  <Button
                    variant={"outline"}
                    size={"lg"}
                    className="flex items-center md:gap-3 gap-1"
                  >
                    <Image
                      src={"/images/phone-call.svg"}
                      alt="phone call"
                      width={25}
                      height={25}
                    />
                    <p>Call</p>
                  </Button>
                </div>
                <Separator className="my-8" />
              </>
            )}

            <ContactForm />
            <Separator className="my-8" />
            <div className="grid grid-cols-1 gap-y-2 mt-8">
              <h3 className="font-semibold text-center my-2 text-muted-foreground">
                Stay Connected With Us
              </h3>
              <Button
                variant={"ghost"}
                className="flex justify-start items-center gap-3"
              >
                <Image
                  src={"/images/facebook.svg"}
                  width={32}
                  height={32}
                  quality={100}
                  alt="facebook page"
                />
                <p className="text-[17px]">facebook.com/brighthome</p>
              </Button>
              <Button
                variant={"ghost"}
                className="flex justify-start items-center gap-3"
              >
                <Image
                  src={"/images/tiktok.svg"}
                  width={32}
                  height={32}
                  quality={100}
                  alt="tiktok account"
                />
                <p className="text-[17px]">tiktok.com/@brighthome</p>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SimilarProperties
        city={property.address.city}
        properties={similarProperties}
      />
    </>
  );
}

export default SinglePropertyDetail;
