"use client";
import { Result } from "@/types/property";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function SideFilterComponent({ filters }: { filters: Result[] }) {
  const [activeCity, setActiveCity] = React.useState("");
  const [activeCondition, setactiveCondition] = React.useState("");
  const [activeSize, setactiveSize] = React.useState("");

  const cities = filters && filters[0].cities;
  const conditions = filters && filters[0].conditions;
  const sizes = filters && filters[0].sizes;
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

  return (
    <>
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
                        onClick={() => updateCityParam(city)}
                        type="checkbox"
                        defaultChecked={city === activeCity}
                        className={`col-start-1 cursor-pointer row-start-1 appearance-none rounded border border-gray-300 bg-white ${
                          activeCity === city ? "border-primary bg-primary" : ""
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
                  <label className="text-sm text-gray-600">{city}</label>
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
                        onClick={() => updateConditionParam(condition)}
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
                  <label className="text-sm text-gray-600">{condition}</label>
                </div>
              ))}
          </div>
        </DisclosurePanel>
      </Disclosure>

      <Disclosure as="div" className="border-b border-gray-200 py-6">
        <h3 className="-my-3 flow-root">
          <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
            <span className="font-medium text-gray-900">Property Sizes</span>
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
                        onClick={() => updateSizeParam(size.value, size.unit)}
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
    </>
  );
}

export default SideFilterComponent;
