import { Button } from "@/components/ui/button";
import { Heart, Search, User } from "lucide-react";
import { MenuSheet } from "./menu-sheet";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBagButton } from "./shopping-bag-button";
import { SearchSheet } from "./search-sheet";

export default function Header() {
  return (
    <header className="">
      <div className="hidden h-9 bg-zinc-950 text-zinc-100 lg:flex">
        <nav className="flex w-full items-center justify-end gap-8 px-12 text-sm">
          <p>Blog</p>
          <p>Contact</p>
          <p>Compte</p>
          <p>Declaration d’assibilée</p>
          <p>Aide</p>
        </nav>
      </div>
      <div className="mx-auto px-4 lg:px-12">
        <nav className="flex h-[4.375rem] items-center justify-between">
          <div className="flex items-start gap-2 lg:hidden">
            <MenuSheet />
            <SearchSheet />
          </div>

          <Link href="/" className="flex justify-center">
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
          </Link>

          <nav className="hidden lg:flex lg:gap-4 xl:gap-8">
            <Link className="font-bold uppercase" href={"/"}>
              Skin care
            </Link>
            <Link className="font-bold uppercase" href={"/"}>
              Anti-age
            </Link>
            <Link className="font-bold uppercase" href={"/"}>
              Hydratants
            </Link>
            <Link className="font-bold uppercase" href={"/"}>
              Anti-acne
            </Link>
            <Link className="font-bold uppercase" href={"/"}>
              Maquillage
            </Link>
            <Link className="font-bold uppercase lg:hidden xl:block" href={"/"}>
              Parfums
            </Link>
          </nav>

          <div className="flex items-center gap-2 lg:gap-1">
            <div className=" mr-4 hidden items-center justify-center gap-2 rounded-sm border border-zinc-200 bg-zinc-100 px-4 py-[0.75rem] xl:flex">
              <Search />
              <p className="text-xs">Que cherche-tu aujourd’hui?...</p>
            </div>

            <Button
              className="hidden lg:block xl:hidden"
              variant="ghost"
              size="icon"
            >
              <Search className="h-6 w-6" />
            </Button>

            <Link className="hidden lg:block" href="/session">
              <Button variant="ghost" size="icon">
                <Heart className="h-6 w-6" />
              </Button>
            </Link>

            <Link href="/session">
              <Button variant="ghost" size="icon">
                <User className="h-6 w-6" />
              </Button>
            </Link>
            <ShoppingBagButton />
          </div>
        </nav>
      </div>
    </header>
  );
}
