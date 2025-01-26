"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import type { Product } from "@/http/products";
import { CartSheet } from "./cart-sheet";

export function AddToCartButton({ product }: { product: Product }) {
  const { addToCart, isSheetOpen, setIsSheetOpen } = useCart();

  const handleAddToCart = () => {
    addToCart.mutate({
      variantId: product.variants[0].id,
      quantity: 1,
      productId: product.id,
    });
    setIsSheetOpen(true);
  };

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      onClick={(e) => e.preventDefault()}
      className="absolute bottom-0 z-50 hidden h-[90px] w-full translate-y-[110%] transform items-center justify-center bg-zinc-100 px-4 py-2 opacity-0 transition-all delay-200 duration-[2000ms] group-hover:translate-y-0 group-hover:opacity-100 lg:flex"
    >
      <Button onClick={handleAddToCart} className=" uppercase ">
        Ajouter au panier
      </Button>
      <CartSheet open={isSheetOpen} onOpenChange={setIsSheetOpen} />
    </div>
  );
}
