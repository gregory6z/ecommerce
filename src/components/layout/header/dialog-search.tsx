"use client";

import { Search, X } from "lucide-react";

import * as DialogPrimitive from "@radix-ui/react-dialog";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { getProducts, type Product } from "@/http/products";
import { ProductCard } from "@/components/product/product-card";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";

export function DialogSearch() {
  const [product, setProduct] = useState<Product | null>(null);

  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await getProducts({
        handle: "rose-tea-lotion-skin-care-set-dry-skin-moisturizing",
      });
      setProduct(fetchedProduct);
    };
    fetchProduct();
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="mr-4 hidden items-center justify-center gap-2 rounded-sm border border-zinc-200 bg-zinc-100 px-4 py-[0.75rem] xl:flex">
          <Search />
          <p className="text-xs">Que cherche-tu aujourd'hui?...</p>
        </div>
      </DialogTrigger>

      <DialogContent
        variant="top"
        className="min-w-full [&_[data-overlay]]:top-9"
      >
        <DialogTitle className="sr-only">Search Products</DialogTitle>

        <DialogHeader className=" flex h-[7.5rem] items-center justify-center border-zinc-200 ">
          <div className="flex w-full max-w-[968px] items-center justify-between">
            <Logo />

            <div className="relative min-w-[600px]">
              <Input
                className="w-full pr-10 pl-10"
                placeholder="Que cherche-tu aujourd'hui?..."
              />
              <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-gray-900" />
            </div>

            <DialogPrimitive.Close>
              <X strokeWidth={1.5} className="h-10 w-10 text-zinc-600" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </div>
        </DialogHeader>

        <div className="flex border-zinc-300 border-t px-[10rem]">
          <section className="h-full w-[364px] border-zinc-300 border-r p-6">
            <h3 className="font-bold uppercase">Suggestions</h3>

            <div className="mt-6 flex flex-col gap-4">
              <p>Rose Tea Lotion</p>
              <p>Rose Tea Lotion</p>
              <p>Rose Tea Lotion</p>
              <p>Rose Tea Lotion</p>
              <p>Rose Tea Lotion</p>
            </div>
          </section>
          <section className="h-full p-6">
            <h3 className=" font-bold uppercase">Top results for "sale"</h3>
            <div className="flex w-full gap-2">
              {product && <ProductCard product={product} />}
              {product && <ProductCard product={product} />}
              {product && <ProductCard product={product} />}
              {product && <ProductCard product={product} />}
            </div>
            <p className="my-4 text-center font-bold uppercase underline">
              Voir tout "Parfuns"
            </p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
