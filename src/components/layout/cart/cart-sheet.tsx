import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CartContent } from "./cart-content";
import { Button } from "@/components/ui/button";

export function CartSheet() {
  return (
    <SheetContent className="flex h-full min-w-[500px] flex-col" side="right">
      <SheetHeader className="flex-shrink-0">
        <SheetTitle className="uppercase">Votre Panier</SheetTitle>
      </SheetHeader>

      <div className="flex-grow overflow-y-auto">
        <CartContent />
      </div>

      <SheetFooter className="mt-4">
        <Button className="w-full" variant={"third"} size={"xl"}>
          PAYEMENT SÉCURISE
        </Button>
      </SheetFooter>
    </SheetContent>
  );
}
