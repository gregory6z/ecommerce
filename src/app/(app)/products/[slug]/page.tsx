import { Button } from "@/components/ui/button";
// biome-ignore lint/style/useImportType: <explanation>
import {
  getProducts,
  ProductVariant,
  Product as TypeProduct,
} from "@/http/products";
import { formatEUR } from "@/lib/utils";
import { getRecommendations } from "@/http/recommendations";
import { CarouselImageProduct } from "./components/carousel-image-product";
import ProductsCarousel from "../../(home)/components/products-carousel";
import ProductImages from "./components/product-images";
import { Star } from "lucide-react";
import { getMetafields } from "@/http/metafields";
import { RichTextAccordion } from "./components/rich-text-accordion";

type Params = Promise<{ slug: string }>;

export default async function Product({ params }: { params: Params }) {
  const slug = (await params).slug;

  const product: TypeProduct = await getProducts({
    handle: slug,
  });

  const products = await getRecommendations(product.id);

  const metafields = await getMetafields(slug);

  const priceFormatted = formatEUR(product.price.amount);

  return (
    <section className="flex flex-col">
      <div className="grid flex-col lg:grid-cols-2 lg:flex-row lg:gap-6 lg:px-16 xl:gap-16">
        <CarouselImageProduct images={product.images} />
        <ProductImages images={product.images} />

        {/* <div className="mt-4 grid grid-cols-3 gap-1">
        <div className="flex items-center justify-center gap-2">
          <Button variant={"ghost"} className="text-xl">
            4.5
          </Button>
        </div>

        <Button className="flex text-center text-xl" variant={"ghost"}>
          <Heart />
        </Button>
        <Button className="flex text-center text-xl" variant={"ghost"}>
          <Share />
        </Button>
      </div> */}
        <div className="mx-auto flex w-full flex-col px-4 md:px-0 lg:mt-10 ">
          <Button className="max-w-fit" size={"xs"}>
            NOUVEAU
          </Button>
          <h1 className="mt-2 font-bold text-xl uppercase">{product.title}</h1>
          <p className="my-4 font-bold text-2xl ">{priceFormatted}</p>

          <div className="mt-2 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={index}
                className="h-5 w-5 fill-zinc-900 stroke-zinc-900"
              />
            ))}
          </div>
          <p className="mt-4 text-sm">
            Keep surface oil under control + brighten up with a Triple Cherry
            Complex, Niacinamide and Aloe cleanser.
          </p>

          {product.variants.length > 1 && (
            <div className="my-6 grid grid-cols-2 gap-6">
              {product?.variants?.map((variant: ProductVariant) => (
                <div key={variant.id}>
                  {variant.selectedOptions.map((option) => (
                    <Button
                      className="border border-zinc-700"
                      size="lg"
                      variant={"secondary"}
                      key={option.value}
                    >
                      {option.value}
                    </Button>
                  ))}
                </div>
              ))}
            </div>
          )}

          <Button size={"xl"} className="mt-8 w-full">
            AJOUTER AU PANNIER
          </Button>

          <RichTextAccordion metafields={metafields} />
        </div>
      </div>
      <div className="mt-[10rem]">
        <ProductsCarousel products={products} title={"Pour vous"} />
      </div>
    </section>
  );
}
