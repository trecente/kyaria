import { type ClassValue, clsx } from "clsx";
import { formatDistanceToNowStrict } from "date-fns";
import { twMerge } from "tailwind-merge";

import { getImages } from "./fetchers";
import { FilterType, filterSchema } from "./schemas";

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

export function validateFilterParams(
  filterParams: FilterType,
): FilterType | null {
  if (!filterParams) return null;

  const clonedFilterParams = JSON.parse(JSON.stringify(filterParams));

  try {
    const validatedFilterParams = filterSchema.safeParse(filterParams);

    if (!validatedFilterParams.success) {
      validatedFilterParams.error.errors.forEach((error) => {
        clonedFilterParams[error.path[0]] = null;
      });

      return clonedFilterParams;
    }

    return validatedFilterParams.data;
  } catch (error) {
    console.error(`Unexpected error during validation: ${error}`);
    return null;
  }
}

export function toSlug(title: string, company: string): string {
  const sanitize = (str: string): string =>
    str
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  const titleSlug = sanitize(title);
  const companySlug = sanitize(company);

  return `${titleSlug}-at-${companySlug}`;
}

export async function verifyImageUrl(
  imageUrl: string,
): Promise<string | undefined> {
  try {
    const images = await getImages();

    const isValidImageUrl = images.some((url) => url === imageUrl);

    return isValidImageUrl ? imageUrl : undefined;
  } catch (error) {
    console.error(`Failed to verify image URL: ${error}`);
    return undefined;
  }
}
