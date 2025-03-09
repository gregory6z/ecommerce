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
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { HeaderNavigationMenu } from "./header-navigation-menu"
import { HeaderNavigationMenuContent } from "./header-navigation-menu-content"

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

          <HeaderNavigationMenu />

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
