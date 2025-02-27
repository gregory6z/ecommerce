import { Button } from "@/components/ui/button"
import { Heart, Search, User } from "lucide-react"
import Link from "next/link"
import { DialogSearch } from "./dialog-search"
import { Logo } from "./logo"
import { MenuSheet } from "./menu-sheet"
import { SearchSheet } from "./search-sheet"
import { ShoppingBagButton } from "./shopping-bag-button"
import { TopNav } from "./top-nav"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 ">
      <TopNav />
      <div className="mx-auto border-zinc-200 border-b bg-white px-4 lg:px-12">
        <nav className="flex h-[4.375rem] items-center justify-between">
          <div className="flex items-start gap-2 lg:hidden">
            <MenuSheet />
            <SearchSheet />
          </div>

          <Logo />

          <nav className="hidden lg:flex lg:gap-4 xl:gap-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Soins Visage</NavigationMenuTrigger>
                  <NavigationMenuContent>ola</NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Soins Corps</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink>Link</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Cheveux</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink>Link</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Maquillage</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink>Link</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Parfums</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink>Link</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Collections</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink>Link</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            {/* 
            <Link
              shallow={true}
              className="font-bold uppercase"
              href={"/collections/skin-care"}
            >
              Skin care
            </Link>
            <Link
              className="font-bold uppercase"
              href={"/collections/anti-age"}
            >
              Anti-age
            </Link>
            <Link
              className="font-bold uppercase"
              href={"/collections/hydratants"}
            >
              Hydratants
            </Link>
            <Link
              className="font-bold uppercase"
              href={"/collections/anti-acne"}
            >
              Anti-acne
            </Link>
            <Link
              className="font-bold uppercase"
              href={"/collections/maquillage"}
            >
              Maquillage
            </Link>
            <Link
              className="font-bold uppercase lg:hidden xl:block"
              href={"/collections/parfums"}
            >
              Parfums
            </Link> */}
          </nav>

          <div className="flex items-center gap-2 lg:gap-1">
            <DialogSearch />
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
  )
}
