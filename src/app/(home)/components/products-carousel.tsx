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
    <section className="container mt-8 mb-12 px-4">
      <header className="mb-6 flex items-center justify-between">
        <h2 className="font-bold text-xl ">{title}</h2>
        <p className="font-bold underline">Voir Tout</p>
      </header>

      <Carousel
        opts={{
          align: "start",
        }}
      >
        <CarouselContent className="-ml-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <CarouselItem
              key={item}
              className="basis-[90%] pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <ProductCard />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
