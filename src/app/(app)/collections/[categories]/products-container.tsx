"use client"

import { ProductCard } from "@/components/product/product-card"
import { useSort } from "@/hooks/use-sort-products"
import type { Product } from "@/http/products"
import { useQueryClient } from "@tanstack/react-query"
import { memo, useEffect } from "react"

interface ProductsContainerProps {
  filterProducts: Product[]
}

const MemoizedProductCard = memo(ProductCard)

const ProductsContainer = memo(function ProductsContainer({
  filterProducts,
}: ProductsContainerProps) {
  const queryClient = useQueryClient()

  useEffect(() => {
    queryClient.setQueryData(["products"], filterProducts)
  }, [filterProducts, queryClient])

  const { products } = useSort()

  return (
    <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <MemoizedProductCard key={product.id} product={product} />
      ))}
    </div>
  )
})

export { ProductsContainer }
