//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

export function toCurrencyString(amount: string) {
  const converted = parseInt(amount, 10);
  if (converted) {
    return converted.toLocaleString("vi", { style: "currency", currency: "VND" });
  }

  return "";
}
