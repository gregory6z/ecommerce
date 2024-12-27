import { env } from "@/env";

export async function fetchShopifyData(query: string, variables: any = {}) {
  const response = await fetch(
    `https://${env.SHOPIFY_STORE_URL}/api/2023-10/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": env.SHOPIFY_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    },
  );

  if (!response.ok) {
    throw new Error("Erro ao se comunicar com a Shopify Storefront API");
  }

  const data = await response.json();
  return data;
}

import { GraphQLClient } from "graphql-request";

export const shopifyClient = new GraphQLClient(
  `https://${env.SHOPIFY_STORE_URL}/api/2024-01/graphql.json`,
  {
    headers: {
      "X-Shopify-Storefront-Access-Token": env.SHOPIFY_ACCESS_TOKEN,
    },
  },
);
