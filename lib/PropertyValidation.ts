import { z } from "zod";

export const PropertySchema = z.object({
  purpose: z.enum(["for sell", "for rent"]),
  propertyType: z.string().min(3),
  address: z.object({
    city: z.string().min(2),
    area: z.string().min(2),
  }),
  street: z.string().min(3),
  size: z.object({
    value: z.string().min(1, {
      message: "Size should be greater than 0",
    }),
    unit: z.enum(["Marla", "Sq. Ft", "Sq. M", "Sq. Yd", "Kanal"]),
  }),
  bedrooms: z.string().min(1), // Assuming 0 for studio, max 10
  bathrooms: z.string().min(1), // Validates numeric values 1-9, // Assuming 0 for studio, max 10
  PropertyName: z
    .string()
    .min(3, "PropertyName must be at least 3 characters long")
    .regex(/^[a-zA-Z0-9 ]*$/, "PropertyName must not contain special symbols"),
  condition: z.enum([
    "Brand New",
    "Excellent",
    "Good",
    "Need Minor Work",
    "Need Major Work",
  ]),
  price: z.string().refine((value) => /^[0-9]+$/.test(value), {
    message: "Price must be a valid numeric string and cannot be zero",
  }),
  FacebookVideoLink: z
    .string()
    .optional()
    .refine((value) => !value || z.string().url().safeParse(value).success, {
      message: "Please enter a valid URL",
    })
    .default(" "),
  amenities: z
    .array(z.object({ name: z.string(), value: z.string() }))
    .optional(),
  description: z.string().optional(),

  isFeatured: z.boolean().optional().default(false),
  discount: z.string().optional().default("0"),
});
