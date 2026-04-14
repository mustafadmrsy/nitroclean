export const SHIPPING_FEE = 49.9;
export const FREE_SHIPPING_THRESHOLD = 500;

export function calculateShipping(subtotal: number): number {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
}
