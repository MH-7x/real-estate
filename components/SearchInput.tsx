"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { CreditCard, Building2Icon, User, Search } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import Form from "next/form";
import { Button } from "./ui/button";
import { useState } from "react";
import Link from "next/link";

function SearchInput() {
  const [query, setQuery] = useState<string>("");
  return (
    <>
      <Dialog>
        <DialogTrigger className="md:w-max w-[98%]">
          <Form action={"/search"}>
            <div className="rounded-3xl md:w-[450px] w-full md:py-3 py-2 broder-primary flex justify-between items-center gap-2 border border-primary px-3 relative">
              search properties...
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Search size={23} className="text-primary-foreground" />
              </div>
            </div>
          </Form>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] w-[98%] rounded-xl">
          <DialogTitle className={"text-center text-primary"}>
            Search for properties
          </DialogTitle>
          <Command className="rounded-lg  border shadow-md">
            <Form className="" action={"/search"}>
              <CommandInput
                name="query"
                value={query}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setQuery(e.target.value)
                }
                placeholder="Type a city name or search..."
              />

              <CommandEmpty>
                <span className="font-semibold"> Search For</span>{" "}
                <DialogTrigger asChild>
                  <Button size={"sm"} type="submit" className="mx-auto">
                    {query}
                  </Button>
                </DialogTrigger>
              </CommandEmpty>
            </Form>
            <CommandList className="ss">
              <CommandGroup heading="properties">
                <Link href={"/properties?page=1&limit=5&purpose=for+sell"}>
                  <CommandItem>
                    <User />
                    <span>Properties for Sell</span>
                  </CommandItem>
                </Link>
                <Link href={"/properties?page=1&limit=5&purpose=for+rent"}>
                  <CommandItem>
                    <CreditCard />
                    <span>Properties for Rent</span>
                  </CommandItem>
                </Link>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Cities">
                <Link href={"/properties?area=hayatabad"}>
                  <CommandItem>
                    <Building2Icon />
                    <span>Peshawar Hayatabad</span>
                  </CommandItem>
                </Link>
                <Link href={"/properties?area=regi+model+town"}>
                  <CommandItem>
                    <Building2Icon />
                    <span>Regi model town</span>
                  </CommandItem>
                </Link>
                <Link href={"/properties?area=dha+peshawar"}>
                  <CommandItem>
                    <Building2Icon />
                    <span>DHA Peshawar</span>
                  </CommandItem>
                </Link>
                <Link href={"/properties?area=shiekh+yasen+town"}>
                  <CommandItem>
                    <Building2Icon />
                    <span>Shiekh yasen town</span>
                  </CommandItem>
                </Link>
                <Link href={"/properties?area=malak+town"}>
                  <CommandItem>
                    <Building2Icon />
                    <span>Malak town</span>
                  </CommandItem>
                </Link>
                <Link href={"/properties?area=park+view+city"}>
                  <CommandItem>
                    <Building2Icon />
                    <span>Islamabad park view</span>
                  </CommandItem>
                </Link>
                <Link href={"/properties?area=blue+world+city"}>
                  <CommandItem>
                    <Building2Icon />
                    <span>blue world city</span>
                  </CommandItem>
                </Link>
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SearchInput;
