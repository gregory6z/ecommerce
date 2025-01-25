"use client";

import { algoliaClient } from "@/lib/algolia";

import Image from "next/image";
import {
  Configure,
  Hits,
  Index,
  InstantSearch,
  useSearchBox,
} from "react-instantsearch";
import { formatEUR } from "@/lib/utils";
import { Input } from "../ui/input";
import { Search, X } from "lucide-react";

function Hit({ hit }: { hit: any }) {
  const formattedPrice = formatEUR(hit.price);
  return (
    <div className="flex items-center gap-4 py-4 ">
      <Image width={100} height={100} src={hit.image} alt={""} />
      <div className="flex flex-col gap-1 text-left">
        <h3 className="font-bold">{hit.title}</h3>
        <p className="text-zinc-600">{hit.variant_title}</p>
        <p className="text-zinc-600">{hit.body_html_safe}</p>
        <p className="font-bold">{formattedPrice}</p>
      </div>
    </div>
  );
}

function SearchResults() {
  const { query } = useSearchBox();

  if (!query) {
    return null;
  }

  return (
    <div className="max-h-screen overflow-y-auto [&::-webkit-scrollbar]:hidden">
      <Hits hitComponent={Hit} />
    </div>
  );
}

interface SuggestionHit {
  query: string;
}

function SuggestionHit({ hit }: { hit: SuggestionHit }) {
  return (
    <div className="cursor-pointer p-2 hover:bg-gray-100">{hit.query}</div>
  );
}
function Suggestions() {
  const { query } = useSearchBox();

  if (!query) {
    return null;
  }

  return (
    <div className="absolute mt-1 w-full rounded-md border bg-white shadow-lg">
      <Index indexName="shopify_products_query_suggestions">
        <Configure hitsPerPage={5} />
        <Hits hitComponent={SuggestionHit} />
      </Index>
    </div>
  );
}

export function SearchBar() {
  return (
    <InstantSearch searchClient={algoliaClient} indexName="shopify_products">
      <AlgoliaSearchBox />
      <Suggestions />
      <SearchResults />
    </InstantSearch>
  );
}

function AlgoliaSearchBox() {
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
