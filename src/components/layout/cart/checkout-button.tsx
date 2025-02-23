"use client"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

export function CheckoutButton() {
  const { cart } = useCart()
  const [isLoading, setIsLoading] = useState(false)

  const createCheckout = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/checkout", {
        method: "POST",
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Erro ao criar checkout")
      }

      const data = await response.json()
      return data.checkoutUrl
    },
    onSuccess: (checkoutUrl) => {
      window.location.href = checkoutUrl
    },
    onError: (error) => {
      console.error("Erro ao criar checkout:", error)
      alert("Ocorreu um erro ao processar o checkout. Tente novamente.")
    },
    onSettled: () => {
      setIsLoading(false)
    },
  })

  const handleCheckout = async () => {
    if (!cart.items.length) {
      alert("Adicione itens ao carrinho primeiro")
      return
    }

    setIsLoading(true)
    createCheckout.mutate()
  }

  return (
    <Button
      variant={"third"}
      size={"xl"}
      disabled={isLoading || cart.items.length === 0}
      onClick={handleCheckout}
      className="w-full text-bold text-lg text-white disabled:cursor-not-allowed"
    >
      {isLoading ? "Processando..." : "Finalizar Compra"}
    </Button>
  )
}
