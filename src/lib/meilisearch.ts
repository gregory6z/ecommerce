import { MeiliSearch } from "meilisearch";
import { env } from "@/env";

export const meilisearch = new MeiliSearch({
  host: env.NEXT_PUBLIC_MEILISEARCH_HOST,
  apiKey: env.NEXT_PUBLIC_MEILISEARCH_API_KEY,
});
