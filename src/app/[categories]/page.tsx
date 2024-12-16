import { ProductCard } from "@/components/product/product-card";
import DrawerButton from "./componenets/drawer-button";

export default function Categories() {
  return (
    <section className="mt-8 px-4">
      <header>
        <DrawerButton />
      </header>
      <main className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(
          (item) => (
            <ProductCard key={item} />
          ),
        )}
      </main>
    </section>
  );
}
