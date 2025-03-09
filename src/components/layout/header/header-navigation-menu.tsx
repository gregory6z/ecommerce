import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Link from "next/link"

import { HeaderNavigationMenuContent } from "./header-navigation-menu-content"

export function HeaderNavigationMenu() {
  return (
    <nav className="hidden lg:flex lg:gap-4 xl:gap-8">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Link href="/collections/skin-care">Soins Visage</Link>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <HeaderNavigationMenuContent />
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Soins Corps</NavigationMenuTrigger>
            <NavigationMenuContent>
              <HeaderNavigationMenuContent />
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Cheveux</NavigationMenuTrigger>
            <NavigationMenuContent>
              <HeaderNavigationMenuContent />
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Maquillage</NavigationMenuTrigger>
            <NavigationMenuContent>
              <HeaderNavigationMenuContent />
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Parfums</NavigationMenuTrigger>
            <NavigationMenuContent>
              <HeaderNavigationMenuContent />
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Collections</NavigationMenuTrigger>
            <NavigationMenuContent>
              <HeaderNavigationMenuContent />
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  )
}
