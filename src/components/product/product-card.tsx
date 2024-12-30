import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heart, Star } from "lucide-react";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Button } from "../ui/button";
import Image from "next/image";
import { formatEUR } from "@/lib/utils";
import { QuickAddToCartDrawer } from "../layout/cart/quick-add-to-cart-drawer";

import type { Product } from "@/http/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <AspectRatio ratio={6 / 7} className="relative">
          <div className="relative flex h-full w-full bg-zinc-200">
            <Image
              src={product.images[0].url}
              className=" object-cover"
              alt={product.images[0]?.altText || ""}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 33vw"
            />
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
            <span className="absolute bottom-2 left-2 rounded-sm bg-white px-2 py-1 font-bold text-xs uppercase">
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
              <span className="absolute bottom-2 left-2 rounded-sm bg-white px-2 py-1 font-bold text-xs uppercase">
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
  );
}
