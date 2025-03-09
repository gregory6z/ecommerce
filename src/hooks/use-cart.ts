import type { Product } from "@/http/products"
import { getRecommendations } from "@/http/recommendations"
import type { CartItem } from "@/types/cart"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

export interface CartResponse {
  cartId: string
  items: CartItem[]
  total: {
    amount: string
    currencyCode: string
  }
}

export function useCart() {
  const queryClient = useQueryClient()
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const { data: cart } = useQuery<CartResponse | null>({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await fetch("/api/cart")
      // biome-ignore lint/style/useBlockStatements: <explanation>
      if (!response.ok) return null

      const data = await response.json()
      return data || null // Garante retorno de null se não houver dados
    },
  })

  const { data: recommendations } = useQuery<Product[]>({
    queryKey: ["recommendations"],
    queryFn: () => [],
    enabled: false,
  })

  const addToCart = useMutation({
    mutationFn: async ({
      variantId,
      quantity,
    }: {
      variantId: string
      quantity: number
      productId: string
    }) => {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variantId, quantity }),
      })

      // biome-ignore lint/style/useBlockStatements: <explanation>
      if (!response.ok) throw new Error("Failed to add to cart")
    },
    onSuccess: async (_, { productId }) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
      const recommendations = await getRecommendations(productId)
      queryClient.setQueryData(["recommendations"], recommendations)
    },
  })

  const updateQuantity = useMutation({
    mutationFn: async ({
      lineId,
      quantity,
    }: {
      lineId: string
      quantity: number
    }) => {
      const response = await fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lineId, quantity }),
      })

      // biome-ignore lint/style/useBlockStatements: <explanation>
      if (!response.ok) throw new Error("Failed to update quantity")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    },
  })

  const removeFromCart = useMutation({
    mutationFn: async (lineId: string) => {
      const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lineId }),
      })

      // biome-ignore lint/style/useBlockStatements: <explanation>
      if (!response.ok) throw new Error("Failed to remove from cart")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    },
  })

  return {
    cart: cart ?? {
      cartId: "",
      items: [],
      total: { amount: "0", currencyCode: "EUR" },
    },
    recommendations: recommendations ?? [],
    addToCart,
    updateQuantity,
    removeFromCart,
    isSheetOpen,
    setIsSheetOpen,
  }
}
