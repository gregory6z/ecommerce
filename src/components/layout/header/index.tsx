import { Button } from "@/components/ui/button";
import { Search, ShoppingBag, User } from "lucide-react";
import { MenuSheet } from "./menu-sheet";
import Image from "next/image";

export default function Header() {
  return (
    <header className=" mx-auto px-4">
      <nav className="flex h-16 items-center justify-between">
        {/* Left group */}
        <div className="flex items-start gap-2">
          <MenuSheet />
          <Button variant="ghost" size="icon">
            <Search className="h-6 w-6" />
          </Button>
        </div>

        {/* Center logo */}
        <div className="flex justify-center">
          <div className="max-h-[40px]">
            <Image
              width={120}
              height={40}
              alt="logo"
              priority
              className="h-full object-cover object-center"
              src="/logo.svg"
            />
          </div>
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
