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

interface QuickAddToCartDrawerProps {
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  imageAlt: string;
  compareAtPrice?: string;
}

export function QuickAddToCartDrawer({
  name,
  description,
  price,
  imageUrl,
  imageAlt,
  compareAtPrice,
}: QuickAddToCartDrawerProps) {
  return (
    <Drawer.Root>
      <DrawerTrigger asChild>
        <PingButton className="md:hidden">
          <ShoppingBag />
        </PingButton>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="uppercase">Ajout Rapid</DrawerTitle>
        </DrawerHeader>

        <main className="mt-4 px-4">
          <section className="mb-4 flex gap-2">
            <div className=" h-[146] w-[128] bg-zinc-200">
              <Image
                src={imageUrl}
                className="h-full w-full object-cover"
                alt={imageAlt}
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
              <h2 className=" ">{name}</h2>
              <p className="text-zinc-500">{description}</p>
              <div className="flex gap-2">
                {" "}
                <h3 className=" font-bold ">{formatEUR(price)}</h3>
                {compareAtPrice && Number(compareAtPrice) > 0 && (
                  <h3 className="text-red-600 line-through">
                    {formatEUR(compareAtPrice)}
                  </h3>
                )}
              </div>
            </div>
          </section>
        </main>

        <DrawerFooter>
          <Button>Ajouter</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer.Root>
  );
}
