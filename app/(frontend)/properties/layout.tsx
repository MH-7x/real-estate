import MobileFilterDialog from "@/components/MobileFilterDialog";
import { FilterResponse } from "@/types/property";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";

import {
  ChevronDownIcon,
  TrainFrontTunnelIcon,
  MinusIcon,
  PlusIcon,
  FilterXIcon,
} from "lucide-react";
import Image from "next/image";

const sortOptions = [
  { name: "Recently Added", href: "#", current: true },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
  { name: "Featured Only", href: "#", current: false },
];
const subCategories = [
  { name: "Properties For Sell", href: "#" },
  { name: "Properties For Rent", href: "#" },
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
  const cities = filterData.success && filterData.result[0].cities;
  const conditions = filterData.success && filterData.result[0].conditions;
  const sizes = filterData.success && filterData.result[0].sizes;
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
                <h1 className="font-bold lg:block hidden md:text-4xl text-2xl">
                  Properties
                </h1>
                <div className="flex items-center">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <MenuButton className="group md:mr-0 mr-2 inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
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
                            <a
                              href={option.href}
                              className={classNames(
                                option.current
                                  ? "font-medium bg-secondary rounded-lg text-gray-900"
                                  : "text-gray-500",
                                "block px-4 py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:outline-none "
                              )}
                            >
                              {option.name}
                            </a>
                          </MenuItem>
                        ))}
                      </div>
                    </MenuItems>
                  </Menu>

                  <button
                    type="button"
                    className="-m-2 flex items-center gap-2  md:ml-5 mr-[80px] p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                  >
                    <span className="sr-only">View grid</span>
                    <FilterXIcon aria-hidden="true" className="size-5" /> clear
                    filter
                  </button>
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
                    <h3 className="sr-only">Categories</h3>
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
                    <Disclosure
                      as="div"
                      className="border-b border-gray-200 py-6"
                    >
                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            Cities
                          </span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon
                              aria-hidden="true"
                              className="size-5 group-data-[open]:hidden"
                            />
                            <MinusIcon
                              aria-hidden="true"
                              className="size-5 group-[&:not([data-open])]:hidden"
                            />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-4">
                          {cities &&
                            cities.map((city) => (
                              <div key={city} className="flex gap-3">
                                <div className="flex h-5 shrink-0 items-center">
                                  <div className="group grid size-4 grid-cols-1">
                                    <input
                                      defaultValue={city}
                                      type="checkbox"
                                      className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                    />
                                    <svg
                                      fill="none"
                                      viewBox="0 0 14 14"
                                      className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                    >
                                      <path
                                        d="M3 8L6 11L11 3.5"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="opacity-0 group-has-[:checked]:opacity-100"
                                      />
                                      <path
                                        d="M3 7H11"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                      />
                                    </svg>
                                  </div>
                                </div>
                                <label className="text-sm text-gray-600">
                                  {city}
                                </label>
                              </div>
                            ))}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>

                    <Disclosure
                      as="div"
                      className="border-b border-gray-200 py-6"
                    >
                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            Property Conditions
                          </span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon
                              aria-hidden="true"
                              className="size-5 group-data-[open]:hidden"
                            />
                            <MinusIcon
                              aria-hidden="true"
                              className="size-5 group-[&:not([data-open])]:hidden"
                            />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-4">
                          {conditions &&
                            conditions.map((condition) => (
                              <div key={condition} className="flex gap-3">
                                <div className="flex h-5 shrink-0 items-center">
                                  <div className="group grid size-4 grid-cols-1">
                                    <input
                                      defaultValue={condition}
                                      type="checkbox"
                                      className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                    />
                                    <svg
                                      fill="none"
                                      viewBox="0 0 14 14"
                                      className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                    >
                                      <path
                                        d="M3 8L6 11L11 3.5"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="opacity-0 group-has-[:checked]:opacity-100"
                                      />
                                      <path
                                        d="M3 7H11"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                      />
                                    </svg>
                                  </div>
                                </div>
                                <label className="text-sm text-gray-600">
                                  {condition}
                                </label>
                              </div>
                            ))}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>

                    <Disclosure
                      as="div"
                      className="border-b border-gray-200 py-6"
                    >
                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            Property Sizes
                          </span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon
                              aria-hidden="true"
                              className="size-5 group-data-[open]:hidden"
                            />
                            <MinusIcon
                              aria-hidden="true"
                              className="size-5 group-[&:not([data-open])]:hidden"
                            />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-4">
                          {sizes &&
                            sizes.map((size) => (
                              <div key={size.value} className="flex gap-3">
                                <div className="flex h-5 shrink-0 items-center">
                                  <div className="group grid size-4 grid-cols-1">
                                    <input
                                      defaultValue={size.value}
                                      type="checkbox"
                                      className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                    />
                                    <svg
                                      fill="none"
                                      viewBox="0 0 14 14"
                                      className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                    >
                                      <path
                                        d="M3 8L6 11L11 3.5"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="opacity-0 group-has-[:checked]:opacity-100"
                                      />
                                      <path
                                        d="M3 7H11"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                      />
                                    </svg>
                                  </div>
                                </div>
                                <label className="text-sm text-gray-600">
                                  {size.value + " " + size.unit}
                                </label>
                              </div>
                            ))}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
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
