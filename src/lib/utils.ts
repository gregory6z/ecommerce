import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatEUR(value: number | string) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(Number(value));
}

export const checkoutRedirectScript = `
<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Encontra o logo no header do checkout
    const logo = document.querySelector('.main-header__logo');
    if (logo) {
      // Substitui o link do logo
      logo.href = '${process.env.NEXT_PUBLIC_API_BASE_URL}';
    }
    
    // Também modifica o botão "Continuar comprando"
    const continueShoppingButton = document.querySelector('.step-footer__previous-link');
    if (continueShoppingButton) {
      continueShoppingButton.href = '${process.env.NEXT_PUBLIC_API_BASE_URL}';
    }
  });
</script>
`;
