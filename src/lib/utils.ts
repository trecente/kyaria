import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { formatDistanceToNowStrict } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  value: number,
  currency: string = "USD",
  locale: string = "en-US",
): string {
  const options: Intl.NumberFormatOptions = {
    currency,
    style: "currency",
    minimumFractionDigits: 2,
  };
  return new Intl.NumberFormat(locale, options).format(value);
}

export function formatDateToRelativeString(date: Date): string {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
  });
}
