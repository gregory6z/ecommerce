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
        link="/collections/promo"
        title="PROMOTIONS"
        products={promo}
        isTag
      />
      <CategoriesCarousel categories={categories} />
      {/* <PromotionBanner /> */}
      {/* <ProductsCarousel title="NOUVEAUTÉS" /> */}
      <HeroBanner />

      {/* <SkinProfileBanner /> */}
      <ProductsCarousel
        link="/collections/best-sellers"
        title="BEST SELLERS"
        products={bestSellers}
        isTag
      />
    </main>
  );
}
