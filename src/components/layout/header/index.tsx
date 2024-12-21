import { Button } from "@/components/ui/button";
import { Menu, Search, ShoppingBag, User } from "lucide-react";
import { MenuSheet } from "./menu-sheet";

export default function Header() {
  return (
    <header className="container mx-auto px-4">
      <nav className="flex h-16 items-center justify-between">
        {/* Left group */}
        <div className="flex items-center gap-2">
          <MenuSheet />
          <Button variant="ghost" size="icon">
            <Search className="h-6 w-6" />
          </Button>
        </div>

        {/* Center logo */}
        <div className="flex flex-1 justify-center">
          <h1 className="font-bold text-xl">LOGO</h1>
        </div>

        {/* Right group */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <User className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <ShoppingBag className="h-6 w-6" />
          </Button>
        </div>
      </nav>
    </header>
  );
}
