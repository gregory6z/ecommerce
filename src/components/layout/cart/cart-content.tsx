import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { formatEUR } from "@/lib/utils";
import { Heart, Trash } from "lucide-react";
import Image from "next/image";
import { QuantityComboBox } from "./quantity-combo-box";

export function CartContent() {
  const { cart, removeFromCart } = useCart();

  console.log(cart);

  const handleRemoveFromCart = (lineId: string) => {
    removeFromCart.mutate(lineId);
  };

  return (
    <main className="mt-2 overflow-y-auto px-4 ">
      <section className="mb-4 flex flex-col">
        {cart?.items.map((product, index) => {
          return (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
              // biome-ignore lint/nursery/useSortedClasses: <explanation>
              className="flex gap-2 border-zinc-200 last:border-b-transparent border-b pt-4 pb-8"
            >
              <div className="h-[125px] w-[100px] bg-zinc-200">
                <Image
                  src={product.image.url}
                  className="h-full w-full object-cover"
                  alt={product.image.altText}
                  width={100}
                  height={125}
                  priority
                />
              </div>

              <div className="mt-2 flex-1">
                <h2>{product.title}</h2>
                <p className="text-zinc-500">{product.description}</p>
                <div className="flex gap-2">
                  <h3 className="font-bold">
                    {formatEUR(product.price.amount)}
                  </h3>
                  {product.compareAtPrice?.amount &&
                    Number(product.price.amount) > 0 && (
                      <h3 className="text-red-600 line-through">
                        {formatEUR(product.compareAtPrice.amount)}
                      </h3>
                    )}
                </div>
                <div className="itens-center mt-2 flex gap-2">
                  <Button
                    className={"bg-zinc-100"}
                    variant={"rounded"}
                    size={"iconMd"}
                  >
                    <Heart />
                  </Button>
                  <Button
                    onClick={() => handleRemoveFromCart(product.lineId)}
                    variant={"rounded"}
                    size={"iconMd"}
                    className={"bg-zinc-100"}
                  >
                    <Trash />
                  </Button>

                  {/* <Button className="" variant={"ghost"}>
                    Qte: {product.quantity} <ChevronDown width={12} />
                  </Button> */}
                  <QuantityComboBox
                    lineId={product.lineId}
                    quantity={product.quantity}
                  />
                </div>
              </div>
            </div>
          );
        })}

        <div className="mt-4 flex flex-col gap-2 border-zinc-200 border-b pb-4 ">
          <div className="flex justify-between">
            <p>Total</p>
            <p>{cart?.total.amount ? formatEUR(cart.total.amount) : ""}</p>
          </div>
          <div className="flex justify-between">
            <p>Expedition standard</p>
            <p>Gratuit</p>
          </div>
          <div className="flex justify-between font-bold">
            <p>Total</p>
            <p>{cart?.total.amount ? formatEUR(cart.total.amount) : ""}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
