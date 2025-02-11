import { getCollections } from "@/http/collections";
import CategoriesCarousel from "./components/carousels/categories-carousel";
import HeroBanner from "./components/hero-banner";
import ProductsCarousel from "./components/products-carousel";
import { getProducts } from "@/http/products";

export default async function Home() {
  const categories = await getCollections();

  const promo = await getProducts({
    tags: "promo",
  });

  const bestSellers = await getProducts({
    tags: "best-sellers",
  });

  return (
    <main>
      <HeroBanner />
      <ProductsCarousel
        link="/collections/best-sellers"
        title="BEST SELLERS"
        products={bestSellers}
        isTag
      />
      <CategoriesCarousel categories={categories} />

      <ProductsCarousel
        link="/collections/promo"
        title="Nouveautés"
        products={promo}
        isTag
      />
      {/* <PromotionBanner /> */}
      {/* <ProductsCarousel title="NOUVEAUTÉS" /> */}
      {/* <HeroBanner /> */}

      {/* <SkinProfileBanner /> */}
    </main>
  );
}
