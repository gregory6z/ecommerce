"use client";
import { Button } from "@/components/ui/button";
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { PingButton } from "@/components/ui/ping-button";
import { ShoppingBag } from "lucide-react";
import { Drawer } from "vaul";
import Image from "next/image";
import { formatEUR } from "@/lib/utils";
import type { Product } from "@/http/products";
import { CartDrawer } from "./cart-drawer";
import { useState } from "react";
import { useCart } from "@/hooks/use-cart";

export function QuickAddToCartDrawer({ product }: { product: Product }) {
  const [isQuickAddOpen, setQuickAddOpen] = useState(false);
  const [isCartDrawerOpen, setCartDrawerOpen] = useState(false);

  const { addToCart } = useCart();

  const openCartDrawer = () => {
    setCartDrawerOpen(true);
  };

  const handleAddToCart = () => {
    addToCart.mutate({
      variantId: product.variants[0].id,
      quantity: 1,
    });
    // Close the drawer first
    setQuickAddOpen(false);

    openCartDrawer();

    // Perform the cart action
  };
  return (
    <div>
      <Drawer.Root open={isQuickAddOpen} onOpenChange={setQuickAddOpen}>
        <DrawerTrigger asChild>
          <Button size="iconSm" variant={"rounded"}>
            <ShoppingBag />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="uppercase">Ajout Rapid</DrawerTitle>
          </DrawerHeader>

          <main className="mt-4 px-4">
            <section className="mb-4 flex gap-2">
              <div className=" h-[146] w-[128] bg-zinc-200">
                <Image
                  src={product.images[0].url}
                  className="h-full w-full object-cover"
                  alt={product.images[0].altText}
                  width={120}
                  height={146}
                  priority
                />
              </div>

              {/* <Image
                src={"/"}
                className="-mt-4 object-cover"
                alt={"image"}
                fill
                priority
              /> */}
              <div className="mt-2">
                <h2 className=" ">{product.title}</h2>
                <p className="text-zinc-500">{product.description}</p>
                <div className="flex gap-2">
                  <h3 className="font-bold">
                    {formatEUR(product.price.amount)}
                  </h3>
                  {product.compareAtPrice?.amount !== undefined &&
                    Number(product.compareAtPrice.amount) > 0 &&
                    Number(product.price.amount) > 0 && (
                      <h3 className="text-red-600 line-through">
                        {formatEUR(product.compareAtPrice.amount)}
                      </h3>
                    )}
                </div>
              </div>
            </section>
          </main>

          <DrawerFooter>
            <Button onClick={handleAddToCart}>Ajouter</Button>

            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer.Root>

      <Drawer.Root open={isCartDrawerOpen} onOpenChange={setCartDrawerOpen}>
        <CartDrawer />
      </Drawer.Root>
    </div>
  );
}
