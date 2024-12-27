import { ProductCard } from "@/components/product/product-card";
import DrawerButton from "./componenets/drawer-button";
import { getProducts, type Product } from "@/http/products";
import BannerCategory from "./componenets/banner-category";
import HeaderCategory from "./componenets/header-category";
import SearchSidebar from "./componenets/search-sidebar";

export default async function Categories({
  params,
}: {
  params: Promise<{ categories: string }>;
}) {
  const { categories } = await params;

  let products: Product[] = [];

  if (categories === "promo" || categories === "best-sellers") {
    products = await getProducts({
      tags: categories,
    });
  } else {
    products = await getProducts({
      collection: categories,
    });
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
        <DrawerButton />
        <section className="flex">
          <SearchSidebar />
          <div className=" mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product: Product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                price={product.price.amount}
                compareAtPrice={product.compareAtPrice?.amount}
                description={product.description}
                imageUrl={product.images[0].url}
                imageAlt={product.images[0].altText}
                tags={product.tags}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
