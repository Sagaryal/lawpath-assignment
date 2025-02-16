import { searchAddressAPI } from "@/actions/addressActions";

export const resolvers = {
  Query: {
    searchAddress: async (_: any, { suburb, state }: { suburb: string; state: string }) => {
      const response = await searchAddressAPI(suburb, state);
      return response?.localities?.locality || [];
    },
  },
};
