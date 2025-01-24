import { Button } from "@/components/ui/button";

export function BannerTextOverlay() {
  return (
    <div className="absolute inset-0 left-16 z-200 flex max-w-[508px] flex-col justify-center rounded bg-opacity-50 p-4">
      <h1 className="font-bold text-5xl">NOUVEAU : ÉCLAT NATUREL</h1>
      <p className="mt-6 text-lg">
        <p>
          Découvrez la beauté naturelle de votre peau avec notre gamme de soins,
          conçue pour nourrir et revitaliser votre éclat au quotidien.
        </p>
      </p>
      <Button size={"xl"} className="mt-6 w-fit">
        DÉCOUVREZ NOS PRODUITS
      </Button>
    </div>
  );
}
