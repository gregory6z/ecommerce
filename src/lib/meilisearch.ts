import { env } from "@/env"
import { MeiliSearch } from "meilisearch"

export const meilisearch = new MeiliSearch({
  host: env.NEXT_PUBLIC_MEILISEARCH_HOST,
  apiKey: env.NEXT_PUBLIC_MEILISEARCH_API_KEY,
})

export async function configureMeilisearchIndex() {
  await meilisearch.index("products").updateSettings({
    rankingRules: ["words", "typo", "proximity", "attribute", "exactness"],
    distinctAttribute: "title",
    searchableAttributes: ["title", "description", "category", "tags"],
  })
}
