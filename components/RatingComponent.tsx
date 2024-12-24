"use client";
import React, { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const PropertyRating = ({ property }: { property: string | undefined }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setreview] = useState("");
  const [UserName, setUserName] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !review || !UserName) {
      toast.warning("Please provide a rating and review", {
        richColors: true,
      });
      return;
    }

    const data = {
      property: property && property,
      rating,
      review,
      UserName,
    };

    try {
      const response = await fetch("/api/rating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(response.statusText);
      const { message, success } = await response.json();
      if (!success) throw new Error(message);
      toast.success(message);
      setRating(0);
      setHover(0);
      setreview("");
      setUserName("");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  return (
    <div className="max-w-md  bg-white md:rounded-xl md:shadow-md overflow-hidden md:max-w-2xl m-4">
      <div className="md:p-8 p-1">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Leave Your Review
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label
              className="block text-gray-700 text-base font-semibold mb-2"
              htmlFor="rating"
            >
              Star Rating
            </Label>
            <div className="flex items-center">
              {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                  <Label key={index}>
                    <input
                      type="radio"
                      name="rating"
                      className="hidden"
                      value={ratingValue}
                      onClick={() => setRating(ratingValue)}
                    />
                    <Star
                      className="cursor-pointer transition-colors duration-200"
                      color={
                        ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                      }
                      size={30}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(0)}
                    />
                  </Label>
                );
              })}
            </div>
          </div>
          <div className="mb-4">
            <Label
              className="block text-gray-700 text-base font-semibold mb-2"
              htmlFor="UserName"
            >
              your name
            </Label>
            <Input
              value={UserName}
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              placeholder="your name"
            />
          </div>
          <div className="mb-4">
            <Label
              className="block text-gray-700 text-base font-semibold mb-2"
              htmlFor="review"
            >
              Your review about the property
            </Label>
            <Textarea
              placeholder="Write your review here..."
              value={review}
              onChange={(e) => setreview(e.target.value)}
            ></Textarea>
          </div>
          <div className="flex items-center justify-between">
            <Button type="submit">Submit Rating</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyRating;
