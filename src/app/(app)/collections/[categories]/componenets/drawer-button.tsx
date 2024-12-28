"use client";

import { Button } from "@/components/ui/button";
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Filter, SlidersHorizontal } from "lucide-react";
import { Drawer } from "vaul";

export default function DrawerButton() {
  return (
    <Drawer.Root>
      <DrawerTrigger asChild>
        <Button className="mt-4 md:hidden" variant="secondary">
          {" "}
          <SlidersHorizontal />
          FILTRER ET TRIER
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer.Root>
  );
}
