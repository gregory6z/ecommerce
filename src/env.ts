import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    APP_URL: z.string().url(),
    SHOPIFY_API_KEY: z.string(),
    SHOPIFY_API_SECRET: z.string(),
    SHOPIFY_STORE_URL: z.string(),
    SHOPIFY_ACCESS_TOKEN: z.string(),
  },

  client: {
    NEXT_PUBLIC_API_BASE_URL: z.string().url(),
    NEXT_PUBLIC_MEILISEARCH_HOST: z.string(),
    NEXT_PUBLIC_MEILISEARCH_API_KEY: z.string(),
  },

  runtimeEnv: {
    APP_URL: process.env.APP_URL,
    SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
    SHOPIFY_API_SECRET: process.env.SHOPIFY_API_SECRET,
    SHOPIFY_STORE_URL: process.env.SHOPIFY_STORE_URL,
    SHOPIFY_ACCESS_TOKEN: process.env.SHOPIFY_ACCESS_TOKEN,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_MEILISEARCH_HOST: process.env.NEXT_PUBLIC_MEILISEARCH_HOST,
    NEXT_PUBLIC_MEILISEARCH_API_KEY:
      process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY,
  },
})
