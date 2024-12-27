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
      cache: "no-store",
      next: {
        tags: ["collections"],
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
