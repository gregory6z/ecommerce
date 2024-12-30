// app/api/checkout/route.ts
import { shopifyClient } from "@/lib/shopify";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId");

  if (!cartId) {
    return NextResponse.json(
      { error: "Carrinho não encontrado" },
      { status: 404 },
    );
  }

  try {
    const query = `
      query getCheckoutUrl($cartId: ID!) {
        cart(id: $cartId) {
          checkoutUrl
        }
      }
    `;

    const response: {
      cart: {
        checkoutUrl: string;
      };
    } = await shopifyClient.request(query, {
      cartId: cartId.value,
    });

    // Adiciona o return_to à URL do checkout
    const checkoutUrl = `${response.cart.checkoutUrl}?return_to=${process.env.NEXT_PUBLIC_APP_URL}`;

    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    console.error("Erro ao criar checkout:", error);
    return NextResponse.json(
      { error: "Falha ao gerar URL do checkout" },
      { status: 500 },
    );
  }
}
