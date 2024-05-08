import { z } from "zod";

import {
  EDUCATION_DEGREES_OPTIONS,
  EMPLOYMENT_TYPES_OPTIONS,
  WORK_EXPERIENCE_OPTIONS,
  WORK_LOCATIONS,
} from "./constants";

export const filterSchema = z.object({
  q: z
    .string()
    .max(100, { message: "Search query cannot exceed 100 characters" })
    .optional(),
  location: z.string().optional(),
  work: z.enum(["Any", ...WORK_LOCATIONS] as [string, ...string[]]).optional(),
  employment: z
    .enum(["Any", ...EMPLOYMENT_TYPES_OPTIONS] as [string, ...string[]])
    .optional(),
});

export type FilterType = z.infer<typeof filterSchema>;

const locationSchema = z
  .object({
    location: z
      .string()
      .max(100, { message: "Location cannot exceed 100 characters" })
      .optional(),
    work: z.enum(WORK_LOCATIONS as [string, ...string[]], {
      errorMap: () => ({ message: "Work location is required" }),
    }),
  })
  .refine((data) => data.work === "Remote" || data.location, {
    message: "Location is required for on-site work",
    path: ["location"],
  });

const applicationSchema = z
  .object({
    applicationEmail: z
      .string()
      .email({ message: "Invalid email address" })
      .max(100, { message: "Email address cannot exceed 100 characters" })
      .optional()
      .or(z.literal("")),
    applicationUrl: z
      .string()
      .url({ message: "Invalid URL" })
      .max(100, { message: "Website URL cannot exceed 100 characters" })
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => data.applicationEmail || data.applicationUrl, {
    message: "Please provide an application link or email",
    path: ["applicationEmail"],
  });

export const createJobSchema = z
  .object({
    companyLogo: z
      .instanceof(File)
      .or(z.literal(""))
      .refine((file) => !file || file.size <= 1024 * 1024 * 3, {
        message: "File size must be less than 3MB",
      })
      .refine(
        (file) => !file || /^image\/(jpeg|jpg|png|webp)$/i.test(file.type),
        {
          message: "Only JPEG, JPG, PNG, and WEBP formats are allowed.",
        },
      ),
    companyName: z
      .string({
        required_error: "Company name is required",
      })
      .min(3, "Company name must be at least 3 characters long")
      .max(100, "Company name cannot exceed 100 characters"),
    title: z
      .string({
        required_error: "Title is required",
      })
      .min(3, { message: "Title must be at least 3 characters long" })
      .max(100, { message: "Title cannot exceed 100 characters" }),
    description: z
      .string({
        required_error: "Description is required",
      })
      .min(50, { message: "Description must be at least 50 characters long" })
      .max(5000, { message: "Description cannot exceed 5000 characters" }),
    salary: z
      .string({
        required_error: "Salary is required",
      })
      .min(3, { message: "Salary must be at least 3 numeric characters" })
      .regex(/^\$(?:\d{1,3}(?:\,\d{3})*|\d*)(?:\.\d{0,2})?$/, {
        message: "Salary must be a valid currency format",
      })
      .max(9, { message: "Salary cannot exceed 9 numeric characters" }),
    employment: z.enum(EMPLOYMENT_TYPES_OPTIONS as [string, ...string[]], {
      errorMap: () => ({ message: "Employment type is required" }),
    }),
    education: z.enum(EDUCATION_DEGREES_OPTIONS as [string, ...string[]], {
      errorMap: () => ({ message: "Education type is required" }),
    }),
    experience: z.enum(WORK_EXPERIENCE_OPTIONS as [string, ...string[]], {
      errorMap: () => ({ message: "Experience is required" }),
    }),
  })
  .and(locationSchema)
  .and(applicationSchema);

export type CreateJobType = z.infer<typeof createJobSchema>;
