import { Button } from "@/components/ui/button";

export function BannerTextOverlay() {
  return (
    <div className="absolute inset-0 z-200 flex flex-col justify-end rounded bg-opacity-50 p-4 text-zinc-100 md:left-16 md:justify-center md:text-zinc-900 lg:max-w-[600px]">
      <p className="mb-8 font-semibold text-zinc-500 uppercase tracking-widest">
        La beauté naturelle, simplement sophistiquée
      </p>
      <h1 className="mx-auto text-pretty text-center font-bold text-2xl md:mx-0 lg:text-left lg:text-5xl">
        NOUVEAU : ÉCLAT NATUREL
      </h1>
      <p className="hidden text-balance font-medium text-zinc-800 md:mt-8 md:block md:text-lg">
        Découvrez la beauté naturelle de votre peau avec notre gamme de soins,
        conçue pour nourrir et revitaliser votre éclat au quotidien.
      </p>
      <p className=" mt-1 text-pretty text-center font-semibold text-zinc-300 md:hidden">
        Révélez votre éclat naturel avec nos soins.
      </p>
      <Button
        size={"xl"}
        className="mt-6 bg-zinc-100 text-zinc-900 md:bg-zinc-900 md:text-zinc-100 lg:mt-10 lg:w-fit"
      >
        DÉCOUVREZ VOTRE ROUTINE IDÉALE
      </Button>
    </div>
  );
}
