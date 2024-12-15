import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function PromotionBanner() {
  return (
    <div className="mt-2 bg-zinc-100 py-6">
      <AspectRatio ratio={1} className=" md:aspect-[16/9]">
        <div className="flex h-full w-full items-center justify-center bg-zinc-900">
          {/* Conteúdo futuro aqui */}
        </div>
      </AspectRatio>
      <div className="px-4 pt-4">
        <Carousel
          opts={{
            align: "center",
          }}
        >
          <CarouselContent className="-ml-4 ">
            {[1, 2, 3].map((item) => (
              <CarouselItem
                key={item}
                className="basis-[72%] pl-4 sm:basis-4/5 md:basis-1/3 lg:basis-1/4"
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
    </div>
  );
}
