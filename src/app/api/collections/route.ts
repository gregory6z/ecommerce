import { shopifyClient } from "@/lib/shopify";
import { NextResponse } from "next/server";

interface Image {
  url: string;
  altText: string;
}

interface CollectionNode {
  id: string;
  title: string;
  description: string;
  handle: string;
  image: Image;
}

interface CollectionsData {
  collections: {
    edges: { node: CollectionNode }[];
  };
}

export async function GET() {
  const query = `
    query Collections {
      collections(first: 40) {
        edges {
          node {
            id
            title
            description
            handle
            image {
              url
              altText
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyClient.request<CollectionsData>(query);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching collections:", error);
    return NextResponse.json(
      { error: "Failed to fetch collections" },
      { status: 500 },
    );
  }
}
