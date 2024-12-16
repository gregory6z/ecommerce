import { Button } from "@/components/ui/button";
import { CarouselProduct } from "./components/carousel-product";
import { Heart, Star, Share, StarIcon } from "lucide-react";

export default function Categories() {
  return (
    <section className="flex flex-col">
      <CarouselProduct />
      <div className="mx-auto mt-10 flex w-full flex-col items-center px-4 ">
        <Button className="max-w-fit" size={"xs"} variant={"secondary"}>
          NOUVEAU
        </Button>
        <h1 className="mt-2 font-bold text-xl">CREME DE ROSTO</h1>
        <p className="text-pretty text-zinc-500">description</p>
        <p className="mt-2 font-bold ">25$</p>
        <div className="mt-4 grid grid-cols-3 gap-1">
          <div className="flex items-center justify-center gap-2">
            <Button variant={"ghost"} className="text-xl">
              {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-20"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>
              4.5
            </Button>
          </div>

          <Button className="flex text-center text-xl" variant={"ghost"}>
            <Heart />
          </Button>
          <Button className="flex text-center text-xl" variant={"ghost"}>
            <Share />
          </Button>
        </div>
        <Button size={"xl"} className="mt-8 w-full">
          AJOUTER AU PANNIER
        </Button>
      </div>
    </section>
  );
}
