import { api } from "@/data/api"

export async function getAllProducts() {
  const response = await api("/all-products", {
    next: {
      tags: ["all-products"],
    },
  })

  const { products } = await response.json()
  return products
}
