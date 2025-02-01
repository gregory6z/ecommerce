import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";

interface CarouselProductProps {
  images: {
    url: string;
    altText: string;
  }[];
}

export function CarouselImageProduct({ images }: CarouselProductProps) {
  return (
    <Carousel
      opts={{
        align: "center",
      }}
      className="w-full xl:hidden"
    >
      <CarouselContent className="-ml-1 w-full">
        {images.map((image) => (
          <CarouselItem key={image.url} className="basis-[100%] pl-1 ">
            <AspectRatio ratio={4 / 5} className="">
              <div className="flex h-full w-full items-center justify-center ">
                <Image
                  width={800}
                  className="h-full w-full object-fill"
                  height={800}
                  src={image.url}
                  alt={image.altText ?? "Image"}
                />
              </div>
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
