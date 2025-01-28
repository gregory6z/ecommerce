import { Button } from "@/components/ui/button";
import { CarouselProduct } from "./components/carousel-product";
import { Heart, Share } from "lucide-react";
// biome-ignore lint/style/useImportType: <explanation>
import {
  getProducts,
  ProductVariant,
  Product as TypeProduct,
} from "@/http/products";
import { formatEUR } from "@/lib/utils";
import { getRecommendations } from "@/http/recommendations";

type Params = Promise<{ slug: string }>;

export default async function Product({ params }: { params: Params }) {
  const slug = (await params).slug;

  const product: TypeProduct = await getProducts({
    handle: slug,
  });

  await getRecommendations(product.id);

  const priceFormatted = formatEUR(product.price.amount);

  return (
    <section className="flex flex-col">
      <CarouselProduct images={product.images} />
      <div className="mt-4 grid grid-cols-3 gap-1">
        {/* <div className="flex items-center justify-center gap-2">
          <Button variant={"ghost"} className="text-xl">
            4.5
          </Button>
        </div>

        <Button className="flex text-center text-xl" variant={"ghost"}>
          <Heart />
        </Button>
        <Button className="flex text-center text-xl" variant={"ghost"}>
          <Share />
        </Button> */}
      </div>
      <div className="mx-auto mt-2 flex w-full flex-col items-center px-4 ">
        <Button className="max-w-fit" size={"xs"}>
          NOUVEAU
        </Button>
        <h1 className="mt-2 font-bold text-xl">{product.title}</h1>
        <p className="mt-2 font-bold text-2xl ">{priceFormatted}</p>

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
      </div>
    </section>
  );
}
