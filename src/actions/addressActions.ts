"use server";

import { API_SEARCH_URL, API_TOKEN } from "@/lib/constants";

export async function searchAddressAPI(suburb: string, state: string = "") {
  const API_URL = `${API_SEARCH_URL}?q=${suburb}&state=${state ? state : ""}`;

  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    cache: "no-store", // Ensure fresh data
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  return response.json();
}
