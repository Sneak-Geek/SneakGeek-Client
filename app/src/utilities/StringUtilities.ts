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

export function isValidEmail(email: string) {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email.toLowerCase());
}
