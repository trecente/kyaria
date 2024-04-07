import { z } from "zod";

export const filterSchema = z.object({
  q: z.string().max(100, { message: "Maximum 100 characters" }).optional(),
  location: z.string().optional(),
  work: z.enum(["Any", "Remote", "Hybrid", "On-site"]).optional(),
  employment: z
    .enum([
      "Any",
      "Full-Time",
      "Part-Time",
      "Contract",
      "Temporary",
      "Internship",
    ])
    .optional(),
});

export type FilterType = z.infer<typeof filterSchema>;
