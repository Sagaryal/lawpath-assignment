import { z } from "zod";

export const AddressSchema = z.object({
  suburb: z.string().min(2, "Suburb must be at least 2 characters"),
  state: z.string().min(2, "Use state abbreviations (e.g., VIC, NSW)").max(3).or(z.literal("")),
  postcode: z.string().regex(/^\d{4}$/, "Postcode must be exactly 4 digits"),
});

export type AddressType = z.infer<typeof AddressSchema>;

export type Locality = {
  id: Number;
  category: String;
  latitude: Number;
  longitude: Number;
  location: String;
  postcode: Number;
  state: String;
};

export type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};
