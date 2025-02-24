"use client"

import type { Product } from "@/http/products"
import { useQuery, useQueryClient } from "@tanstack/react-query"

export const SORT_OPTIONS = {
  PRICE_ASC: "PRICE_ASC",
  PRICE_DESC: "PRICE_DESC",
  RELEVANCE: "RELEVANCE",
  NEWEST: "NEWEST",
} as const

type SortOption = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS]

const sortProducts = (products: Product[], sortOption: SortOption) => {
  switch (sortOption) {
    case SORT_OPTIONS.PRICE_ASC:
      return [...products].sort(
        (a, b) =>
          Number.parseFloat(a.price.amount) - Number.parseFloat(b.price.amount),
      )
    case SORT_OPTIONS.PRICE_DESC:
      return [...products].sort(
        (a, b) =>
          Number.parseFloat(b.price.amount) - Number.parseFloat(a.price.amount),
      )
    case SORT_OPTIONS.NEWEST:
      return [...products].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
    case SORT_OPTIONS.RELEVANCE:
      return products
  }
}

export function useSort() {
  const queryClient = useQueryClient()

  const { data: currentSort } = useQuery({
    queryKey: ["sort-option"],
    initialData: SORT_OPTIONS.RELEVANCE,
  })

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["products"],
    staleTime: Number.POSITIVE_INFINITY,
  })

  const setSortOption = (option: SortOption) => {
    queryClient.setQueryData(["sort-option"], option)
  }

  return {
    currentSort,
    setSortOption,
    products: sortProducts(products, currentSort as SortOption),
  }
}
