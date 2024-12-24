import formatDate from "@/lib/formatDate";
import { verifyToken } from "@/lib/jwt";
import { Rating } from "@/types/property";
import { cookies } from "next/headers";
import DeleteRating from "./DeleteRating";

async function RatingCard({ rating }: { rating: Rating }) {
  const token = (await cookies()).get("token");
  const isAdmin = verifyToken(token?.value);

  return (
    <div className="w-full rounded-lg p-4 bg-primary/5  mx-auto font-[sans-serif] relative">
      {isAdmin && <DeleteRating id={rating._id} />}
      <div className="my-6">
        <div className="flex space-x-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <svg
              key={index}
              className={`w-4 ${rating.rating > index ? "fill-[#facc15]" : "fill-[#CED5D8]"}`}
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
            </svg>
          ))}
          <small
            className={`text-[13px] font-semibold pl-2 ${rating.rating > 3 ? "text-green-700" : "text-[#575757]"}`}
          >
            {rating.rating} / 5
          </small>
        </div>
        <p className="text-[13px]/[22px] line-clamp-4 mt-2">{rating.review}</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex flex-wrap items-center cursor-pointer flex-1">
          <div className="w-7 h-7 rounded-full bg-primary/30 flex items-center justify-center">
            {rating.UserName[0]}
          </div>
          <p className="text-[13px]  ml-2">{rating.UserName}</p>
        </div>
        <p className="text-[13px] ">{formatDate(rating.createdAt)}</p>
      </div>
    </div>
  );
}

export default RatingCard;
