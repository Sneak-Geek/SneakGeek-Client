export function toCurrencyString(amount: string | number, maxDigit?: number) {
  const converted = typeof amount === 'string' ? parseInt(amount, 10) : amount;
  if (converted) {
    return converted.toLocaleString('vi', {
      style: 'currency',
      currency: 'VND',
      ...(maxDigit ? { maximumSignificantDigits: maxDigit } : {})
    });
  }

  return '';
}
