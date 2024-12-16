// components/PropertyTable.tsx
"use client";

import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarRange, Delete, Edit } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination as SwiperPagination } from "swiper/modules";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ResProperty } from "@/types/property";
import { CldImage } from "next-cloudinary";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { toast } from "sonner";
import Link from "next/link";
import formatDate from "@/lib/formatDate";

interface Props {
  properties: ResProperty[];
  fetchProperties: () => void;
}

export const PropertyTable: React.FC<Props> = ({
  properties,
  fetchProperties,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const filteredProperties = useMemo(() => {
    return properties.filter(
      (property) =>
        property.PropertyName.toLowerCase().includes(
          searchQuery.toLowerCase()
        ) ||
        property.address.city
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        property.propertyType
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        property.purpose.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [properties, searchQuery]);

  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProperties.slice(startIndex, endIndex);
  }, [filteredProperties, currentPage, itemsPerPage]);

  const handleRefresh = () => {
    fetchProperties(); // Call the function passed from the parent component
  };
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/properties`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      if (!data.success) throw new Error(data.message);
      toast.success(data.message);
      handleRefresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      toast.error("something Went Wrong");
    }
  };
  return (
    <>
      <ScrollArea className="md:w-full w-[92vw] mx-auto">
        <div className=" mx-auto md:px-4 py-8 shadow-lg">
          {/* Search Bar */}
          <Input
            type="text"
            placeholder="Search Properties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full absolute top-2 left-2 py-6 md:max-w-sm"
          />

          {/* Table */}
          <div className="mt-16">
            <Table>
              <TableHeader className="bg-secondary">
                <TableRow className="font-semibold text-lg text-center">
                  <TableCell className={""}>Images</TableCell>
                  <TableCell className={"min-w-44"}> Property Name</TableCell>
                  <TableCell className={"min-w-44"}>City </TableCell>
                  <TableCell>Type </TableCell>
                  <TableCell>Purpose </TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedProperties.length > 0 ? (
                  paginatedProperties.map((property) => (
                    <TableRow
                      className="text-center relative font-medium"
                      key={property._id}
                    >
                      <TableCell>
                        <Swiper
                          modules={[SwiperPagination]}
                          pagination={{ clickable: true }}
                          spaceBetween={10}
                          slidesPerView={1}
                          className="w-36 overflow-hidden rounded-md  h-36 md:w-32 md:h-32"
                        >
                          {property.images.map((image, index) => (
                            <SwiperSlide key={index}>
                              <CldImage
                                src={image}
                                width={150}
                                height={150}
                                quality={50}
                                alt="image"
                                className="overflow-hidden object-cover"
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </TableCell>
                      <TableCell>{property.PropertyName}</TableCell>
                      <TableCell>
                        {property.address.city} <br /> {property.street}{" "}
                        {property.address.area}{" "}
                      </TableCell>
                      <TableCell>{property.propertyType}</TableCell>
                      <TableCell>{property.purpose}</TableCell>
                      <TableCell>${property.price.toLocaleString()}</TableCell>
                      <div className="absolute bottom-1 flex gap-x-3 right-2">
                        <div className="flex mr-4 items-center gap-2">
                          <CalendarRange className="size-5 text-primary" />
                          <span className="text-sm text-muted-foreground">
                            {formatDate(property.createdAt)}
                          </span>
                        </div>
                        <Button
                          onClick={() => handleDelete(property._id)}
                          variant={"destructive"}
                          size={"icon"}
                        >
                          <Delete />
                        </Button>
                        <Link href={`/dashboard/edit/${property._id}`} prefetch>
                          <Button variant={"outline"} size={"icon"}>
                            <Edit />
                          </Button>
                        </Link>
                      </div>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      No properties found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="mt-6 flex justify-center md:justify-end">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(currentPage - 1)}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === index + 1}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};
