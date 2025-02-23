// import type { Product } from "@/http/products"
// import { meilisearch } from "@/lib/meilisearch"
// import { type NextRequest, NextResponse } from "next/server"

// const adminToken = process.env.ADMIN_INDEX_TOKEN

// export async function POST(request: NextRequest) {
//   const authHeader = request.headers.get("authorization")

//   if (!authHeader || authHeader !== `Bearer ${adminToken}`) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//   }

//   try {
//     const existingStats = await meilisearch.index("products").getStats()
//     const products = await getProducts()

//     const formattedProducts = products.map((product: Product) => ({
//       ...product,
//       id: product.id.split("/").pop(),
//     }))

//     if (existingStats.numberOfDocuments !== products.length) {
//       await meilisearch.index("products").addDocuments(formattedProducts)

//       const updatedStats = await meilisearch.index("products").getStats()

//       return NextResponse.json({
//         message: "Products indexed successfully!",
//         totalProducts: updatedStats.numberOfDocuments,
//         productsIndexed: products.length,
//       })
//     }

//     return NextResponse.json({
//       message: "Products already up to date",
//       totalProducts: existingStats.numberOfDocuments,
//     })
//   } catch (error) {
//     console.error("Error indexing products:", error)
//     return NextResponse.json(
//       { error: "Error indexing products" },
//       { status: 500 },
//     )
//   }
// }
