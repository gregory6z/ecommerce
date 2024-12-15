import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function HeroBanner() {
  return (
    <AspectRatio ratio={1} className="md:aspect-[16/9]">
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
        {/* Conteúdo futuro aqui */}
      </div>
    </AspectRatio>
  );
}
