"use client";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

import { useRouter } from "next/navigation";

export function SelectComponent({
  data,
  type,
}: {
  data: { value: string; label: string | number }[] | undefined;
  type?: "area" | "type" | "size" | "sort";
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const router = useRouter();

  const updateAreaParam = (newParam: string) => {
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("area", newParam);
    const newUrl = `${window.location.pathname}?${currentParams.toString()}`;
    router.push(newUrl);
  };

  const updatePropertyTypeParam = (newParam: string) => {
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("propertyType", newParam);
    const newUrl = `${window.location.pathname}?${currentParams.toString()}`;
    router.push(newUrl);
  };

  const updateSizeParam = (sizeValue: number, sizeUnit: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("sizeValue", sizeValue.toString());
    url.searchParams.set("sizeUnit", sizeUnit.toString());
    router.push(`${url.pathname}?${url.searchParams.toString()}`);
  };

  const updateSortParam = (newParam: string) => {
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("sort", newParam);
    const newUrl = `${window.location.pathname}?${currentParams.toString()}`;
    router.push(newUrl);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] bg-primary/5 py-6 justify-between"
        >
          {type === "size"
            ? value
              ? data?.find(
                  (framework) =>
                    framework.label + " " + framework.value === value
                )?.label +
                " " +
                value.split(" ")[1]
              : `Select ${type}`
            : value
            ? data?.find((framework) => framework.value === value)?.label
            : `Select ${type}`}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${type}...`} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {type === "size"
                ? data?.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      onSelect={(currentValue) => {
                        updateSizeParam(
                          framework.label as number,
                          framework.value
                        );
                        setValue(currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === framework.label + " " + framework.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {framework.label} {framework.value}
                    </CommandItem>
                  ))
                : data?.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      onSelect={(currentValue) => {
                        if (type === "area") {
                          updateAreaParam(currentValue);
                        }
                        if (type === "type") {
                          updatePropertyTypeParam(currentValue);
                        }
                        if (type === "sort") {
                          updateSortParam(currentValue);
                        }
                        setValue(currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === framework.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {framework.label}
                    </CommandItem>
                  ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
