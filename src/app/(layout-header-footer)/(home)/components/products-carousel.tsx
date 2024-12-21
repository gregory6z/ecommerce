import { ProductCard } from "@/components/product/product-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProductCarouselProps {
  title: string;
}

export default function ProductsCarousel({ title }: ProductCarouselProps) {
  return (
    <section className=" mt-8 mb-10 pl-4 md:mt-12 md:mb-14 md:pl-8 lg:mt-24 lg:mb-40 lg:pl-16">
      <Carousel
        className="relative"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <header className="mb-6 flex items-center justify-between pr-4 lg:justify-start lg:gap-8">
          <h2 className="font-bold text-xl lg:text-2xl ">{title}</h2>
          <p className="font-bold underline">Voir Tout</p>
        </header>

        <div className="hidden lg:block">
          <CarouselPrevious />
          <CarouselNext />
        </div>

        <CarouselContent className="-ml-2 ">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <CarouselItem
              key={item}
              className="max-w-[324px] basis-[80%] pl-2 sm:basis-1/2 md:basis-1/4 lg:basis-1/4"
            >
              <ProductCard />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
