import MobileFilterDialog from "@/components/MobileFilterDialog";
import SideFilterComponent from "@/components/SideFilterComponent";
import { FilterResponse } from "@/types/property";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import { ChevronDownIcon, TrainFrontTunnelIcon } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

const sortOptions = [
  {
    name: "Recently Added",
    href: "?page=1&limit=5",
    current: true,
  },
  {
    name: "Price: Low to High",
    href: "?page=1&limit=5&sort=lowToHigh",
    current: false,
  },
  {
    name: "Price: High to Low",
    href: "?page=1&limit=5&sort=highToLow",
    current: false,
  },
  {
    name: "Featured Only",
    href: "?page=1&limit=5&isFeatured=true",
    current: false,
  },
];

const subCategories = [
  { name: "Properties For Sell", href: "?page=1&limit=5&purpose=for+sell" },
  { name: "Properties For Rent", href: "?page=1&limit=5&purpose=for+rent" },
];
let errors = "";
const getFiltersData = async () => {
  errors = "";
  const response = await fetch(`${process.env.PUBLIC_URL}/api/get-data`, {
    method: "POST",
  });

  if (!response.ok) errors = response.statusText;

  return response.json();
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const filterData: FilterResponse = await getFiltersData();

  if (!filterData.success) {
    errors = "network error, try again or refersh the page";
  }

  const ReqHeaders = headers();
  const isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Opera Mini/i.test(
    (await ReqHeaders).get("user-agent") || ""
  );
  return (
    <>
      {filterData.success ? (
        <div className="bg-white mt-10">
          <div>
            <MobileFilterDialog
              filters={filterData.result}
              subCategories={subCategories}
            />
            <main className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
              <div className="flex items-baseline md:justify-between justify-end border-b border-gray-200 md:pb-6 pb-3 pt-24">
                {!isMobile && (
                  <h1 className="font-bold lg:block hidden md:text-4xl text-2xl">
                    Properties For Sell & Rent
                  </h1>
                )}

                <div className="flex items-center">
                  <Menu as="div" className="relative inline-block text-left">
                    <div className={"mr-20"}>
                      <MenuButton
                        className={`group md:mr-0 mr-2 inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900`}
                      >
                        Sort By
                        <ChevronDownIcon
                          aria-hidden="true"
                          className=" size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                        />
                      </MenuButton>
                    </div>

                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in px-1"
                    >
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <MenuItem key={option.name}>
                            <Link
                              href={option.href}
                              className={classNames(
                                option.current
                                  ? "font-medium bg-secondary rounded-lg text-gray-900"
                                  : "text-gray-500",
                                "block px-4 py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:outline-none "
                              )}
                            >
                              {option.name}
                            </Link>
                          </MenuItem>
                        ))}
                      </div>
                    </MenuItems>
                  </Menu>

                  <button
                    type="button"
                    className="-m-2 ml-4 p-2 hidden text-white sm:ml-6"
                  >
                    <span className="sr-only">Filters</span>
                    <TrainFrontTunnelIcon
                      aria-hidden="true"
                      className="size-5"
                    />
                  </button>
                </div>
              </div>

              <section
                aria-labelledby="products-heading"
                className="pb-24 pt-6"
              >
                <h2 id="products-heading" className="sr-only">
                  properties
                </h2>

                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                  {/* Filters */}
                  <form className="hidden lg:block">
                    <h3 className="sr-only">Data filters</h3>
                    <ul
                      role="list"
                      className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                    >
                      {subCategories.map((category) => (
                        <li key={category.name}>
                          <a href={category.href}>{category.name}</a>
                        </li>
                      ))}
                    </ul>
                    <SideFilterComponent filters={filterData.result} />
                  </form>

                  <div className="lg:col-span-3">{children}</div>
                </div>
              </section>
            </main>
          </div>
        </div>
      ) : (
        <div
          className={
            "min-h-96 mt-20 max-w-4xl mx-auto rounded-xl bg-secondary flex items-center justify-center flex-col gap-3"
          }
        >
          <Image src={"/error.svg"} alt="error" width={150} height={150} />
          <h3>{errors}</h3>
        </div>
      )}
    </>
  );
}
