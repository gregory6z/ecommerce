import { shopifyClient } from "@/lib/shopify";
import { NextResponse } from "next/server";

export interface Metafield {
  id: string;
  namespace: string;
  key: string;
  value: string;
  type: string;
}

export interface ProductWithMetafields {
  id: string;
  title: string;
  handle: string;
  metafields: {
    edges: Array<{
      node: Metafield;
    }>;
  };
}

interface ProductNode {
  id: string;
  title: string;
  handle: string;
  description: string;
  tags: string[];
  collections?: {
    edges: Array<{
      node: {
        handle: string;
      };
    }>;
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        selectedOptions: Array<{
          name: string;
          value: string;
        }>;
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tags = searchParams.get("tags");
  const collection = searchParams.get("collection");
  const handle = searchParams.get("handle");
  const ids = searchParams.get("id")?.split(",");

  const productsQuery = `
    query Products($query: String!) {
      products(first: 40, query: $query) {
        edges {
          node {
            id
            title
            handle
            description
            tags
            collections(first: 1) {
              edges {
                node {
                  handle
                }
              }
            }
            images(first: 4) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  selectedOptions {
                    name
                    value
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
    query GetCollection($handle: String!) {
      collection(handle: $handle) {
        products(first: 40) {
          edges {
            node {
              id
              title
              handle
              description
              tags
              collections(first: 1) {
                edges {
                  node {
                    handle
                  }
                }
              }
              images(first: 4) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    selectedOptions {
                      name
                      value
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

  const handleQuery = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      tags
      collections(first: 1) {
        edges {
          node {
            handle
          }
        }
      }
      images(first: 4) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;

  const idsQuery = `
query GetProductsByIds($ids: [ID!]!) {
  nodes(ids: $ids) {
    ... on Product {
      id
      title
      handle
      description
      tags
      collections(first: 1) {
        edges {
          node {
            handle
          }
        }
      }
      images(first: 4) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            selectedOptions {
              name
              value
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

    if (ids && ids.length > 0) {
      const response = await shopifyClient.request<{ nodes: ProductNode[] }>(
        idsQuery,
        { ids },
      );

      const productData = {
        products: {
          edges: response.nodes.map((product) => ({
            node: product,
          })),
        },
      } as ProductsResponse;

      data = productData;
    } else if (handle) {
      const response = await shopifyClient.request<{ product: ProductNode }>(
        handleQuery,
        { handle },
      );

      const productData = {
        products: {
          edges: [
            {
              node: response.product,
            },
          ],
        },
      } as ProductsResponse;

      data = productData;
    } else if (collection && !tags) {
      data = await shopifyClient.request<CollectionResponse>(collectionQuery, {
        handle: collection,
      });
    } else {
      let queryFilter = "";
      if (tags && collection) {
        queryFilter = `tag:'${tags}' AND in_collection:'${collection}'`;
      } else if (tags) {
        queryFilter = `tag:'${tags}'`;
      }

      data = await shopifyClient.request<ProductsResponse>(productsQuery, {
        query: queryFilter,
      });
    }

    const products =
      "collection" in data
        ? data.collection.products.edges
        : data.products.edges;

    const formattedProducts = products.map((edge) => ({
      id: edge.node.id,
      title: edge.node.title,
      handle: edge.node.handle,
      tags: edge.node.tags,
      collection: edge.node.collections?.edges[0]?.node?.handle || "",
      description: edge.node.description,
      images: edge.node.images.edges.map((image) => ({
        url: image.node.url,
        altText: image.node.altText,
      })),
      variants: edge.node.variants.edges.map((variant) => ({
        id: variant.node.id,
        title: variant.node.title,
        selectedOptions: variant.node.selectedOptions,
      })),
    }));

    return NextResponse.json({ products: formattedProducts });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}
