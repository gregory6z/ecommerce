import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ProductCard() {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="relative aspect-square bg-zinc-100">
          {/* Image will go here */}
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        <h3 className="font-medium">Product Name</h3>
        <p className="text-muted-foreground text-sm">Brief description</p>
      </CardContent>

      <CardFooter className="flex justify-between">
        <p className="font-bold text-lg">$99.99</p>
      </CardFooter>
    </Card>
  );
}
