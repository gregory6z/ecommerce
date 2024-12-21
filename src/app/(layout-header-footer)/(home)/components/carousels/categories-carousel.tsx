import { CategoryCard } from "@/components/product/category-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function CategoriesCarousel() {
  return (
    <section className=" mt-8 mb-10 pl-4 md:mt-12 md:mb-14 md:pl-8 lg:mt-24 lg:mb-40 lg:pl-16">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <header className="mb-6 flex items-center justify-between pr-4">
          <h2 className="font-bold text-xl lg:text-2xl ">
            DÉCOUVREZ NOS PRODUITS
          </h2>
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
              <CategoryCard />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
