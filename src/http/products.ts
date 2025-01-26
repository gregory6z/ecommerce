import { api } from "@/data/api";

interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: {
    amount: string;
    currencyCode: string;
  };
  compareAtPrice: {
    amount: string;
    currencyCode: string;
  } | null;
  quantityAvailable: number;
  selectedOptions: {
    name: string;
    value: string;
  }[];
}
export interface Product {
  id: string;
  title: string;
  handle: string;
  tags: string[];
  description: string;
  images: {
    url: string;
    altText: string;
  }[];
  variants: ProductVariant[];
  price: {
    amount: string;
    currencyCode: string;
  };
  compareAtPrice: {
    amount: string;
    currencyCode: string;
  } | null;
  availableForSale: boolean;
}
export async function getProducts({
  tags,
  collection,
}: { tags?: string; collection?: string } = {}) {
  try {
    const searchParams = new URLSearchParams();
    // biome-ignore lint/style/useBlockStatements: <explanation>
    if (tags) searchParams.append("tags", tags);
    // biome-ignore lint/style/useBlockStatements: <explanation>
    if (collection) searchParams.append("collection", collection);

    const queryString = searchParams.toString();

    const [productsResponse, pricesResponse] = await Promise.all([
      api(`/products${queryString ? `?${queryString}` : ""}`, {
        cache: "force-cache",
        next: {
          revalidate: 86400, // 24 horas em segundos
        },
      }),
      api(`/products/prices${queryString ? `?${queryString}` : ""}`, {
        cache: "no-store",
      }),
    ]);

    const { products } = await productsResponse.json();
    const { prices } = await pricesResponse.json();

    if (!products?.length || !prices?.length) {
      return [];
    }

    const combinedProducts = products.map((product: Product) => {
      const productPrices = prices.find(
        (price: any) => price.id === product.id,
      );
      return {
        ...product,
        ...productPrices,
      };
    });

    return combinedProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
