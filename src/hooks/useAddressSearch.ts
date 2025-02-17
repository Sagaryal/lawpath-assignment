import { useMutation } from "@tanstack/react-query";
import { SEARCH_ADDRESS_QUERY } from "@/graphql/queries";
import { Locality } from "@/lib/types";
import graphqlClient from "@/graphql/graphqlClient";

/**
 * Fetches address data based on suburb and state.
 *
 * @param suburb - The name of the suburb.
 * @param state - The state, converted to uppercase.
 * @returns A promise resolving to an array of localities.
 */
const fetchAddress = async (suburb: string, state: string): Promise<Locality[]> => {
  return graphqlClient<{ searchAddress: Locality[] }>(SEARCH_ADDRESS_QUERY, {
    suburb,
    state: state.toUpperCase(),
  }).then((data) => data.searchAddress || []);
};

const useAddressSearch = () => {
  const { mutateAsync: searchAddresses, isPending: isLoading } = useMutation({
    mutationFn: ({ suburb, state }: { suburb: string; state: string }) => fetchAddress(suburb, state),
  });

  return { searchAddresses, isLoading };
};

export default useAddressSearch;
