"use client";
import { Button } from "@/components/ui/button";
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";

import { CartContent } from "./cart-content";

export function CartDrawer() {
  return (
    <DrawerContent className="h-[80vh]">
      <DrawerHeader>
        <DrawerTitle className="uppercase">Votre Panier</DrawerTitle>
      </DrawerHeader>

      <CartContent />

      <DrawerFooter className="mt-4">
        <Button variant={"third"} size={"lg"}>
          PAYEMENT SÉCURISE
        </Button>
      </DrawerFooter>
    </DrawerContent>
  );
}
