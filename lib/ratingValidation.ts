import { z } from "zod";

export const ratingValidation = z.object({
  rating: z.number().min(1).max(5),
  review: z
    .string()
    .min(2, {
      message: "Review must be at least 2 characters long",
    })
    .max(1000, {
      message: "Review must be at most 1000 characters long",
    }),
  UserName: z
    .string()
    .min(1, {
      message: "Username is required",
    })
    .max(100, {
      message: "Username must be at most 100 characters long",
    }),
});
