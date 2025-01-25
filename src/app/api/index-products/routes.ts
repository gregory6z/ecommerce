import type { NextApiRequest, NextApiResponse } from "next";
import { algoliaClient } from "@/lib/algolia";
import { getProducts, type Product } from "@/http/products";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // biome-ignore lint/complexity/useLiteralKeys: <explanation>
  const authToken = req.headers["authorization"];
  if (authToken !== `Bearer ${process.env.INDEXING_SECRET_TOKEN}`) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const products = await getProducts();

    const formattedProducts = products.map((product: Product) => ({
      objectID: product.id,
      title: product.title,
      description: product.description,
      price: product.price.amount,
      currency: product.price.currencyCode,
      available: product.availableForSale,
    }));

    await algoliaClient.saveObjects(formattedProducts);
    res.status(200).json({ message: "Produtos indexados com sucesso!" });
  } catch (error) {
    console.error("Erro ao indexar produtos:", error);
    res.status(500).json({ message: "Erro ao indexar produtos" });
  }
}
