export function formatPrice(value?: number) {
  if (value == null || Number.isNaN(value)) return "Price on request";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatArea(value?: number) {
  if (value == null || Number.isNaN(value)) return "—";
  return `${value.toLocaleString("en-IN")} sq.ft`;
}