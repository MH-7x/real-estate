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
import { headers } from "next/headers";
import Image from "next/image";

let errors = "";
const GetPropertyData = async function (name: string) {
  const res = await fetch(
    `${process.env.PUBLIC_URL}/api/properties?slug=${name}`
  );
  if (!res.ok) errors = res.statusText;
  const data: { message: string; success: boolean; property: SinResProperty } =
    await res.json();
  if (data.success === false) errors = data.message;
  return data.property;
};

const getSimilarProperties = async function (city: string | undefined) {
  if (!city) return [];
  const res = await fetch(
    `${process.env.PUBLIC_URL}/api/get-data?city=${city}&limit=5`
  );
  if (!res.ok) errors = res.statusText;
  const data: {
    message: string;
    success: boolean;
    data: SinResProperty[];
  } = await res.json();

  if (data.success === false) errors = data.message;
  return data.data;
};
async function SinglePropertyDetail({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const name = (await params).name;

  const property = await GetPropertyData(name);
  const similarProperties = await getSimilarProperties(property?.address.city);
  console.log("Similar Properties :: ", similarProperties);

  const ReqHeaders = headers();
  const isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Opera Mini/i.test(
    (await ReqHeaders).get("user-agent") || ""
  );

  return (
    <>
      {errors !== "" ? (
        <div className="mt-28 bg-secondary w-11/12 mx-auto min-h-96 flex items-center justify-center">
          <h3>{errors}</h3>
        </div>
      ) : (
        <>
          <section className={"mt-28  min-h-96 md:px-28 px-3"}>
            <div className="grid md:grid-cols-5 grid-cols-1  gap-10">
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
                  </>
                )}

                <Separator className="my-4" />
                <h3 className=" mt-5">Property Condition</h3>
                <p className="text-gray-700 md:text-lg text-base mt-3">
                  {FormatConditions(property.condition as Condition)}
                </p>
                <p></p>
                <h3 className=" mt-5">Description</h3>
                <p className="text-gray-700  md:text-lg text-base mt-3">
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
                <div className={"grid grid-cols-1 gap-y-2 mt-8"}>
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
                    <p className="text-[17px]">tikok.com/brighthome</p>
                  </Button>
                  <Button
                    variant={"ghost"}
                    className="flex justify-start items-center gap-3"
                  >
                    <Image
                      src={"/images/gmail.svg"}
                      width={32}
                      height={32}
                      quality={100}
                      alt="email address"
                    />
                    <p className="text-[17px]">itsmashal2006@gmail.com</p>
                  </Button>
                  <Button
                    variant={"ghost"}
                    className="flex justify-start items-center gap-3"
                  >
                    <Image
                      src={"/images/map.svg"}
                      width={30}
                      height={30}
                      quality={100}
                      alt="our address"
                    />
                    <p className="text-[17px]">View map address</p>
                  </Button>
                </div>
              </div>
            </div>
          </section>
          {similarProperties.length > 0 && (
            <SimilarProperties
              properties={similarProperties}
              city={property.address.city}
            />
          )}
        </>
      )}
    </>
  );
}

export default SinglePropertyDetail;
