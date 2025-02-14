import { z } from "zod";

export const AddressSchema = z.object({
  suburb: z.string().min(2, "Suburb must be at least 2 characters"),
  state: z.string().min(2, "Use state abbreviations (e.g., VIC, NSW)").max(3),
  postcode: z.string().regex(/^\d{4}$/, "Postcode must be exactly 4 digits"),
});

export type AddressType = z.infer<typeof AddressSchema>;
