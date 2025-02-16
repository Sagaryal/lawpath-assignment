import { useMutation } from "@tanstack/react-query";
import { SEARCH_ADDRESS_QUERY } from "@/graphql/queries";
import { Locality } from "@/lib/types";
import graphqlClient from "@/graphql/graphqlClient";

const useAddressSearch = () => {
  const fetchAddress = async (suburb: string, state: string): Promise<Locality[]> => {
    return graphqlClient<{ searchAddress: Locality[] }>(SEARCH_ADDRESS_QUERY, {
      suburb,
      state: state.toUpperCase(),
    }).then((data) => data.searchAddress || []);
  };

  const { mutateAsync: searchAddresses, isPending: isLoading } = useMutation({
    mutationFn: ({ suburb, state }: { suburb: string; state: string }) => fetchAddress(suburb, state),
  });

  return { searchAddresses, isLoading };
};

export default useAddressSearch;
