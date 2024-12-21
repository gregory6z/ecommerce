import CategoriesCarousel from "./components/carousels/categories-carousel";
import HeroBanner from "./components/hero-banner";
import ProductsCarousel from "./components/products-carousel";

export default function Home() {
  return (
    <main>
      <HeroBanner />
      <ProductsCarousel title="PROMOTIONS" />
      <CategoriesCarousel />
      {/* <PromotionBanner /> */}
      {/* <ProductsCarousel title="NOUVEAUTÉS" /> */}
      <HeroBanner />

      {/* <SkinProfileBanner /> */}
      <ProductsCarousel title="BEST SELLERS" />
    </main>
  );
}
