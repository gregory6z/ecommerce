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
import { AccordionFilters } from "./accordeon-filters";

export default function SearchDrawer() {
  return (
    <Drawer.Root>
      <DrawerTrigger asChild>
        <Button className="mt-4 md:hidden" variant="secondary">
          {" "}
          <SlidersHorizontal />
          FILTRER ET TRIER
        </Button>
      </DrawerTrigger>
      <DrawerContent className="min-h-[90vh] px-4">
        <DrawerHeader>
          <DrawerTitle className="itens-center flex justify-center gap-4 font-bold text-base">
            {" "}
            FILTRER ET TRIER
          </DrawerTitle>
          <DrawerDescription className="mt-2">Tout Effacer</DrawerDescription>
        </DrawerHeader>

        <AccordionFilters />

        <DrawerFooter>
          <Button size={"lg"} className="uppercase">
            Voir les produits (15)
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer.Root>
  );
}
