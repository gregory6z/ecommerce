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

export function CarouselProduct({ images }: CarouselProductProps) {
  return (
    <Carousel
      opts={{
        align: "center",
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-1 w-full">
        {images.map((image) => (
          <CarouselItem
            key={image.url}
            className="basis-[100%] pl-1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
          >
            <AspectRatio ratio={4 / 5} className="md:aspect-[16/9]">
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
