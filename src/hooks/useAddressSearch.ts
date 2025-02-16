import { useMutation } from "@tanstack/react-query";
import { SEARCH_ADDRESS_QUERY } from "@/graphql/queries";
import { Locality } from "@/lib/types";

const useAddressSearch = () => {
  const fetchAddress = async (suburb: string, state: string): Promise<Locality[]> => {
    const response = await fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: SEARCH_ADDRESS_QUERY,
        variables: {
          suburb,
          state: state.toUpperCase(),
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();

    if (result?.errors?.length > 0) {
      throw result.errors[0];
    }
    return result.data?.searchAddress || [];
  };

  const { mutateAsync: searchAddresses, isPending: isLoading } = useMutation({
    mutationFn: ({ suburb, state }: { suburb: string; state: string }) => fetchAddress(suburb, state),
  });

  return { searchAddresses, isLoading };
};

export default useAddressSearch;
