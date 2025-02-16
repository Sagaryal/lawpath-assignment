export const SEARCH_ADDRESS_QUERY = `
  query SearchAddress($suburb: String!, $state: String) {
    searchAddress(suburb: $suburb, state: $state) {
      id
      category
      latitude
      longitude
      location
      postcode
      state
    }
  }
`;
