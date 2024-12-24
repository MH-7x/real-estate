import { GetPropertyData } from "@/actions/FetchData";
import ContactForm from "@/components/ContactForm";
import DetailPropertyTable from "@/components/DetailPropertyTable";
import PreviewAmenities from "@/components/PreviewAmenities";
import PropertyImagesPreview from "@/components/PropertyImagesPreview";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import VideoLoadTrigger from "@/components/VideoLoadTrigger";
import convertToPkrCurrency from "@/lib/ConvertToPkrCurrency";
import { FormatConditions } from "@/lib/FormatConditions";
import { generateWhatsAppLink } from "@/lib/GenerateWhatsappLink";
import { isMobile } from "@/lib/isMobile";
import { Condition, SinResProperty } from "@/types/property";
import { Bath, BedDoubleIcon, Building2, MoveDiagonal2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function MainDetails({ params }: { params: Promise<{ name: string }> }) {
  const name = (await params).name;
  let property: SinResProperty | null = null;
  property = await GetPropertyData(name);

  if (!property) {
    return (
      <div className="mt-28 bg-secondary w-11/12 mx-auto min-h-96 flex items-center justify-center">
        <Image src="/error.svg" alt="error" width={100} height={100} />
        <h3>Property not found</h3>
      </div>
    );
  }
  const MobileScreen = await isMobile();
  return (
    <div className="grid md:grid-cols-5 w-full  grid-cols-1 gap-10">
      <PropertyImagesPreview
        images={property.images}
        alt={property.PropertyName}
      />
      <div className="md:mt-8 w-full col-span-5  mt-5 grid md:grid-cols-5 grid-cols-1 items-start justify-start gap-10">
        <div className="col-span-3 py-5">
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

          {MobileScreen && (
            <>
              <Separator className="my-4" />
              <div className="grid grid-cols-2 w-full gap-4">
                <Link
                  aria-label="whatsapp"
                  className="col-span-1"
                  href={generateWhatsAppLink(property.slug)}
                >
                  <Button
                    size={"lg"}
                    className="flex items-center md:gap-3 gap-1"
                  >
                    <Image
                      src={"/images/whatsapp.svg"}
                      alt="whatsapp logo"
                      width={20}
                      height={20}
                    />
                    <p className="text-primary-foreground">WhatsApp</p>
                  </Button>
                </Link>
                <Link
                  aria-label="call to us"
                  className="col-span-1"
                  href={`tel:${process.env.WHATSAPP_NUMBER}`}
                >
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
                </Link>
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
          <h3 className="mt-10">Features and Amenities</h3>
          <PreviewAmenities amenities={property.amenities} />
        </div>
        <div className="md:col-span-2 col-span-3 border border-primary/10 mt-3 rounded-lg px-3 py-8">
          {!isMobile && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <Link href={generateWhatsAppLink(property.slug)}>
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
                <Link href={`tel:${process.env.WHATSAPP_NUMBER}`}>
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
                </Link>
              </div>
              <Separator className="my-8" />
            </>
          )}

          <ContactForm
            propertyImageUrl={property.images[0]}
            propertyName={property.PropertyName}
          />
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
    </div>
  );
}

export default MainDetails;
