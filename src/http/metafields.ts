import { api } from "@/data/api";

export interface Metafield {
  namespace: string;
  key: string;
  value: string;
}

export async function getMetafields(handle: string) {
  if (!handle) {
    return null;
  }

  try {
    const response = await api(`/products/metafields?handle=${handle}`);

    if (!response.ok) {
      throw new Error("Failed to fetch metafields");
    }

    const { metafields } = await response.json();

    if (!metafields || metafields.every((item: any) => item === null)) {
      return null;
    }

    return metafields as Metafield[];
  } catch (error) {
    console.error("Error fetching metafields:", error);
    return [];
  }
}
