import { shopifyClient } from "@/lib/shopify";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");

  const recommendationsQuery = `
    query productRecommendations($productId: ID!) {
      productRecommendations(productId: $productId) {
        id
      }
    }
  `;

  try {
    const data = await shopifyClient.request(recommendationsQuery, {
      productId,
    });

    if (
      typeof data === "object" &&
      data !== null &&
      "productRecommendations" in data
    ) {
      return NextResponse.json({
        recommendedIds: (data.productRecommendations as any[]).map((p) => p.id),
      });
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error fetching product recommendations:", error);
    return NextResponse.json(
      { error: "Failed to fetch product recommendations" },
      { status: 500 },
    );
  }
}
