import { shopifyClient } from "@/lib/shopify";
import { NextResponse } from "next/server";

interface ProductNode {
  id: string;
  availableForSale: boolean;
  totalInventory: number;
  price: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  compareAtPrice?: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        quantityAvailable: number;
        currentlyNotInStock: boolean;
        availableForSale: boolean;
        price: {
          amount: string;
          currencyCode: string;
        };
        compareAtPrice?: {
          amount: string;
          currencyCode: string;
        };
      };
    }>;
  };
}

interface ProductsResponse {
  products: {
    edges: Array<{
      node: ProductNode;
    }>;
  };
}

interface CollectionResponse {
  collection: {
    products: {
      edges: Array<{
        node: ProductNode;
      }>;
    };
  };
}

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tags = searchParams.get("tags");
  const collection = searchParams.get("collection");

  const productsQuery = `
    query ProductsPrices($query: String!) {
      products(first: 40, query: $query) {
        edges {
          node {
            id
            availableForSale
            totalInventory
            price: priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPrice: compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  quantityAvailable
                  currentlyNotInStock
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const collectionQuery = `
    query CollectionPrices($handle: String!) {
      collection(handle: $handle) {
        products(first: 40) {
          edges {
            node {
              id
              availableForSale
              totalInventory
              price: priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              compareAtPrice: compareAtPriceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              variants(first: 10) {
                edges {
                  node {
                    id
                    quantityAvailable
                    currentlyNotInStock
                    availableForSale
                    price {
                      amount
                      currencyCode
                    }
                    compareAtPrice {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    let data: ProductsResponse | CollectionResponse;

    if (collection && !tags) {
      data = await shopifyClient.request(collectionQuery, {
        handle: collection,
      });
    } else {
      let queryFilter = "";
      if (tags && collection) {
        queryFilter = `tag:'${tags}' AND in_collection:'${collection}'`;
      } else if (tags) {
        queryFilter = `tag:'${tags}'`;
      }

      data = (await shopifyClient.request(productsQuery, {
        query: queryFilter,
      })) as ProductsResponse;
    }

    const products =
      "collection" in data
        ? data.collection.products.edges
        : data.products.edges;

    const formattedPrices = products.map((edge) => ({
      id: edge.node.id,
      availableForSale: edge.node.availableForSale,
      totalInventory: edge.node.totalInventory,
      price: edge.node.price.minVariantPrice,
      compareAtPrice: edge.node.compareAtPrice?.minVariantPrice || null,
      variants: edge.node.variants.edges.map((variant) => ({
        id: variant.node.id,
        quantityAvailable: variant.node.quantityAvailable,
        currentlyNotInStock: variant.node.currentlyNotInStock,
        availableForSale: variant.node.availableForSale,
        price: variant.node.price,
        compareAtPrice: variant.node.compareAtPrice || null,
      })),
    }));

    return NextResponse.json({ prices: formattedPrices });
  } catch (error) {
    console.error("Error searching products prices:", error);
    return NextResponse.json(
      { error: "Failed to search products prices" },
      { status: 500 },
    );
  }
}
