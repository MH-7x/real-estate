import { GetPropertyData, getPropertyRating } from "@/actions/FetchData";
import RatingCard from "@/components/RatingCard";
import PropertyRating from "@/components/RatingComponent";
import { Rating, SinResProperty } from "@/types/property";
import Image from "next/image";
import React from "react";

async function Ratings({ params }: { params: Promise<{ name: string }> }) {
  const name = (await params).name;

  let property: SinResProperty | null = null;
  let ratingData: Rating[] = [];
  property = await GetPropertyData(name);
  if (!property) return null;
  ratingData = await getPropertyRating(property?._id);
  return (
    <>
      <PropertyRating property={property?._id} />
      <section
        className={
          "my-20  md:w-11/12 w-full grid md:grid-cols-3 grid-cols-1 md:px-0 px-3 gap-5 mx-auto"
        }
      >
        {ratingData && ratingData.length > 0 ? (
          ratingData.map((rating, i) => (
            <RatingCard rating={rating} key={rating.property + i} />
          ))
        ) : (
          <div className="col-span-3  flex items-center justify-center">
            <div className="md:w-[500px] w-80 bg-secondary/50 rounded-lg p-4 flex flex-col items-center justify-center">
              <Image
                src={"/review.svg"}
                alt="no review found"
                width={200}
                height={200}
              />
              <h3>No Review Yet</h3>
              <p className="text-base text-accent-foreground">
                Be the first to review this property
              </p>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default Ratings;
