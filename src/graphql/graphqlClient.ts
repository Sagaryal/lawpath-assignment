import { GRAPHQL_NEXT_API_ROUTE } from "@/lib/constants";
import { GraphQLResponse } from "@/lib/types";

const graphqlClient = async <T>(query: string, variables?: Record<string, any>): Promise<T> => {
  const response = await fetch(GRAPHQL_NEXT_API_ROUTE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const result: GraphQLResponse<T> = await response.json();

  if (result.errors?.length) {
    throw new Error(result.errors[0].message);
  }

  return result.data as T;
};

export default graphqlClient;
