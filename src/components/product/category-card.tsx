import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import Link from "next/link";

export function CategoryCard() {
  return (
    <Card className="h-full">
      <CardHeader>
        <AspectRatio ratio={6 / 7} className="relative">
          <div className="flex h-full w-full bg-zinc-200">
            <Image
              src="/foto.webp"
              className="-mt-4 object-cover object-[center_20%]"
              alt="Product image"
              fill
              priority
            />
          </div>
        </AspectRatio>
      </CardHeader>

      <CardContent className="text-sm">
        <CardTitle className="mt-4 text-pretty">SKIN CARE</CardTitle>
        <CardDescription className="mt-4 text-zinc-500 ">
          Discover our premium skincare collection designed to enhance your
          natural radiance. From gentle cleansers to potent serums, each product
          is carefully formulated to nourish, protect, and revitalize your skin.
          Transform your daily routine into a luxurious self-care ritual with
          our scientifically-backed skincare solutions.
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Link
          href="/categoria/skincare"
          className="flex items-center gap-2 font-bold text-primary underline hover:underline"
        >
          Voir Plus
        </Link>
      </CardFooter>
    </Card>
  );
}
