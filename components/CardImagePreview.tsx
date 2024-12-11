import { ImageIcon } from "lucide-react";
import Image from "next/image";
export function CardImagesPreview({
  images,
  alt,
}: {
  images: string[];
  alt?: string;
}) {
  return (
    <>
      <div className="md:w-96 relative w-80 bg-white mx-auto rounded-xl overflow-hidden h-64">
        <Image
          src={images && images[0]}
          width={384}
          height={384}
          loading="lazy"
          alt={(alt && alt) || ""}
          className="overflow-hidden object-contain"
        />
        <div className="px-3 absolute bottom-2 left-2 py-1 rounded-xl bg-black/40 text-white flex items-center gap-2">
          <ImageIcon size={15} />
          <span className="text-sm">{images.length}</span>
        </div>
      </div>
    </>
  );
}
