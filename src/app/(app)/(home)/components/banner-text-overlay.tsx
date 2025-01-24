import { Button } from "@/components/ui/button";

export function BannerTextOverlay() {
  return (
    <div className="absolute inset-0 z-200 flex max-w-[508px] flex-col justify-end rounded bg-opacity-50 p-4 lg:left-16 lg:justify-center">
      <h1 className="font-bold text-3xl lg:text-5xl">
        NOUVEAU : ÉCLAT NATUREL
      </h1>
      <p className="mt-2 hidden lg:mt-6 lg:block lg:text-lg">
        Découvrez la beauté naturelle de votre peau avec notre gamme de soins,
        conçue pour nourrir et revitaliser votre éclat au quotidien.
      </p>
      <p>
        <p className="font-semibold text-lg lg:hidden">
          Révélez votre éclat naturel avec nos soins quotidiens.
        </p>
      </p>
      <Button size={"xl"} className="mt-2 lg:mt-6 lg:w-fit">
        DÉCOUVREZ NOS PRODUITS
      </Button>
    </div>
  );
}
