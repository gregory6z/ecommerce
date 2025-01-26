"use client";
import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";

import { CartContent } from "./cart-content";
import { CheckoutButton } from "./checkout-button";

export function CartDrawer() {
  return (
    <DrawerContent className="flex h-[80vh] flex-col">
      <DrawerHeader className="flex-shrink-0">
        <DrawerTitle className="font-bold uppercase">Votre Panier</DrawerTitle>
      </DrawerHeader>

      <div className="flex-grow overflow-y-auto">
        <CartContent />
      </div>

      <DrawerFooter className="mt-4">
        <CheckoutButton />
      </DrawerFooter>
    </DrawerContent>
  );
}
