import { ImageIcon, MapPinCheck } from "lucide-react";
import Image from "next/image";
export function CardImagesPreview({
  images,
  alt,
  price = "0",
  location,
}: {
  images: string[];
  alt?: string;
  price?: string;
  location: string;
}) {
  return (
    <>
      <div className="md:w-96 relative w-full bg-secondary mx-auto rounded-lg overflow-hidden md:h-80 h-72">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-black/50">
          <div className="absolute bottom-7 left-4 py-1  text-white flex items-center gap-2">
            <p className="font-semibold text-xl drop-shadow text-white">
              {price}
            </p>
          </div>
          <div className="absolute bottom-2 left-4 py-1  text-white flex items-center gap-1">
            <MapPinCheck className="size-4" />
            <p className="text-sm drop-shadow text-white">{location}</p>
          </div>
        </div>
        <Image
          src={images && images[0]}
          width={384}
          height={384}
          loading="lazy"
          alt={(alt && alt) || ""}
          className="overflow-hidden object-cover"
        />
        <div className=" absolute bottom-1 right-2 py-1 text-white flex items-center gap-2">
          <ImageIcon size={15} />
          <span className="text-sm">{images.length}</span>
        </div>
      </div>
    </>
  );
}
