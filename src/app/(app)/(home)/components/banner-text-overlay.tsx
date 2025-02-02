import { Button } from "@/components/ui/button";

export function BannerTextOverlay() {
  return (
    <div className="absolute inset-0 z-200 flex flex-col justify-end rounded bg-opacity-50 p-4 text-zinc-100 md:left-16 md:justify-center md:text-zinc-900 lg:max-w-[508px]">
      <h1 className="mx-auto text-pretty text-center font-bold text-2xl md:mx-0 lg:text-left lg:text-5xl">
        NOUVEAU : ÉCLAT NATUREL
      </h1>
      <p className="mt-2 hidden md:mt-6 md:block md:text-lg">
        Découvrez la beauté naturelle de votre peau avec notre gamme de soins,
        conçue pour nourrir et revitaliser votre éclat au quotidien.
      </p>
      <p className=" mt-1 text-pretty text-center font-semibold text-zinc-300 md:hidden">
        Révélez votre éclat naturel avec nos soins.
      </p>
      <Button
        size={"xl"}
        className="mt-4 bg-zinc-100 text-zinc-900 md:bg-zinc-900 md:text-zinc-100 lg:mt-6 lg:w-fit"
      >
        DÉCOUVREZ NOS PRODUITS
      </Button>
    </div>
  );
}
