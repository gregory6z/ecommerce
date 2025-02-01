import { shopifyClient } from "@/lib/shopify";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const handle = searchParams.get("handle");

    if (!handle) {
      return NextResponse.json(
        { error: "Product handle is required" },
        { status: 400 },
      );
    }

    const metafieldsQuery = `
    query ProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        metafields(
          identifiers: [
            {namespace: "custom", key: "earth_conscious_details"},
            {namespace: "custom", key: "details"},
            {namespace: "custom", key: "how_to"},
            {namespace: "custom", key: "ingredients"}
          ]
        ) {
          namespace
          key
          value
        }
      }
    }
  `;

    const data: any = await shopifyClient.request(metafieldsQuery, {
      handle,
    });

    if (!data.productByHandle || !data.productByHandle.metafields) {
      return NextResponse.json(
        { error: "Product or metafields not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      metafields: data.productByHandle.metafields,
    });
  } catch (error) {
    console.error("Error fetching product metafields:", error);
    return NextResponse.json(
      { error: "Failed to fetch product metafields" },
      { status: 500 },
    );
  }
}
