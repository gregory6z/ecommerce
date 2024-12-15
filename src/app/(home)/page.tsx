import HeroBanner from "./components/hero-banner";
import ProductsCarousel from "./components/products-carousel";

export default function Home() {
  return (
    <main>
      <HeroBanner />
      <ProductsCarousel title="NOUVEAUTÉS" />
    </main>
  );
}
