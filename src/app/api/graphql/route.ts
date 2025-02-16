import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { resolvers } from "@/app/api/graphql/resolvers";
import { typeDefs } from "@/app/api/graphql/schema";
import { NextRequest } from "next/server";

// Create Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers });

// req has the type NextRequest
const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export { handler as GET, handler as POST };
