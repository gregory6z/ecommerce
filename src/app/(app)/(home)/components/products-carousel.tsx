import { ProductCard } from "@/components/product/product-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Product } from "@/http/products";
import Link from "next/link";

interface ProductCarouselProps {
  title: string;
  products?: Product[];
  link?: string;
  isTag?: boolean;
}

export default function ProductsCarousel({
  title,
  products,
  link,
}: ProductCarouselProps) {
  return (
    <section className=" mt-12 mb-24 pl-4 md:mt-12 md:mb-14 md:pl-8 lg:mt-24 lg:mb-40 lg:pl-16">
      <Carousel
        className="relative"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <header className="mb-6 flex items-center justify-between pr-4 lg:justify-start lg:gap-8">
          <h2 className="font-bold text-xl uppercase lg:text-2xl ">{title}</h2>
          {link && (
            <Link href={link} className="font-bold underline">
              Voir Tout
            </Link>
          )}
        </header>

        <div className="hidden lg:block">
          <CarouselPrevious />
          <CarouselNext />
        </div>

        <CarouselContent className="-ml-2 ">
          {products?.map((product) => (
            <CarouselItem
              key={product.id}
              className="max-w-[324px] basis-[80%] pl-2 sm:basis-1/2 md:basis-1/4 lg:basis-1/4"
            >
              <ProductCard key={product.id} product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
