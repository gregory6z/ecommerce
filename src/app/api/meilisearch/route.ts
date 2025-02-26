// import { configureMeilisearchIndex } from "@/lib/meilisearch"

export async function GET() {
  // await configureMeilisearchIndex()
  return Response.json({ success: true })
}
