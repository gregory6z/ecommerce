import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function BannerCategory() {
  return (
    <AspectRatio ratio={20 / 9} className="md:aspect-[16/9]">
      <div className="flex h-full w-full items-center justify-center bg-zinc-900">
        {/* Conteúdo futuro aqui */}
      </div>
    </AspectRatio>
  );
}
