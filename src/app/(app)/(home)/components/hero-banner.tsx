import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BannerTextOverlay } from "./banner-text-overlay";

export default function HeroBanner() {
  return (
    <div>
      <div className="md:hidden">
        <AspectRatio ratio={3 / 4} className="md:aspect-[16/9] ">
          <div className="relative flex h-full w-full items-center justify-center bg-zinc-900">
            <Image
              src={"/o.jpg"}
              width={1080}
              height={400}
              alt={""}
              quality={100}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white opacity-50" />
          </div>
          <BannerTextOverlay />
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
          <BannerTextOverlay />
        </AspectRatio>
      </div>
      <div className="hidden xl:block">
        <AspectRatio ratio={23 / 9}>
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
          <BannerTextOverlay />
        </AspectRatio>
      </div>
    </div>
  );
}
