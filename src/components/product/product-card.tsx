"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heart, Star } from "lucide-react";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Button } from "../ui/button";
import Image from "next/image";
import { formatEUR } from "@/lib/utils";
import { QuickAddToCartDrawer } from "../layout/cart/quick-add-to-cart-drawer";

import type { Product } from "@/http/products";
import Link from "next/link";
import { AddToCartButton } from "../layout/cart/add-to-cart-button";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.handle}`}>
      <Card className="group h-full ">
        <CardHeader>
          <AspectRatio ratio={6 / 7} className="relative">
            <div className="relative flex h-full w-full overflow-hidden ">
              <Image
                src={product.images[0].url}
                className="object-cover transition-all duration-300 ease-in-out lg:group-hover:opacity-0"
                alt={product.images[0]?.altText || ""}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <Image
                src={product.images[1]?.url || product.images[0].url}
                className="absolute inset-0 object-cover opacity-0 transition-all duration-300 ease-in-out lg:group-hover:opacity-100"
                alt={product.images[1]?.altText || ""}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              <AddToCartButton product={product} />

              <QuickAddToCartDrawer product={product} />
            </div>
            <Button
              variant={"rounded"}
              size={"iconSm"}
              className="absolute top-2 right-2"
            >
              <Heart />
            </Button>

            {product.compareAtPrice?.amount &&
            Number(product.compareAtPrice.amount) > 0 ? (
              <span className="absolute bottom-2 left-2 rounded-sm bg-zinc-900 px-2 py-1 font-bold text-xs uppercase">
                {`Reduction ${Math.max(
                  0,
                  Math.round(
                    ((Number(product.compareAtPrice.amount) -
                      Number(product.price.amount)) /
                      Number(product.compareAtPrice.amount)) *
                      100,
                  ),
                )}%`}
              </span>
            ) : (
              product.tags?.length > 0 && (
                <span className="absolute bottom-2 left-2 rounded-sm bg-zinc-900 px-2 py-1 font-bold text-xs text-zinc-50 uppercase">
                  {product.tags[0]}
                </span>
              )
            )}
          </AspectRatio>
        </CardHeader>

        <CardContent className="text-sm">
          <div className="flex items-center gap-1">
            <Star width={12} height={14} strokeWidth={1} fill="currentColor" />
            <strong className="text-xs">4.5</strong>
          </div>
          <h2 className="mt-1 text-pretty">{product.title}</h2>
          <p className="text-zinc-500 ">{product.description} </p>
          {product.variants.length > 1 && (
            <p className="font-semibold underline ">
              {product.variants.length} variétés
            </p>
          )}

          <div className="flex gap-2">
            {" "}
            <h3 className=" font-bold ">{formatEUR(product.price.amount)}</h3>
            {product.compareAtPrice?.amount &&
              Number(product.compareAtPrice?.amount) > 0 && (
                <h3 className="text-red-600 line-through">
                  {formatEUR(product.compareAtPrice?.amount)}
                </h3>
              )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
