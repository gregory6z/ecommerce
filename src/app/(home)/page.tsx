import HeroBanner from "./components/hero-banner";
import ProductsCarousel from "./components/products-carousel";
import PromotionBanner from "./components/promotion-banner";
import SkinProfileBanner from "./components/skin-profile-banner";

export default function Home() {
  return (
    <main>
      <HeroBanner />
      <ProductsCarousel title="PROMOTIONS" />
      <PromotionBanner />
      <ProductsCarousel title="NOUVEAUTÉS" />
      <SkinProfileBanner />
      <ProductsCarousel title="BEST SELLERS" />
    </main>
  );
}
