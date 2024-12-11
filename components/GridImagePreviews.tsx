import { ImageIcon } from "lucide-react";
import Image from "next/image";

function GridImagePreviews({ images, alt }: { images: string[]; alt: string }) {
  return (
    <div className="bg-secondary rounded-lg md:col-span-2 col-span-5  overflow-hidden relative">
      <div className="w-full md:h-[300px] h-[250px] overflow-hidden">
        <Image
          src={images[0]}
          alt={alt}
          width={400}
          height={400}
          className="object-cover h-full w-full object-center "
        />
      </div>
      <div className="px-3 absolute bottom-2 left-2 py-1 rounded-xl bg-black/40 text-white flex items-center gap-2">
        <ImageIcon size={15} />
        <span className="text-sm">{images.length}</span>
      </div>
    </div>
  );
}

export default GridImagePreviews;
