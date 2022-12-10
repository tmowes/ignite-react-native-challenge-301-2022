export function priceFormatted(price: number | string) {
  if (typeof price === 'string') {
    return price
  }

  return (price / 100)?.toFixed(2)?.replace('.', ',') ?? '0,00'
}
