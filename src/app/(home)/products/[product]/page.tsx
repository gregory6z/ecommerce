import { Button } from "@/components/ui/button";
import { CarouselProduct } from "./components/carousel-product";

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
        <p className="mt-2 font-bold text-sm">25$</p>
        <Button size={"xl"} className="mt-8 w-full">
          AJOUTER AU PANNIER
        </Button>
      </div>
    </section>
  );
}
