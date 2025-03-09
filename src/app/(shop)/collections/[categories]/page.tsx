import { ProductCard } from "@/components/product/product-card"
import { getAllProducts } from "@/http/get-all-products"
import type { Product } from "@/http/products"
import BannerCategory from "./components/banner-category"
import HeaderCategory from "./components/header-category"
import { ProductsContainer } from "./components/products-container"
import SearchDrawer from "./components/search-drawer"
import SearchSidebar from "./components/search-sidebar"

export default async function Categories({
  params,
}: {
  params: Promise<{ categories: string }>
}) {
  const { categories } = await params
  const allProducts = await getAllProducts()

  let products: Product[] = []

  if (categories === "promo" || categories === "best-sellers") {
    products = allProducts.filter((product: Product) =>
      product.tags?.includes(categories),
    )
  } else {
    products = allProducts.filter(
      (product: Product) => product.collection === categories,
    )
  }
  return (
    <div className="">
      <header>
        <BannerCategory />
        <HeaderCategory
          title={"SKIN CARE"}
          description={
            "Discover our premium skincare collection for a radiant, healthy complexion"
          }
          numberOfProducts={15}
        />
      </header>
      <main className="mt-4 px-4 lg:mt-14 lg:px-16 ">
        <SearchDrawer />
        <section className="flex gap-4">
          <SearchSidebar />
          {/* <div className=" mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div> */}
          <ProductsContainer filterProducts={products} />
        </section>
      </main>
    </div>
  )
}
