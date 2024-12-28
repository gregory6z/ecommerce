import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heart, Star } from "lucide-react";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Button } from "../ui/button";
import Image from "next/image";
import { formatEUR } from "@/lib/utils";
import { QuickAddToCartDrawer } from "../layout/cart/quick-add-to-cart-drawer";

interface ProductCardProps {
  title: string;
  price: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  tags: string[];
  compareAtPrice?: string;
}

export function ProductCard({
  title,
  description,
  price,
  imageUrl,
  imageAlt,
  tags,
  compareAtPrice,
}: ProductCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <AspectRatio ratio={6 / 7} className="relative">
          <div className="flex h-full w-full bg-zinc-200">
            <Image
              src={imageUrl}
              className="-mt-4 object-cover"
              alt={imageAlt}
              fill
              priority
            />
            <QuickAddToCartDrawer
              compareAtPrice={compareAtPrice}
              name={title}
              description={description}
              price={price}
              imageUrl={imageUrl}
              imageAlt={imageAlt}
            />
          </div>
          <Button
            variant={"rounded"}
            size={"iconSm"}
            className="absolute top-2 right-2"
          >
            <Heart />
          </Button>

          {compareAtPrice && Number(compareAtPrice) > 0 ? (
            <span className="absolute bottom-2 left-2 rounded-sm bg-white px-2 py-1 font-bold text-xs uppercase">
              {`Reduction ${Math.max(
                0,
                Math.round(
                  ((Number(compareAtPrice) - Number(price)) /
                    Number(compareAtPrice)) *
                    100,
                ),
              )}%`}
            </span>
          ) : (
            tags?.length > 0 && (
              <span className="absolute bottom-2 left-2 rounded-sm bg-white px-2 py-1 font-bold text-xs uppercase">
                {tags[0]}
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
        <h2 className="mt-1 text-pretty">{title}</h2>
        <p className="text-zinc-500 ">{description} </p>
        <div className="flex gap-2">
          {" "}
          <h3 className=" font-bold ">{formatEUR(price)}</h3>
          {compareAtPrice && Number(compareAtPrice) > 0 && (
            <h3 className="text-red-600 line-through">
              {formatEUR(compareAtPrice)}
            </h3>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
