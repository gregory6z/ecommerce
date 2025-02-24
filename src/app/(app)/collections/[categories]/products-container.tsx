"use client"
import { ProductCard } from "@/components/product/product-card"
import { useSort } from "@/hooks/use-sort-products"
import type { Product } from "@/http/products"
import { useQueryClient } from "@tanstack/react-query"

interface ProductsContainerProps {
  filterProducts: Product[]
}

export function ProductsContainer({ filterProducts }: ProductsContainerProps) {
  const queryClient = useQueryClient()
  queryClient.setQueryData(["products"], filterProducts)

  const { products } = useSort()

  return (
    <div className=" mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
