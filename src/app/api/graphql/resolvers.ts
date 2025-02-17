import { searchAddressAPI } from "@/actions/addressActions";

export const resolvers = {
  Query: {
    /**
     * Handles the `searchAddress` query by calling an external API
     * to fetch address details based on the provided suburb and state.
     * Returns a list of localities or an empty array if no data is found.
     */
    searchAddress: async (_: any, { suburb, state }: { suburb: string; state: string }) => {
      const response = await searchAddressAPI(suburb, state);
      return response?.localities?.locality || [];
    },
  },
};
