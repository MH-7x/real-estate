/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PropertySchema } from "@/lib/PropertyValidation";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Send, Upload } from "lucide-react";
import { Textarea } from "./ui/textarea";
import UploadWidget, { CloudinaryWidgetResult } from "./UploadComponent";
import { Switch } from "./ui/switch";
import { useRouter } from "next/navigation";
import ImagesPreview from "./ImagesPreview";
import { useCallback, useEffect, useState } from "react";
import { Input } from "./ui/input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  bathroomsOptions,
  bedroomOptions,
  cityDistrictData,
  commerical,
  Condition,
  conditions,
  plot,
  popularCities,
  Purpose,
  resident,
  SinResProperty,
  Unit,
} from "@/types/property";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AmenitiesComponent } from "./AmentiesComponent";
import { Amenities } from "@/types/Amenities";
import Image from "next/image";

export default function ProperyForm({
  property,
}: {
  property?: SinResProperty;
}) {
  const router = useRouter();

  const [Amenities, setAmenities] = useState<Amenities[]>([]);

  useEffect(() => {
    console.log("Property updated:", property);
    if (property?.amenities) {
      setAmenities(property.amenities);
    }
  }, [property]);

  const [openInput, setOpenInput] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(
    property?.address.city || null
  );
  const [districts, setDistricts] = useState<
    { value: string; label: string }[]
  >(selectedCity ? cityDistrictData[selectedCity] || [] : []);

  const [images, setImages] = useState<string[]>(property?.images || []);
  const [selected, setSelected] = useState<string | number | null>(
    property?.bedrooms.toString() || null
  );
  const [BathSelect, setBathSelect] = useState<string | number | null>(
    property?.bathrooms.toString() || null
  );
  const [proType, setProtype] = useState<string | number | null>(
    property?.propertyType || null
  );

  useEffect(() => {
    if (selectedCity) {
      setDistricts(cityDistrictData[selectedCity] || []);
    }
  }, [selectedCity]);

  const form = useForm<z.infer<typeof PropertySchema>>({
    defaultValues: {
      address: {
        city: property?.address.city || "",
        area: property?.address.area || "",
      },
      street: property?.street || "",
      size: {
        value: String(property?.size.value || ""),
        unit: (property?.size.unit as Unit) || undefined,
      },
      purpose: (property?.purpose as Purpose) || "",
      propertyType: property?.propertyType || "",
      condition: (property?.condition as Condition) || "",
      bedrooms: String(property?.bedrooms) || "",
      bathrooms: String(property?.bathrooms) || "",
      PropertyName: property?.PropertyName || "",
      price: String(property?.price) || "",
      FacebookVideoLink:
        (property?.FacebookVideoLink && String(property.FacebookVideoLink)) ||
        "",
      amenities: [],
      description: property?.description || "",
      isFeatured: property?.isFeatured || false,
      discount: (property?.discount && property.discount.toString()) || "0",
    },
    resolver: zodResolver(PropertySchema),
  });

  const { isDirty } = form.formState;

  const onSubmit = useCallback(
    async (data: z.infer<typeof PropertySchema>) => {
      if (images.length === 0) {
        toast.error("Please upload at least one image");
        return;
      }
      data.amenities = Amenities;
      const finalData = { ...data, images };
      console.log("finalData", finalData);

      try {
        const response = await fetch("/api/properties", {
          method: property ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            property ? { ...finalData, id: property._id } : finalData
          ),
        });

        if (!response.ok) throw new Error("Failed to save property");

        const responseData = await response.json();

        if (!responseData.success) {
          toast.error(responseData.message);
        } else {
          toast.success(responseData.message);
          form.reset();
          setImages([]);
          router.push("/dashboard/list-all");
        }
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      }
    },
    [images, property, form, router, Amenities]
  );

  const handleUpload = useCallback(
    (error: any, result: CloudinaryWidgetResult) => {
      if (error) {
        console.error("Upload Error:", error);
        toast.error("Image upload failed");
        return;
      }

      if (result?.event === "success") {
        setImages((prev) => [...prev, result.info.secure_url]);
      }
    },
    []
  );

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = ""; // Show a native browser dialog
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-16 md:space-y-10 flex items-start justify-center flex-col w-full "
        >
          <FormField
            control={form.control}
            name="purpose"
            render={({ field }) => (
              <FormItem className="space-y-3 mx-auto">
                <FormLabel className="text-lg block text-center">
                  What do you want to do?{" "}
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-4"
                  >
                    <FormItem className="flex bg-secondary rounded-md p-3 items-center space-x-1 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="for sell" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Sell Property
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center bg-secondary rounded-md p-3 space-x-1 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="for rent" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Rent Property
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="propertyType"
            render={({}) => (
              <FormItem className="space-y-3 mx-auto">
                <FormLabel className="text-lg text-center w-full  block">
                  What kind of property do you have?
                </FormLabel>
                <FormControl>
                  <Tabs
                    defaultValue="Residential"
                    className="lg:w-[700px] w-full rounded-lg bg-secondary p-4"
                  >
                    <TabsList className="grid w-full grid-cols-3 mb-5">
                      <TabsTrigger value="Residential">Residential</TabsTrigger>
                      <TabsTrigger value="Plot">Plot</TabsTrigger>
                      <TabsTrigger value="Commercial">Commercial</TabsTrigger>
                    </TabsList>
                    <TabsContent value="Residential">
                      <div className="flex flex-wrap gap-2">
                        {resident.map((value) => (
                          <button
                            type="button"
                            key={value}
                            onClick={() => {
                              form.setValue("propertyType", value);
                              setProtype(value);
                            }}
                            className={cn(
                              "px-4 py-2 border rounded-full text-sm",
                              proType === value
                                ? "bg-primary text-white border-primary"
                                : "bg-white border-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="Plot">
                      <div className="flex flex-wrap gap-2">
                        {plot.map((value) => (
                          <button
                            type="button"
                            key={value}
                            onClick={() => {
                              form.setValue("propertyType", value);
                              setProtype(value);
                            }}
                            className={cn(
                              "px-4 py-2 border rounded-full text-sm",
                              proType === value
                                ? "bg-primary text-white border-primary"
                                : "bg-white border-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="Commercial">
                      <div className="flex flex-wrap gap-2">
                        {commerical.map((value) => (
                          <button
                            type="button"
                            key={value}
                            onClick={() => {
                              form.setValue("propertyType", value);
                              setProtype(value);
                            }}
                            className={cn(
                              "px-4 py-2 border rounded-full text-sm",
                              proType === value
                                ? "bg-primary text-white border-primary"
                                : "bg-white border-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address.city"
            render={({ field }) => (
              <FormItem className="space-y-3 mx-auto md:w-[500px] w-80">
                <FormLabel className="text-lg block text-center">
                  Which city is your property in?
                </FormLabel>
                <Popover open={openInput} onOpenChange={setOpenInput}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "md:w-[500px] w-full justify-between",
                          !field.value && "text-muted-foreground "
                        )}
                      >
                        {field.value
                          ? popularCities.find(
                              (city) => city.value === field.value
                            )?.label
                          : "Select city..."}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 md:w-[500px] w-80">
                    <Command>
                      <CommandInput
                        placeholder="Search cities..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No city found.</CommandEmpty>
                        <CommandGroup>
                          {popularCities.map((city) => (
                            <CommandItem
                              value={city.label}
                              key={city.value}
                              onSelect={() => {
                                form.setValue("address.city", city.value);
                                setSelectedCity(city.value);
                                setOpenInput(false);
                                setDistricts([]);
                              }}
                            >
                              {city.label}
                              <Check
                                className={cn(
                                  "",
                                  city.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address.area"
            render={({ field }) => (
              <FormItem className="space-y-3 mx-auto md:w-[500px] w-80">
                <FormLabel className="text-lg block text-center">
                  Which area/district property in?
                </FormLabel>
                <Select onValueChange={field.onChange} {...field}>
                  <SelectTrigger className="">
                    <SelectValue placeholder=" select area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {districts.map((district, i) => (
                        <SelectItem
                          value={district.value}
                          key={district.value + i}
                        >
                          {district.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem className="space-y-3 mx-auto md:w-[500px] w-80">
                <FormLabel className="text-lg block text-center">
                  which street is your property in?
                </FormLabel>
                <FormControl>
                  <Input placeholder="street address ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex md:w-[500px] w-full gap-1 mx-auto">
            <FormField
              control={form.control}
              name="size.value"
              render={({ field }) => (
                <FormItem className="space-y-3 md:w-[350px] w-[60%]">
                  <FormLabel className="text-lg block">
                    size of propery
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="size of property"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="size.unit"
              render={({ field }) => (
                <FormItem className="space-y-3 md:w-[150px] w-[40%] mt-10">
                  <Select onValueChange={field.onChange} {...field}>
                    <SelectTrigger className="">
                      <SelectValue placeholder=" Units" />
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className=" flex flex-col gap-y-5 items-center w-full justify-center">
            {images.length > 0 && (
              <div className="w-full md:w-[500px] mx-auto transition-all bg-secondary rounded-lg p-5 flex items-start justify-start flex-wrap gap-5">
                <ImagesPreview images={images} />
              </div>
            )}

            <UploadWidget onUpload={handleUpload}>
              {({ open }) => (
                <Button
                  type="button"
                  className="w-full mx-auto md:w-96"
                  size={"lg"}
                  onClick={() => {
                    open();
                  }}
                >
                  Upload Image <Upload />
                </Button>
              )}
            </UploadWidget>
          </div>

          <div className="space-y-3 mx-auto md:w-[500px] w-full mt-10">
            <p className="md:text-xl block text-center font-semibold">
              What amenities are available?
            </p>
            <p className="text-sm text-center text-muted-foreground">
              Add additional features e.g balcony, utilities, security details
              etc. (Optional)
            </p>
            <div className="w-full md:w-[500px] flex items-center justify-center flex-col  mx-auto bg-secondary rounded-lg p-5">
              <p>{Amenities.length}</p>
              <p>{property?.amenities.length}</p>

              {Amenities.length > 0 && (
                <div className="w-full  mb-4 grid md:grid-cols-3 grid-cols-2 gap-4">
                  {Amenities.map((amenity) => (
                    <div
                      key={amenity.id}
                      className="bg-white shadow shadow-black/5 flex items-center justify-center rounded-2xl px-2 py-3 flex-col gap-y-1"
                    >
                      <Image
                        src={amenity.icon}
                        alt={amenity.name}
                        width={18}
                        height={18}
                      />
                      <p className="text-sm text-center font-semibold">
                        {!amenity.isToggle && amenity.count} {amenity.name}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <AmenitiesComponent
                initialFeatures={property?.amenities || []} // Pass initial features
                onFeaturesUpdate={(features) => setAmenities(features)}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="condition"
            render={({ field }) => (
              <FormItem className="space-y-3 mx-auto md:w-[500px] w-full mt-10">
                <FormLabel className="text-lg block text-center">
                  What is the Property Condition
                </FormLabel>
                <Select onValueChange={field.onChange} {...field}>
                  <SelectTrigger className="md:w-[500px] w-full">
                    <SelectValue placeholder=" select property condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Property Condition</SelectLabel>
                      {conditions.map((condition) => (
                        <SelectItem key={condition} value={condition}>
                          {condition}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="space-y-3 md:w-[500px] w-full mx-auto">
                <FormLabel className="text-lg text-center block">
                  What is Asking Price
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="write asking price"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bedrooms"
            render={({}) => (
              <FormItem className="space-y-3 md:w-[500px] mx-auto w-full">
                <FormLabel className="text-lg block text-center">
                  How many bedrooms does it have?
                </FormLabel>

                <FormControl>
                  <div className="flex flex-wrap gap-2">
                    {bedroomOptions.map((option) => (
                      <button
                        type="button"
                        key={option.value}
                        onClick={() => {
                          form.setValue("bedrooms", option.value);
                          setSelected(option.value);
                        }}
                        className={cn(
                          "px-4 py-2 border rounded-full text-sm",
                          selected === option.value
                            ? "bg-primary text-white border-primary"
                            : "bg-white text-muted-foreground border-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bathrooms"
            render={({}) => (
              <FormItem className="space-y-3 md:w-[500px] mx-auto w-full">
                <FormLabel className="text-lg block text-center">
                  How many bedrooms does it have?
                </FormLabel>
                <FormControl>
                  <div className="flex flex-wrap gap-2">
                    {bathroomsOptions.map((option) => (
                      <button
                        type="button"
                        key={option.value}
                        onClick={() => {
                          form.setValue("bathrooms", option.value);
                          setBathSelect(option.value);
                        }}
                        className={cn(
                          "px-4 py-2 border rounded-full text-sm",
                          BathSelect === option.value
                            ? "bg-primary text-white border-primary"
                            : "bg-white text-muted-foreground border-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="PropertyName"
            render={({ field }) => (
              <FormItem className="space-y-3 md:w-[500px] mx-auto w-full relative">
                <FormLabel className="text-lg text-center block">
                  Whats the property name
                </FormLabel>
                <FormControl className="">
                  <Input
                    type="text"
                    placeholder="property name"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="FacebookVideoLink"
            render={({ field }) => (
              <FormItem className="space-y-3 md:w-[500px] mx-auto w-full relative">
                <FormLabel className="text-lg text-center block">
                  TikTok Video Link
                </FormLabel>
                <FormControl className="">
                  <Input
                    type="text"
                    placeholder="past tiktok video link"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="space-y-3 md:w-[500px] mx-auto w-full relative">
                <FormLabel className="text-lg text-center block">
                  Detail Property Description
                </FormLabel>
                <FormControl className="">
                  <Textarea
                    placeholder="property description"
                    {...field}
                    value={field.value ?? ""}
                  ></Textarea>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem className="space-y-3 md:w-[500px] mx-auto w-full relative">
                <FormLabel className="text-lg text-center block">
                  Discount Value (if it is )
                </FormLabel>
                <FormControl className="">
                  <Input type="number" placeholder="discount" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isFeatured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center md:w-[500px] mx-auto w-full justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Is this property featured</FormLabel>
                  <FormDescription>
                    This property will appear on the main home page
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="py-7 md:w-[500px] w-full mx-auto" type="submit">
            {property ? "Update Now" : "Create Now"} <Send />
          </Button>
        </form>
      </Form>
    </>
  );
}
