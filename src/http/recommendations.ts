import { api } from "@/data/api"
import { getAllProducts } from "./get-all-products"
import type { Product } from "./products"

export async function getRecommendations(productId: string) {
  try {
    const response = await api(
      `/products/recommendations?productId=${productId}`,
      {
        cache: "no-store",
      },
    )

    const { recommendedIds } = await response.json()

    // const idsParam = Array.isArray(recommendedIds)
    //   ? recommendedIds.join(",")
    //   : recommendedIds

    const products = await getAllProducts()

    const recommendedProducts: Product[] = products
      .filter((product: { id: string }) => recommendedIds.includes(product.id))
      .sort(() => Math.random() - 0.5)

    return recommendedProducts
  } catch (error) {
    console.error("Error fetching recommendations:", error)
    return []
  }
}
