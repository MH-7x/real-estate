import ContactForm from "@/components/ContactForm";
import GridCard from "@/components/GridCard";
import SearchInput from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SinResProperty } from "@/types/property";
import Image from "next/image";

export interface Main {
  success: boolean;
  data: SinResProperty[];
  pagination: Pagination;
}

export interface Pagination {
  total: number;
  page: number;
  totalPages: number;
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

const getSearchResult = async (query: string) => {
  try {
    const url = `${
      process.env.PUBLIC_URL || ""
    }/api/search?search=${encodeURIComponent(query)}&page=1&limit=3`;
    const result = await FetchURL(url);
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { success: false, message: "something went wrong" + error };
  }
};

async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const query = (await searchParams).query;
  const result: Main = await getSearchResult(query);

  return (
    <section className="mt-28 min-h-screen md:w-[94%] md:px-0 px-3 w-full mx-auto">
      <h1 className="md:text-4xl text-2xl font-semibold">
        Search Result For <span className="text-primary">{query}</span>
      </h1>
      {result.data.length > 0 && (
        <div className="md:mt-8 mt-5 mx-auto">
          <SearchInput />
        </div>
      )}
      <div className="grid md:grid-cols-3 grid-cols-1 gap-x-4 gap-y-2 md:mt-10 mt-5">
        <div className=" md:col-span-2 col-span-3">
          {result.data.length === 0 || !result.success ? (
            <div className="mx-auto md:w-4/5 py-5 rounded-xl w-full bg-secondary/50 flex items-center justify-center gap-y-3 flex-col">
              <Image
                src={"/searchNotFound.svg"}
                alt="No Search Data"
                width={200}
                height={200}
              />

              <>
                <h3 className="font-medium">
                  No Search Results For{" "}
                  <span className="font-semibold">{query}</span>..
                </h3>

                <p className="text-base -mt-2 text-muted-foreground">
                  Try searching for something else
                </p>
              </>
              <SearchInput />
            </div>
          ) : (
            <>
              {result.data.map((property: SinResProperty) => (
                <GridCard key={property._id} property={property} />
              ))}
            </>
          )}
        </div>
        <div className="md:col-span-1 col-span-3 border border-primary/10 rounded-lg px-3 py-8">
          <div className="grid grid-cols-2 gap-4">
            <Button size={"lg"} className="flex items-center md:gap-3 gap-1">
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

          <ContactForm
            propertyImageUrl={result.data[0].images[0]}
            propertyName="Search Properties Data"
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
    </section>
  );
}

export default SearchPage;
