"use client";

import Image from "next/image";
import { Hits, InstantSearch, useSearchBox } from "react-instantsearch";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { SearchClient } from "algoliasearch";
import type { Product } from "@/http/products";

function createSearchClient() {
  return {
    async search(requests: any[]) {
      const searches = requests.map(async (request) => {
        if (!request || !request.params) {
          return Promise.resolve({
            hits: [],
            nbHits: 0,
            page: 0,
            nbPages: 0,
            hitsPerPage: 0,
            processingTimeMS: 0,
            query: "",
          });
        }

        const {
          indexName = "products",
          params: { hitsPerPage = 20, page = 0 } = {},
        } = request;

        const searchQuery = request.params?.query || request.query || "";

        if (!indexName) {
          return Promise.resolve({
            hits: [],
            nbHits: 0,
            page: 0,
            nbPages: 0,
            hitsPerPage: 0,
            processingTimeMS: 0,
            query: "",
          });
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_MEILISEARCH_HOST}/indexes/${indexName}/search`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY}`,
            },
            body: JSON.stringify({
              q: searchQuery,
              limit: hitsPerPage,
              offset: page * hitsPerPage,
            }),
          },
        );

        const data = await response.json();

        return {
          hits: data.hits || [],
          nbHits: data.estimatedTotalHits || 0,
          page,
          nbPages: Math.ceil((data.estimatedTotalHits || 0) / hitsPerPage),
          hitsPerPage,
          processingTimeMS: data.processingTimeMs || 0,
          query: searchQuery,
        };
      });

      const results = await Promise.all(searches);
      return {
        results,
      };
    },
    searchForFacetValues() {
      return Promise.resolve({ facetHits: [] });
    },
  };
}

const searchClient = createSearchClient();

function ProductHit({ hit }: { hit: Product }) {
  if (!hit) {
    return null;
  }

  const formattedPrice = hit.price
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR",
      }).format(Number(hit.price.amount))
    : "";

  return (
    <div key={hit.id} className="flex items-center gap-4 py-4">
      {hit.images?.[0] && (
        <Image
          key={hit.id}
          width={100}
          height={100}
          src={hit.images[0].url}
          alt={hit.images[0].altText || hit.title || "Product image"}
          className="object-cover"
        />
      )}
      <div className="flex flex-col gap-1 text-left">
        {hit.title && <h3 className="font-bold">{hit.title}</h3>}

        {formattedPrice && <p className="font-bold">{formattedPrice}</p>}
      </div>
    </div>
  );
}
function SearchBox() {
  const { refine, query = "" } = useSearchBox();

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

function SearchSuggestions() {
  const { refine } = useSearchBox();

  return (
    <div className="flex flex-col gap-4 pt-2 text-left">
      <Hits
        hitComponent={({ hit }) => (
          <p
            onClick={() => refine(hit.title)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                refine(hit.title);
              }
            }}
            className="cursor-pointer hover:text-gray-600"
          >
            {hit.title}
          </p>
        )}
      />
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
      <Hits hitComponent={ProductHit} />
    </div>
  );
}

export function SearchBar() {
  return (
    <InstantSearch
      searchClient={searchClient as unknown as SearchClient}
      indexName="products"
    >
      <SearchBox />
      <SearchSuggestions />

      {/* <SearchResults /> */}
    </InstantSearch>
  );
}
