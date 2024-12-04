"use client";
// import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

function SearchPro() {
  //   const [city, setCity] = useState<string | null>(null);
  return (
    <div className="w-full bg-secondary p-2 flex gap-3 items-center justify-start">
      <Input
        placeholder="search for properties..."
        className="py-6 md:w-96 w-[70%]"
      />
      <Select>
        <SelectTrigger className="py-6 md:w-96 w-[30%]">
          <SelectValue placeholder="show by cities" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="Marla">Marla</SelectItem>
            <SelectItem value="Sq. Ft">Sq. Ft</SelectItem>
            <SelectItem value="Sq. M">Sq. M</SelectItem>
            <SelectItem value="Sq. Yd">Sq. Yd</SelectItem>
            <SelectItem value="Kanal">Kanal</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default SearchPro;
