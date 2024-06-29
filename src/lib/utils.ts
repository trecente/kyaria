import { Prisma } from "@prisma/client";
import { put } from "@vercel/blob";
import { type ClassValue, clsx } from "clsx";
import { formatDistanceToNowStrict } from "date-fns";
import { twMerge } from "tailwind-merge";

import { UnknownError, UploadError } from "@/lib/exceptions";

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
    return undefined;
  }
}

export function createJobFilter(
  searchParams: FilterType,
): Prisma.JobWhereInput {
  const { q, location, work: locationType, employment: type } = searchParams;

  const searchQuery = q?.trim().split(/\s+/).filter(Boolean).join(" & ");

  const searchFilters: Prisma.JobWhereInput = searchQuery
    ? {
        OR: [
          { title: { search: searchQuery } },
          { companyName: { search: searchQuery } },
          { location: { search: searchQuery } },
        ],
      }
    : {};

  const filter: Prisma.JobWhereInput = {
    AND: [
      searchFilters,
      location && { location: { equals: location } },
      locationType && { locationType: { equals: locationType } },
      type && { type: { equals: type } },
      { approved: true },
    ].filter(Boolean) as Prisma.JobWhereInput["AND"],
  };

  return filter;
}

export async function uploadCompanyLogo(logoPath: string, companyLogo: File) {
  try {
    const { url } = await put(logoPath, companyLogo, {
      access: "public",
      addRandomSuffix: false,
    });

    return url;
  } catch (error) {
    if (error instanceof Error) {
      throw new UploadError();
    }

    throw new UnknownError();
  }
}
