import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HeroBanner() {
  return (
    <div>
      <div className="md:hidden">
        <AspectRatio ratio={3 / 4} className="md:aspect-[16/9] ">
          <div className="flex h-full w-full items-center justify-center bg-zinc-900">
            <Image
              src={"/o.jpg"}
              width={1080}
              height={400}
              alt={""}
              quality={100}
              className="h-full w-full object-cover"
            />
          </div>
        </AspectRatio>
      </div>
      <div className="hidden md:block xl:hidden">
        <AspectRatio ratio={16 / 9}>
          <div className="relative flex h-full w-full items-center justify-center bg-zinc-900">
            <Image
              src={"/outronome.jpg"}
              width={1080}
              height={400}
              alt={""}
              quality={100}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 z-200 flex flex-col items-center justify-center rounded bg-black bg-opacity-50 p-4">
            <h1>NOUVEAU : ÉCLAT NATUREL</h1>
            <p>La beauté de votre peau révélée.</p>
            <Button>DÉCOUVREZ NOS PRODUITS</Button>
          </div>
        </AspectRatio>
      </div>
      <div className="hidden xl:block">
        <AspectRatio ratio={23 / 9}>
          <div className="flex relative h-full w-full items-center justify-center bg-zinc-900">
            <Image
              src={"/outronome.jpg"}
              width={1080}
              height={400}
              alt={""}
              quality={100}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 left-16 z-200 flex max-w-[508px] flex-col justify-center rounded bg-opacity-50 p-4">
            <h1 className="font-bold text-5xl">NOUVEAU : ÉCLAT NATUREL</h1>
            <p className="mt-6 text-lg">
              <p>
                Découvrez la beauté naturelle de votre peau avec notre gamme de
                soins, conçue pour nourrir et revitaliser votre éclat au
                quotidien.
              </p>
            </p>
            <Button size={"xl"} className="mt-6 w-fit">
              DÉCOUVREZ NOS PRODUITS
            </Button>
          </div>
        </AspectRatio>
      </div>
    </div>
  );
}
