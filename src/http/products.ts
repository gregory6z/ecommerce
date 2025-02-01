import { api } from "@/data/api";

export interface ProductVariant {
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
  handle,
  id,
}: { tags?: string; collection?: string; handle?: string; id?: string } = {}) {
  try {
    const searchParams = new URLSearchParams();

    if (tags) {
      searchParams.append("tags", tags);
    }
    if (collection) {
      searchParams.append("collection", collection);
    }
    if (handle) {
      searchParams.append("handle", handle);
    }
    if (id) {
      searchParams.append("id", id);
    }

    const queryString = searchParams.toString();

    const [productsResponse, pricesResponse] = await Promise.all([
      api(`/products${queryString ? `?${queryString}` : ""}`, {
        next: {
          tags: [
            handle ? `product-${handle}` : "",
            collection ? `collection-${collection}` : "",
            tags ? `tag-${tags}` : "",
            id ? `product-id-${id}` : "",
          ].filter(Boolean),
          revalidate: 86400, // 24 hours in seconds
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
        price: productPrices?.price,
        compareAtPrice: productPrices?.compareAtPrice,
        availableForSale: productPrices?.availableForSale,
        variants: product.variants.map((variant) => {
          const priceVariant = productPrices?.variants?.find(
            (v: { id: string }) => v.id === variant.id,
          );
          return {
            ...variant,
            price: priceVariant?.price,
            compareAtPrice: priceVariant?.compareAtPrice,
            quantityAvailable: priceVariant?.quantityAvailable,
            availableForSale: priceVariant?.availableForSale,
          };
        }),
      };
    });

    if (combinedProducts.length === 1) {
      return combinedProducts[0];
    }

    return combinedProducts as Product[];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
