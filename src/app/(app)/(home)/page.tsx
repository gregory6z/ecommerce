import { api } from "@/data/api"
import { getCollections } from "@/http/collections"
import { getAllProducts } from "@/http/get-all-products"
import type { Product } from "@/http/products"
import CategoriesCarousel from "./components/carousels/categories-carousel"
import HeroBanner from "./components/hero-banner"
import ProductsCarousel from "./components/products-carousel"

export default async function Home() {
  const categories = await getCollections()

  const products = await getAllProducts()

  // const indexResponse = await api("/admin/index", {
  //   method: "POST",
  //   cache: "no-store",
  // })

  // const indexResult = await indexResponse.json()
  // console.log("Indexing Result:", indexResult)

  const bestSellers = products.filter((product: Product) =>
    product.tags?.includes("best-sellers"),
  )

  const promo = products.filter((product: Product) =>
    product.tags?.includes("promo"),
  )

  return (
    <main>
      <HeroBanner />
      <ProductsCarousel
        link="/collections/best-sellers"
        title="BEST SELLERS"
        products={bestSellers}
      />
      <CategoriesCarousel categories={categories} />

      <ProductsCarousel
        link="/collections/promo"
        title="Nouveautés"
        products={promo}
      />
      {/* <PromotionBanner /> */}
      {/* <ProductsCarousel title="NOUVEAUTÉS" /> */}
      {/* <HeroBanner /> */}

      {/* <SkinProfileBanner /> */}
    </main>
  )
}
