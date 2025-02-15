import { searchAddress } from "@/app/actions/address";

export const resolvers = {
  Query: {
    searchAddress: async (
      _: any,
      { suburb, state }: { suburb: string; state: string }
    ) => {
      const response = await searchAddress(suburb, state);
      return response?.localities?.locality || [];
    },
  },
};
