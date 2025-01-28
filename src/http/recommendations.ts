import { api } from "@/data/api";
import { getProducts, type Product } from "./products";

export async function getRecommendations(productId: string) {
  try {
    const response = await api(
      `/products/recommendations?productId=${productId}`,
    );

    const { recommendedIds } = await response.json();

    const idsParam = Array.isArray(recommendedIds)
      ? recommendedIds.join(",")
      : recommendedIds;

    const products = await getProducts({ id: idsParam });

    console.log(products);

    const recommendedProducts: Product[] = products
      .filter((product: { id: string }) => recommendedIds.includes(product.id))
      .sort(() => Math.random() - 0.5);

    return recommendedProducts;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return [];
  }
}
