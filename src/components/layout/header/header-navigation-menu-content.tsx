import { ProductCard } from "@/components/product/product-card"
import { getAllProducts } from "@/http/get-all-products"
import Link from "next/link"

export async function HeaderNavigationMenuContent() {
  const products = await getAllProducts()

  const featuredProducts = products.slice(0, 4)

  const skinCareSubcategories = [
    { id: "cleansers", name: "Nettoyants", slug: "nettoyants" },
    { id: "moisturizers", name: "Hydratants", slug: "hydratants" },
    { id: "serums", name: "Sérums", slug: "serums" },
    { id: "masks", name: "Masques", slug: "masques" },
    { id: "eye-care", name: "Soins des yeux", slug: "soins-des-yeux" },
    { id: "sunscreen", name: "Protection solaire", slug: "protection-solaire" },
  ]

  return (
    <div className="mt-6 flex h-full w-full items-center px-14">
      <div className="w-[340px] space-y-2">
        <div className="space-y-3">
          {skinCareSubcategories.map((subcategory) => (
            <Link
              key={subcategory.id}
              href={`/collections/soins-du-visage/${subcategory.slug}`}
              className="block cursor-pointer rounded-md px-1 py-2 transition-colors hover:bg-gray-50"
            >
              <p className="font-medium text-lg hover:text-primary">
                {subcategory.name}
              </p>
            </Link>
          ))}
        </div>{" "}
      </div>
      <div className="grid grid-cols-4 gap-4 pl-8">
        {featuredProducts.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
