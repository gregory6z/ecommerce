import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/search/search-bar";

export function SearchSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Search className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="mb-[1rem]">Recherche</SheetTitle>

          {/* <div className="relative">
            <Input
              className="w-full rounded-md border py-2 pr-4 pl-10"
              placeholder="Que cherche-tu aujourd’hui?..."
            />
            <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-zinc-900" />
          </div> */}

          <SearchBar />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
