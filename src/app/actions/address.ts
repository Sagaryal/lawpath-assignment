"use server";

import { API_SEARCH_URL, API_TOKEN } from "@/app/lib/constants";

export async function fetchAddress(suburb: string, state: string) {
  const API_URL = `${API_SEARCH_URL}?q=${suburb}&state=${state}`;

  try {
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

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function verifyAddress(
  suburb: string,
  state: string,
  postcode: string
) {
  try {
    const response = await fetchAddress(suburb, state);
    const data = response?.localities?.locality;

    // Check if the API returned results
    if (!data || data.length === 0) {
      return {
        error: `The suburb ${suburb} does not exist in the state ${state}.`,
        data,
      };
    }

    // Find the correct suburb details from API response
    const matchedEntry = data?.find(
      (entry: any) => entry.postcode === Number(postcode)
    );

    if (!matchedEntry) {
      return {
        error: `The postcode ${postcode} does not match the suburb ${suburb}.`,
        data,
      };
    }

    // ✅ All values match correctly
    return {
      success: "The postcode, suburb, and state input are valid.",
      data,
    };
  } catch (error) {
    return { error: (error as Error).message };
  }
}
