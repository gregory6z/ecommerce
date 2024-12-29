"use client";
import { Button } from "@/components/ui/button";
import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";

import { CartContent } from "./cart-content";

export function CartDrawer() {
  return (
    <DrawerContent className="flex h-[80vh] flex-col">
      <DrawerHeader className="flex-shrink-0">
        <DrawerTitle className="uppercase">Votre Panier</DrawerTitle>
      </DrawerHeader>

      <div className="flex-grow overflow-y-auto">
        <CartContent />
      </div>

      <DrawerFooter className="mt-4">
        <Button variant={"third"} size={"lg"}>
          PAYEMENT SÉCURISE
        </Button>
      </DrawerFooter>
    </DrawerContent>
  );
}
