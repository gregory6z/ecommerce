import { Button } from "@/components/ui/button";
import type { Product } from "@/http/products";
import { formatEUR } from "@/lib/utils";
import { ChevronDown, Heart, Trash } from "lucide-react";
import Image from "next/image";

interface CardContentProps {
  products: Product[];
}

export function CartContent({ products }: CardContentProps) {
  return (
    <main className="mt-2 overflow-y-auto px-4 ">
      <section className="mb-4 flex flex-col">
        {products.map((product, index) => {
          return (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
              // biome-ignore lint/nursery/useSortedClasses: <explanation>
              className="flex border-zinc-200 last:border-b-transparent border-b pt-4 pb-8"
            >
              <div className="h-[125px] w-[100px] bg-zinc-200">
                <Image
                  src={product.images[0].url}
                  className="h-full w-full object-cover"
                  alt={product.images[0].altText}
                  width={100}
                  height={125}
                  priority
                />
              </div>

              <div className="mt-2">
                <h2>{product.title}</h2>
                <p className="text-zinc-500">{product.description}</p>
                <div className="flex gap-2">
                  <h3 className="font-bold">
                    {formatEUR(product.price.amount)}
                  </h3>
                  {product.compareAtPrice?.amount &&
                    Number(product.price.amount) > 0 && (
                      <h3 className="text-red-600 line-through">
                        {formatEUR(product.compareAtPrice.amount)}
                      </h3>
                    )}
                </div>
                <div className="itens-center mt-2 flex gap-2">
                  <Button
                    className={"bg-zinc-100"}
                    variant={"rounded"}
                    size={"iconMd"}
                  >
                    <Heart />
                  </Button>
                  <Button
                    variant={"rounded"}
                    size={"iconMd"}
                    className={"bg-zinc-100"}
                  >
                    <Trash />
                  </Button>

                  <Button className="" variant={"ghost"}>
                    Qte: 1 <ChevronDown width={12} />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}

        <div className="mt-4 flex flex-col gap-2 border-zinc-200 border-b pb-4 ">
          <div className="flex justify-between">
            <p>Total</p>
            <p>61$</p>
          </div>
          <div className="flex justify-between">
            <p>Expedition standard</p>
            <p>Gratuit</p>
          </div>
          <div className="flex justify-between font-bold">
            <p>Total</p>
            <p>61$</p>
          </div>
        </div>
      </section>
    </main>
  );
}
