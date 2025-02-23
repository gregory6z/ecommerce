import { revalidateTag } from "next/cache"
import { headers } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

interface ShopifyProduct {
  id: number
  title: string
  handle: string
  status: string
  variants: Array<{
    id: number
    price: string
    inventory_quantity: number
    sku: string
  }>
  images: Array<{
    src: string
    alt?: string
  }>
}

export async function POST(request: NextRequest) {
  try {
    const headersList = headers()
    const topic = (await headersList).get("x-shopify-topic")

    const body = await request.text()
    const product: ShopifyProduct = JSON.parse(body)

    console.log("Webhook recebido:", {
      topic,
      productId: product.id,
      title: product.title,
      price: product.variants[0]?.price,
      inventory: product.variants[0]?.inventory_quantity,
    })

    // getProductById(product.id.toString())

    revalidateTag(`product-${product.id}`)
    // revalidateTag("products")

    // Se estiver usando Meilisearch, atualize o índice
    // await updateMeilisearchIndex(product)

    return NextResponse.json({
      success: true,
      message: "Produto atualizado com sucesso",
      product: {
        id: product.id,
        title: product.title,
        updatedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("Erro ao processar webhook:", error)
    return NextResponse.json(
      { error: "Erro ao processar webhook" },
      { status: 500 },
    )
  }
}
