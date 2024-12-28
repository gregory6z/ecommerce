"use client";
import { Button } from "@/components/ui/button";
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";

import type { Product } from "@/http/products";
import { CartContent } from "./cart-content";

export function CartDrawer({ product }: { product: Product }) {
  return (
    <DrawerContent className="h-[80vh]">
      <DrawerHeader>
        <DrawerTitle className="uppercase">Votre Panier</DrawerTitle>
      </DrawerHeader>

      <CartContent
        products={[
          product,
          product,
          product,
          product,
          product,
          product,
          product,
        ]}
      />

      <DrawerFooter className="mt-4">
        <Button variant={"third"} size={"lg"}>
          PAYEMENT SÉCURISE
        </Button>
      </DrawerFooter>
    </DrawerContent>
  );
}
