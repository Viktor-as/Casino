export function formatBalance(balance: number, currency: string): string {
  return new Intl.NumberFormat("lt-LT", {
    style: "currency",
    currency,
  }).format(balance);
}
