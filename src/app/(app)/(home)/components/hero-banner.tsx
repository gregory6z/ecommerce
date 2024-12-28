import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function HeroBanner() {
  return (
    <div>
      <div className="md:hidden">
        <AspectRatio ratio={3 / 4} className="md:aspect-[16/9] ">
          <div className="flex h-full w-full items-center justify-center bg-zinc-900">
            {/* Conteúdo futuro aqui */}
          </div>
        </AspectRatio>
      </div>
      <div className="hidden md:block lg:hidden xl:hidden">
        <AspectRatio ratio={16 / 9}>
          <div className="flex h-full w-full items-center justify-center bg-zinc-900">
            {/* Conteúdo futuro aqui */}
          </div>
        </AspectRatio>
      </div>
      <div className="hidden lg:block">
        <AspectRatio ratio={23 / 9}>
          <div className="flex h-full w-full items-center justify-center bg-zinc-900">
            {/* Conteúdo futuro aqui */}
          </div>
        </AspectRatio>
      </div>
    </div>
  );
}
