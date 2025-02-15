export const typeDefs = `#graphql
  type Address {
    suburb: String
    state: String
  }

  type Locality {
    id: Int
    category: String
    latitude: Float
    longitude: Float
    location: String
    postcode: Int
    state: String
  }

  type Query {
    searchAddress(suburb: String!, state: String): [Locality]
  }
`;
