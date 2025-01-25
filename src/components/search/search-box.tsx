"use client";

import { useSearchBox } from "react-instantsearch";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

export function AlgoliaSearchBox() {
  const { refine, query } = useSearchBox();

  return (
    <div className="relative">
      <Input
        value={query}
        onChange={(e) => refine(e.target.value)}
        className="w-full pr-10 pl-10"
        placeholder="Search products..."
      />
      <Search
        className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-gray-400"
        strokeWidth={1.5}
      />
      {query && (
        <X
          onClick={() => refine("")}
          className="-translate-y-1/2 absolute top-1/2 right-3 h-4 w-4 cursor-pointer text-gray-400"
          strokeWidth={1.5}
        />
      )}
    </div>
  );
}
