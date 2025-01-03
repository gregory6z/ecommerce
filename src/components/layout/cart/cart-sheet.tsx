// components/cart/cart-sheet.tsx
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CartContent } from "./cart-content";
import { Button } from "@/components/ui/button";
import { CheckoutButton } from "./checkout-button";

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex h-full min-w-[500px] flex-col" side="right">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="uppercase">Votre Panier</SheetTitle>
        </SheetHeader>

        <div className="flex-grow overflow-y-auto">
          <CartContent />
        </div>

        <SheetFooter className="mt-4">
          <CheckoutButton />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
