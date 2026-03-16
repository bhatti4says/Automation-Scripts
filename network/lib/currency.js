
export const SUPPORTED_CURRENCIES = ['USD','GBP','EUR','AED']
export const BASE_CURRENCY = 'USD'
// Rates represent 1 USD -> X currency units
export const EXCHANGE_RATES = {
  USD: 1,
  GBP: 0.79,
  EUR: 0.92,
  AED: 3.67,
}

export function convertFromUSD(amountUSD, currency) {
  const rate = EXCHANGE_RATES[currency] || 1
  return amountUSD * rate
}

export function formatPrice(amount, currency) {
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(amount)
  } catch (e) {
    return amount.toFixed(2) + ' ' + currency
  }
}
