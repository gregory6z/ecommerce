import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

export function CarouselProduct() {
  return (
    <Carousel
      opts={{
        align: "center",
        containScroll: "trimSnaps",
      }}
    >
      <CarouselContent className="-ml-1 [&>*]:max-w-[324px]">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <CarouselItem
            key={item}
            className="basis-[100%] pl-1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
          >
            <AspectRatio ratio={4 / 5} className="md:aspect-[16/9]">
              <div className="flex h-full w-full items-center justify-center bg-zinc-200">
                {/* Conteúdo futuro aqui */}
              </div>
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
    </Carousel>
  );
}
