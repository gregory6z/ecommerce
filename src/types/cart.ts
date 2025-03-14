import type { Product } from "@/http/products"

export interface CartItem extends Product {
  cartId: string // ID do carrinho inteiro
  lineId: string // ID único da linha no carrinho
  quantity: number // Quantidade do item
  quantityAvailable: number // Adicionado aqui
  variantId: string // ID da variante selecionada
  id: string
  image: {
    url: string
    altText: string
  }
}

// Resposta completa do carrinho
export interface CartResponse {
  cartId: string
  items: CartItem[]
  total: {
    amount: string
    currencyCode: string
  }
}

// Para usar com react-query
export interface UseCartResponse {
  cart: CartResponse | null
  isLoading: boolean
  isError: boolean
  error: Error | null
}

// Para mutations
export interface AddToCartInput {
  variantId: string
  quantity: number
}

// Para erros específicos do carrinho
export interface CartError {
  code: string
  message: string
}
