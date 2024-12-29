import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  title: string;
  slug: string;
  description: string;
  imageAlt?: string;
  imageUrl?: string;
}

export function CategoryCard({
  title,
  slug,
  description,
  imageAlt,
  imageUrl,
}: CategoryCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <AspectRatio ratio={6 / 8} className="relative">
          <div className="flex h-full w-full bg-zinc-200">
            {imageUrl && (
              <Image
                src={imageUrl}
                className="object-cover"
                alt={imageAlt || ""}
                fill
                priority
              />
            )}
          </div>
        </AspectRatio>
      </CardHeader>

      <CardContent className="flex flex-grow flex-col justify-between text-sm">
        <div>
          <CardTitle className="mt-4 text-pretty">{title}</CardTitle>
          <CardDescription className="mt-4 text-zinc-500">
            {description}
          </CardDescription>
        </div>
      </CardContent>

      <CardFooter className="mt-auto">
        <Link
          href={`/collections/${slug}`}
          className="flex items-center gap-2 font-bold text-primary underline hover:underline"
        >
          Voir Plus
        </Link>
      </CardFooter>
    </Card>
  );
}
