export interface ProductVariant {
  id: string
  title: string
  availableForSale: boolean
  price: {
    amount: string
    currencyCode: string
  }
  compareAtPrice: {
    amount: string
    currencyCode: string
  } | null
  quantityAvailable: number
  selectedOptions: {
    name: string
    value: string
  }[]
}
export interface Product {
  id: string
  title: string
  handle: string
  tags: string[] | null
  description: string
  collection: string
  createdAt: Date
  images: {
    url: string
    altText: string
  }[]
  variants: ProductVariant[]
  price: {
    amount: string
    currencyCode: string
  }
  compareAtPrice: {
    amount: string
    currencyCode: string
  } | null
  availableForSale: boolean
}

// export async function getProducts({
//   tags,
//   collection,
//   handle,
//   id,
// }: { tags?: string; collection?: string; handle?: string; id?: string } = {}) {
//   try {
//     const searchParams = new URLSearchParams()

//     if (tags) {
//       searchParams.append("tags", tags)
//     }
//     if (collection) {
//       searchParams.append("collection", collection)
//     }
//     if (handle) {
//       searchParams.append("handle", handle)
//     }
//     if (id) {
//       searchParams.append("id", id)
//     }

//     const queryString = searchParams.toString()

//     const [productsResponse, pricesResponse] = await Promise.all([
//       api(`/products${queryString ? `?${queryString}` : ""}`, {
//         next: {
//           // tags: [
//           //   handle ? `product-${handle}` : "",
//           //   collection ? `collection-${collection}` : "",
//           //   tags ? `tag-${tags}` : "",
//           //   id ? `product-id-${id}` : "",
//           // ].filter(Boolean),
//           revalidate: 86400, // 24 hours in seconds
//         },
//       }),
//       api(`/products/prices${queryString ? `?${queryString}` : ""}`, {
//         next: { revalidate: 86400 }, // 24 hours in seconds
//       }),
//     ])

//     const { products } = await productsResponse.json()

//     const { prices } = await pricesResponse.json()

//     if (!products?.length || !prices?.length) {
//       return []
//     }

//     const combinedProducts = products.map((product: Product) => {
//       const productPrices = prices.find((price: any) => price.id === product.id)
//       return {
//         ...product,
//         price: productPrices?.price,
//         compareAtPrice: productPrices?.compareAtPrice,
//         availableForSale: productPrices?.availableForSale,
//         variants: product.variants.map((variant) => {
//           const priceVariant = productPrices?.variants?.find(
//             (v: { id: string }) => v.id === variant.id,
//           )
//           return {
//             ...variant,
//             price: priceVariant?.price,
//             compareAtPrice: priceVariant?.compareAtPrice,
//             quantityAvailable: priceVariant?.quantityAvailable,
//             availableForSale: priceVariant?.availableForSale,
//           }
//         }),
//       }
//     })

//     if (combinedProducts.length === 1) {
//       return combinedProducts[0]
//     }

//     return combinedProducts as Product[]
//   } catch (error) {
//     console.error("Error fetching products:", error)
//     return []
//   }
// }

export interface Product2 {
  // Campos originais
  id: string
  title: string
  handle: string
  tags: string[] | null
  description: string
  collection: string
  createdAt: Date
  images: {
    url: string
    altText: string
  }[]
  variants: ProductVariant[]
  price: {
    amount: string
    currencyCode: string
  }
  compareAtPrice: {
    amount: string
    currencyCode: string
  } | null
  availableForSale: boolean

  // Metafields existentes
  details?: string
  ingredients?: string
  instructions?: string
  eco_details?: string

  // Novos metafields para categorização
  product_type?: string // facial_care, body_care, hair_care, makeup, fragrance, botanical
  subcategory?: string // Para as subcategorias como anti-age, hydratants, etc.

  // Características do produto
  skin_type?: string // dry, oily, combination, sensitive, normal, all
  hair_type?: string // straight, wavy, curly, coily, all
  concern?: string[] // aging, acne, dryness, etc.
  benefits?: string[] // moisturizing, soothing, anti_aging, etc.
  botanical_ingredient?: string[] // aloe_vera, argan, etc.
  fragrance_family?: string // floral, woody, oriental, etc.
  spf_level?: number

  // Certificações
  is_organic?: boolean
  is_vegan?: boolean
  is_cruelty_free?: boolean

  // Campos calculados com base em tags ou outras propriedades
  isBestseller?: boolean
  isNewArrival?: boolean
  isOnSale?: boolean
  isLimitedEdition?: boolean

  // Campos úteis para quiz de rotinas
  routine_step?: string // cleanser, toner, serum, etc.
  usage_time?: string[] // morning, evening, weekly

  // Campos adicionais para SEO e navegação
  searchKeywords?: string[] // Palavras-chave adicionais para pesquisa
  relatedProducts?: string[] // IDs de produtos relacionados
  rating?: number // Avaliação média do produto
  reviewCount?: number // Número de avaliações
}
