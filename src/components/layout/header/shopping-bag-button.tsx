"use client";

import React, { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { CartDrawer } from "../cart/cart-drawer";
import { Drawer } from "vaul";
import { CartSheet } from "../cart/cart-sheet";

export function ShoppingBagButton() {
  const { cart } = useCart();
  const itemCount = cart?.items?.length ?? 0;

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleSheet = () => {
    setIsSheetOpen(!isSheetOpen);
  };

  return (
    <>
      <Button
        className="relative md:hidden "
        variant="ghost"
        onClick={toggleDrawer}
      >
        <ShoppingBag className="h-6 w-6" />
        {itemCount > 0 && (
          <span className="absolute top-0 right-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-sky-600 font-bold text-white text-xs">
            {itemCount}
          </span>
        )}
      </Button>
      <div className="hidden md:flex">
        <Button
          className="relative"
          size="icon"
          variant="ghost"
          onClick={toggleSheet}
        >
          <ShoppingBag className="h-6 w-6" />
          {itemCount > 0 && (
            <span className="absolute top-0 right-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-sky-600 font-bold text-white text-xs">
              {itemCount}
            </span>
          )}
        </Button>
      </div>

      <CartSheet open={isSheetOpen} onOpenChange={setIsSheetOpen} />

      <Drawer.Root open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <CartDrawer />
      </Drawer.Root>
    </>
  );
}
