import { api } from "@/data/api";

export interface Collection {
  id: string;
  title: string;
  description: string;
  handle: string;
  image: {
    url: string;
    altText: string;
  } | null;
}

export async function getCollections(): Promise<Collection[]> {
  try {
    const response = await api("/collections", {
      cache: "force-cache",
      next: {
        tags: ["collections"],
        revalidate: 86400, // 24 hours cache
      },
    });

    const data = await response.json();

    if (!data?.collections?.edges) {
      return [];
    }

    return data.collections.edges.map((edge: any) => ({
      ...edge.node,
      image: edge.node.image || { url: "", altText: "" },
    }));
  } catch (error) {
    console.error("Error fetching collections:", error);
    return [];
  }
}
