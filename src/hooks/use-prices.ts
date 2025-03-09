import { api } from "@/data/api"
import { useQuery } from "@tanstack/react-query"

export function usePrices() {
  return useQuery({
    queryKey: ["prices"],
    queryFn: async () => {
      const response = await api("/products/prices")
      return response.json()
    },
  })
}
