"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Filter, MinusIcon, PlusIcon, X } from "lucide-react";
import { Result } from "@/types/property";
import { useRouter } from "next/navigation";
function MobileFilterDialog({
  subCategories,
  filters,
}: {
  filters: Result[];
  subCategories: {
    name: string;
    href: string;
  }[];
}) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [activeCity, setActiveCity] = React.useState("");
  const [activeCondition, setactiveCondition] = React.useState("");
  const [activeSize, setactiveSize] = React.useState("");
  const [activeArea, setActiveArea] = React.useState("");
  const cities = filters && filters[0].cities;
  const conditions = filters && filters[0].conditions;
  const sizes = filters && filters[0].sizes;
  const areas = filters && filters[0].areas;
  const router = useRouter();

  const updateCityParam = (newCity: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("city", newCity.toString());
    setActiveCity(newCity);
    router.push(`${url.pathname}?${url.searchParams.toString()}`);
  };

  const updateConditionParam = (newCondition: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("condition", newCondition.toString());
    setactiveCondition(newCondition);
    router.push(`${url.pathname}?${url.searchParams.toString()}`);
  };

  const updateSizeParam = (sizeValue: number, sizeUnit: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("sizeValue", sizeValue.toString());
    url.searchParams.set("sizeUnit", sizeUnit.toString());
    setactiveSize(`${sizeValue}-${sizeUnit}`);
    router.push(`${url.pathname}?${url.searchParams.toString()}`);
  };
  const updateAreaParam = (newArea: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("area", newArea.toString());
    setActiveArea(newArea);
    router.push(`${url.pathname}?${url.searchParams.toString()}`);
  };

  return (
    <>
      <div
        onClick={() => setMobileFiltersOpen(true)}
        className=" absolute text-gray-400 hover:text-gray-500 top-[136px] right-4 z-10 lg:hidden flex items-center gap-2"
      >
        <Filter className="size-5  " />
        <span>Filters</span>
      </div>
      <Dialog
        open={mobileFiltersOpen}
        onClose={setMobileFiltersOpen}
        className="relative z-40 lg:hidden "
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative ml-auto px-4 flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
          >
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
              >
                <span className="sr-only">Close menu</span>
                <X aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Filters */}
            <form className="mt-4 border-t border-gray-200">
              <h3 className="sr-only">Categories</h3>
              <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                {subCategories.map((category) => (
                  <li key={category.name}>
                    <a
                      href={category.href}
                      onClick={() => setMobileFiltersOpen(false)}
                      className="block px-2 py-3"
                    >
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul>
              <Disclosure as="div" className="border-b border-gray-200 py-6">
                <h3 className="-my-3 flow-root">
                  <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">Cities</span>
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
                                onClick={() => {
                                  setMobileFiltersOpen(false);
                                  updateCityParam(city);
                                }}
                                type="checkbox"
                                defaultChecked={city === activeCity}
                                className={`col-start-1 cursor-pointer row-start-1 appearance-none rounded border border-gray-300 bg-white ${
                                  activeCity === city
                                    ? "border-primary bg-primary"
                                    : ""
                                }`}
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
              <Disclosure as="div" className="border-b border-gray-200 py-6">
                <h3 className="-my-3 flow-root">
                  <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">Areas</span>
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
                    {areas &&
                      areas.map((area) => (
                        <div key={area} className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                onClick={() => {
                                  setMobileFiltersOpen(false);
                                  updateAreaParam(area);
                                }}
                                type="checkbox"
                                defaultChecked={area === activeArea}
                                className={`col-start-1 cursor-pointer row-start-1 appearance-none rounded border border-gray-300 bg-white ${
                                  activeArea === area
                                    ? "border-primary bg-primary"
                                    : ""
                                }`}
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
                            {area}
                          </label>
                        </div>
                      ))}
                  </div>
                </DisclosurePanel>
              </Disclosure>

              <Disclosure as="div" className="border-b border-gray-200 py-6">
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
                                onClick={() => {
                                  setMobileFiltersOpen(false);
                                  updateConditionParam(condition);
                                }}
                                type="checkbox"
                                className={`col-start-1 cursor-pointer row-start-1 appearance-none rounded border border-gray-300 bg-white ${
                                  activeCondition === condition
                                    ? "border-primary bg-primary"
                                    : ""
                                }`}
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

              <Disclosure as="div" className="border-b border-gray-200 py-6">
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
                                onClick={() => {
                                  setMobileFiltersOpen(false);
                                  updateSizeParam(size.value, size.unit);
                                }}
                                type="checkbox"
                                className={`col-start-1 cursor-pointer row-start-1 appearance-none rounded border border-gray-300 bg-white ${
                                  activeSize === `${size.value}-${size.unit}`
                                    ? "border-primary bg-primary"
                                    : ""
                                }`}
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
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

export default MobileFilterDialog;
