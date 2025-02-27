import { CategoryCard } from "@/components/product/category-card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import type { Collection } from "@/http/collections"

interface CategoriesCarouselProps {
  categories: Collection[]
}

export const dynamic = "force-dynamic"

export default function CategoriesCarousel({
  categories,
}: CategoriesCarouselProps) {
  return (
    <section className=" mt-12 mb-24 pl-4 md:mt-12 md:mb-14 md:pl-8 lg:mt-[10rem] lg:mb-40 lg:pl-16">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <header className="mb-6 flex items-center justify-between pr-4">
          <h2 className="font-bold text-xl lg:text-2xl ">
            TROUVEZ VOTRE SOIN IDÉAL
          </h2>
        </header>

        <div className="hidden lg:block">
          <CarouselPrevious />
          <CarouselNext />
        </div>

        <CarouselContent className="-ml-2 ">
          {categories.map((category) => (
            <CarouselItem
              key={category.id}
              className="max-w-[324px] basis-[80%] pl-2 sm:basis-1/2 md:basis-1/4 lg:basis-1/4"
            >
              <CategoryCard
                title={category.title}
                slug={category.handle}
                description={category.description}
                imageAlt={category.image?.altText}
                imageUrl={category.image?.url}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
