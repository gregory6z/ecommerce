import { shopifyClient } from "@/lib/shopify"
import { NextResponse } from "next/server"

interface ProductNode {
  id: string
  title: string
  handle: string
  description: string
  tags: string[]
  createdAt: Date
  availableForSale: boolean
  totalInventory: number
  priceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  compareAtPriceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  } | null
  collections: {
    edges: Array<{
      node: {
        handle: string
      }
    }>
  }
  images: {
    edges: Array<{
      node: {
        url: string
        altText: string | null
      }
    }>
  }
  variants: {
    edges: Array<{
      node: {
        id: string
        title: string
        quantityAvailable: number
        availableForSale: boolean
        price: {
          amount: string
          currencyCode: string
        }
        compareAtPrice: {
          amount: string
          currencyCode: string
        } | null
        selectedOptions: Array<{
          name: string
          value: string
        }>
      }
    }>
  }
}

interface ProductsResponse {
  products: {
    edges: Array<{
      node: ProductNode
    }>
    pageInfo: {
      hasNextPage: boolean
      endCursor: string | null
    }
  }
}

export async function GET() {
  const productsQuery = `
    query Products($cursor: String) {
        products(
      first: 250, 
      after: $cursor,
      sortKey: RELEVANCE
    ) {
        edges {
          node {
            id
            title
            handle
            description
            tags
            createdAt
            availableForSale
            totalInventory
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            collections(first: 1) {
              edges {
                node {
                  handle
                }
              }
            }
            images(first: 50) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 50) {
              edges {
                node {
                  id
                  title
                  quantityAvailable
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `

  try {
    let allProducts: ProductNode[] = []
    let hasNextPage = true
    let cursor: string | null = null

    while (hasNextPage) {
      const data: ProductsResponse =
        await shopifyClient.request<ProductsResponse>(productsQuery, {
          cursor: cursor,
        })

      const products = data.products.edges.map((edge) => edge.node)
      allProducts = [...allProducts, ...products]

      hasNextPage = data.products.pageInfo.hasNextPage
      cursor = data.products.pageInfo.endCursor
    }

    const formattedProducts = allProducts.map((product) => ({
      id: product.id,
      title: product.title,
      handle: product.handle,
      tags: product.tags,
      collection: product.collections?.edges[0]?.node?.handle || "",
      createdAt: new Date(product.createdAt),
      description: product.description,
      availableForSale: product.availableForSale,
      price: product.priceRange.minVariantPrice,
      compareAtPrice: product.compareAtPriceRange?.minVariantPrice || null,
      images: product.images.edges.map((image) => ({
        url: image.node.url,
        altText: image.node.altText,
      })),
      variants: product.variants.edges.map((variant) => ({
        id: variant.node.id,
        title: variant.node.title,
        availableForSale: variant.node.availableForSale,
        price: variant.node.price,
        compareAtPrice: variant.node.compareAtPrice,
        quantityAvailable: variant.node.quantityAvailable,
        selectedOptions: variant.node.selectedOptions,
      })),
    }))

    return NextResponse.json(
      {
        products: formattedProducts,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=86400",
          "X-Tags": [
            "all-products",
            ...formattedProducts.map((p) => `product-${p.id}`),
          ].join(","),
        },
      },
    )
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    )
  }
}
