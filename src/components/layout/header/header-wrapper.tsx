"use client";

import { type ReactNode, useEffect, useState } from "react";

export function HeaderWrapper({ children }: { children: ReactNode }) {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 1280) {
        return; // Skip for xl screens
      }

      const currentScrollPos = window.scrollY;
      setIsHidden(currentScrollPos > prevScrollPos && currentScrollPos > 100);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <div
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {children}
    </div>
  );
}
