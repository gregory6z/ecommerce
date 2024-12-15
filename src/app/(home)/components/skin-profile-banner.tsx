import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

export default function SkinProfileBanner() {
  return (
    <div className="pt-4 pl-4">
      <Carousel
        opts={{
          align: "start",
        }}
      >
        <CarouselContent className="-ml-4 ">
          {[1, 2, 3].map((item) => (
            <CarouselItem
              key={item}
              className="basis-[90%] pl-4 sm:basis-4/5 md:basis-1/3 lg:basis-1/4"
            >
              <AspectRatio ratio={1} className="">
                <div className="flex h-full w-full items-center justify-center bg-zinc-900">
                  {/* Conteúdo futuro aqui */}
                </div>
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
      </Carousel>
    </div>
  );
}
