"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImagesProps {
  images: {
    url: string;
    altText: string;
  }[];
}

export default function ProductImages({ images }: ProductImagesProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="relative hidden justify-center gap-2 px-8 lg:px-0 xl:flex">
      <div className="-top-10 scrollbar-hidden sticky h-[690px] overflow-y-auto">
        {images.map((image, index) => (
          // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            className={`relative h-[160px] w-[130px] cursor-pointer ${
              selectedImage.url === image.url ? "border-2 border-zinc-400" : ""
            }`}
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image.url}
              alt={image.altText || ""}
              fill
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="-top-10 sticky h-[690px] flex-1 py-8">
        <Image
          src={selectedImage.url}
          alt={selectedImage.altText || ""}
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
