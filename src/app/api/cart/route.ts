import { shopifyClient } from "@/lib/shopify";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();

  const cartId = cookieStore.get("cartId");

  if (!cartId) {
    return NextResponse.json({ cart: null });
  }

  const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  quantityAvailable
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                  image {
                    url
                    altText
                  }
                  product {
                    title
                    handle
                    description
                    tags
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  `;
  try {
    const response: {
      cart: {
        id: string;
        lines: {
          edges: Array<{
            node: {
              id: string;
              quantity: number;
              merchandise: {
                id: string;
                title: string;
                quantityAvailable: number;
                price: {
                  amount: string;
                  currencyCode: string;
                };
                compareAtPrice: {
                  amount: string;
                  currencyCode: string;
                } | null;
                image: {
                  url: string;
                  altText: string | null;
                };
                product: {
                  title: string;
                  handle: string;
                  description: string;
                  tags: string[];
                };
              };
            };
          }>;
        };
        cost: {
          totalAmount: {
            amount: string;
            currencyCode: string;
          };
        };
      };
    } = await shopifyClient.request(query, {
      cartId: cartId.value,
    });

    const transformedCart = {
      cartId: response.cart.id,
      items: response.cart.lines.edges.map(({ node }) => ({
        // Informações do carrinho
        cartId: response.cart.id,
        lineId: node.id,
        quantity: node.quantity,
        variantId: node.merchandise.id,

        // Informações do produto
        id: node.merchandise.id,
        title: node.merchandise.product.title,
        handle: node.merchandise.product.handle,
        description: node.merchandise.product.description,
        tags: node.merchandise.product.tags,
        availableForSale: node.merchandise.quantityAvailable > 0,
        image: node.merchandise.image,
        price: node.merchandise.price,
        compareAtPrice: node.merchandise.compareAtPrice,
      })),
      total: response.cart.cost.totalAmount,
    };

    return NextResponse.json(transformedCart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 },
    );
  }
} // POST /api/cart - Criar/Adicionar ao carrinho
export async function POST(request: Request) {
  const { variantId, quantity } = await request.json();

  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId");

  try {
    if (!cartId) {
      const query = `
        mutation createCart($input: CartInput!) {
          cartCreate(input: $input) {
            cart {
              id
            }
          }
        }
      `;

      const variables = {
        input: {
          lines: [
            {
              quantity,
              merchandiseId: variantId,
            },
          ],
        },
      };

      const response: {
        cartCreate?: {
          cart: {
            id: string;
          };
        };
        errors?: unknown;
      } = await shopifyClient.request(query, variables);

      if (response.errors) {
        throw new Error("Erro ao criar o carrinho");
      }

      if (!response.cartCreate) {
        throw new Error("Resposta inválida ao criar o carrinho");
      }

      const newCartId = response.cartCreate.cart.id;

      cookieStore.set("cartId", newCartId);

      return NextResponse.json(response.cartCreate.cart);
    }

    // Add to existing cart
    const query = `
      mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            id
          }
        }
      }
    `;

    const variables = {
      cartId: cartId.value,
      lines: [
        {
          quantity,
          merchandiseId: variantId,
        },
      ],
    };

    const response: {
      data?: {
        cartLinesAdd: {
          cart: {
            id: string;
          };
        };
      };
    } = await shopifyClient.request(query, variables);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json(
      { error: "Erro ao adicionar ao carrinho" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  const { lineId } = await request.json();
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId");

  if (!cartId) {
    return NextResponse.json({ error: "Cart not found" }, { status: 404 });
  }

  try {
    const query = `
      mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
            id
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    await shopifyClient.request(query, {
      cartId: cartId.value,
      lineIds: [lineId],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing item:", error);
    return NextResponse.json(
      { error: "Failed to remove item from cart" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  const { lineId, quantity } = await request.json();
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId");

  if (!cartId) {
    return NextResponse.json({ error: "Cart not found" }, { status: 404 });
  }

  try {
    const query = `
      mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            id
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    await shopifyClient.request(query, {
      cartId: cartId.value,
      lines: [
        {
          id: lineId,
          quantity,
        },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update quantity" },
      { status: 500 },
    );
  }
}
