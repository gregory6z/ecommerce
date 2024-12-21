import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { RatingDisplay } from "../ui/rating";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Button } from "../ui/button";
import { PingButton } from "../ui/pint-button";

export function ProductCard() {
  return (
    <Card className="h-full">
      <CardHeader>
        <AspectRatio ratio={6 / 7} className="relative">
          <div className="flex h-full w-full bg-zinc-200">
            <PingButton>
              <ShoppingBag />
            </PingButton>
          </div>
          <Button
            variant={"rounded"}
            size={"iconSm"}
            className="absolute top-2 right-2"
          >
            <Heart />
          </Button>
          <span className="absolute bottom-2 left-2 rounded-sm bg-white px-2 py-1 font-bold text-xs">
            NOUVEAU
          </span>
        </AspectRatio>
      </CardHeader>

      <CardContent className="text-sm">
        <div className="flex items-center gap-1">
          <Star width={12} height={14} strokeWidth={1} fill="currentColor" />
          <strong className="text-xs">4.5</strong>
        </div>
        <h2 className="mt-1 text-pretty">Crème réparatrice pour les pieds</h2>
        <p className="text-zinc-500 ">Menthe et eucalyptus </p>
        <h3 className=" font-bold ">$99.99</h3>
      </CardContent>
    </Card>
  );
}
