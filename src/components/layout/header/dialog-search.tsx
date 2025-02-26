"use client"

import { ProductCard } from "@/components/product/product-card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { getAllProducts } from "@/http/get-all-products"
import type { Product } from "@/http/products"
import { configureMeilisearchIndex, meilisearch } from "@/lib/meilisearch"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Search, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Logo } from "./logo"

const searchFormSchema = z.object({
  searchTerm: z
    .string()
    .min(2, "Search term must be at least 2 characters")
    .max(50, "Search term must be less than 50 characters"),
})

type SearchFormData = z.infer<typeof searchFormSchema>

export function DialogSearch() {
  const [products, setProducts] = useState<Product[] | null>(null)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [open, setOpen] = useState(false)

  const { register, watch, setValue } = useForm<SearchFormData>()
  const searchTerm = watch("searchTerm")

  useEffect(() => {
    const fetchSuggestionsAndProducts = async () => {
      if (!searchTerm || searchTerm.length < 2) {
        setProducts(null)
        setSuggestions([])
        return
      }

      try {
        const results = await meilisearch.index("products").search(searchTerm, {
          limit: 15,
          attributesToRetrieve: ["*"],
          attributesToSearchOn: ["title", "description", "collection", "tags"],
          matchingStrategy: "all",
          showMatchesPosition: true,
          facets: ["*"],
          showRankingScore: true,
        })

        console.log("Results:", results)

        const allSettings = await meilisearch.index("products").getSettings()
        console.log("All Settings:", allSettings)

        const phraseSuggestions = results.hits
          .map((hit) => hit.title)
          .filter((title) => title && title.trim() !== "")
          .slice(0, 5)

        const collectionsSuggestions = results.hits
          .map((hit) => hit.collection)
          .filter(
            (collection, index, self) =>
              collection &&
              collection.trim() !== "" &&
              self.indexOf(collection) === index,
          )
          .slice(0, 3)

        setSuggestions([...collectionsSuggestions, ...phraseSuggestions])

        const allProducts = await getAllProducts()
        const hitIds = results.hits.map(
          (hit) => `gid://shopify/Product/${hit.id}`,
        )
        const filteredProducts = allProducts
          .filter((product: Product) => hitIds.includes(product.id))
          .slice(0, 4)

        setProducts(filteredProducts)
      } catch (error) {
        console.error("Erro ao buscar sugestões:", error)
        setSuggestions([])
        setProducts(null)
      }
    }

    const timeoutId = setTimeout(fetchSuggestionsAndProducts, 300)
    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="mr-4 hidden w-[248px] items-center gap-2 rounded-sm border border-zinc-200 bg-zinc-100 px-4 py-[0.75rem] xl:flex">
          <Search />
          <p className="text-xs">
            {searchTerm
              ? searchTerm.length > 25
                ? `${searchTerm.slice(0, 25)}...`
                : searchTerm
              : "Que cherche-tu aujourd'hui?..."}
          </p>
        </div>
      </DialogTrigger>

      <DialogContent
        variant="top"
        className="min-w-full [&_[data-overlay]]:top-9"
      >
        <DialogTitle className="sr-only">Search Products</DialogTitle>

        <DialogHeader className="flex h-[7.5rem] items-center justify-center border-zinc-200">
          <div className="flex w-full max-w-[968px] items-center justify-between">
            <Logo />

            <div className="relative min-w-[600px]">
              <form>
                <Input
                  {...register("searchTerm")}
                  className="w-full pr-10 pl-10"
                  placeholder="Que cherche-tu aujourd'hui?..."
                  autoComplete="off"
                />
                <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-gray-900" />
              </form>
            </div>

            <DialogPrimitive.Close>
              <X strokeWidth={1.5} className="h-10 w-10 text-zinc-600" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </div>
        </DialogHeader>

        <div className="flex border-zinc-300 border-t px-[10rem]">
          <section className="h-full w-[364px] border-zinc-300 border-r p-6">
            <h3 className="font-bold uppercase">Suggestions</h3>

            <div className="mt-6 flex flex-col gap-4">
              {suggestions && suggestions.length > 0 ? (
                suggestions.map((suggestion, index) => (
                  <button
                    key={`${suggestion}-${
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                      index
                    }`}
                    type="button"
                    className="text-left hover:font-bold"
                    onClick={() => {
                      setValue("searchTerm", suggestion)
                    }}
                  >
                    {suggestion}
                  </button>
                ))
              ) : (
                <p className="text-zinc-500">Aucune suggestion trouvée</p>
              )}
            </div>
          </section>

          <section className="h-full p-6">
            <h3 className="font-bold uppercase">
              {searchTerm
                ? `Résultats pour "${searchTerm}"`
                : "Produits populaires"}
            </h3>
            <div className="flex w-full gap-2">
              {products && products.length > 0 ? (
                products.map((product) => (
                  <div className="w-[264px]" key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))
              ) : (
                <div className="flex w-full items-center justify-center py-8">
                  <p className="text-zinc-500">Aucun produit trouvé</p>
                </div>
              )}
            </div>
            {products && products.length > 0 && (
              <p className="my-4 text-center font-bold uppercase underline">
                Voir tous les résultats
              </p>
            )}
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}
