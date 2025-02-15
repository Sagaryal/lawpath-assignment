"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddressSchema, AddressType } from "@/app/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useQuery } from "@tanstack/react-query";

const SEARCH_ADDRESS_QUERY = `
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

export default function AddressForm() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [responseMessage, setResponseMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const form = useForm<AddressType>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      suburb: "",
      state: "",
      postcode: "",
    },
  });

  const { refetch } = useQuery({
    queryKey: ["verifyAddress"],
    queryFn: async () => {
      const formData = form.getValues();
      const suburb = formData.suburb;
      const state = formData.state.toUpperCase();
      const postcode = formData.postcode;

      console.log("sajndksahdjksahdnksajd");

      // const data = await request("/api/graphql", SEARCH_ADDRESS_QUERY, {
      //   suburb,
      //   state,
      // });

      const response = await fetch("/api/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: SEARCH_ADDRESS_QUERY,
          variables: {
            suburb,
            state,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      const data = result.data;

      console.log({ data });
      return data;
    },
    enabled: false, // Disable automatic fetching on mount
  });

  async function onSubmit(formData: AddressType) {
    setLoading(true);
    setResponseMessage(null);
    setData(null);

    try {
      const { data: info } = await refetch();

      const localities = (info as any).searchAddress;

      if (!localities || localities.length === 0) {
        setResponseMessage({
          type: "error",
          message: `The suburb ${
            formData.suburb
          } does not exist in the state ${formData.state.toUpperCase()}.`,
        });
        setData(null);
        return;
      }

      const matchedEntry = localities.find(
        (entry: any) => entry.postcode === Number(formData.postcode)
      );

      if (!matchedEntry) {
        setResponseMessage({
          type: "error",
          message: `The postcode ${formData.postcode} does not match the suburb ${formData.suburb}.`,
        });
        setData(localities);
        return;
      }

      setResponseMessage({
        type: "success",
        message: "The postcode, suburb, and state input are valid.",
      });
      setData(localities);
    } catch (error) {
      setResponseMessage({
        type: "error",
        message: (error as Error).message,
      });
    } finally {
      setLoading(false);
    }

    // try {
    //   const result = await refetch(); // Trigger the query manually
    //   if (result.data.error) {
    //     setResponseMessage({ type: "error", message: result.data.error });
    //   } else if (result.data.success) {
    //     setResponseMessage({ type: "success", message: result.data.success });
    //   }
    // } catch (error) {
    //   setResponseMessage({ type: "error", message: (error as Error).message });
    // }

    // const result = await verifyAddress(
    //   formData.suburb,
    //   formData.state.toUpperCase(),
    //   formData.postcode
    // );
    // if (result.error) {
    //   setResponseMessage({ type: "error", message: result.error });
    //   setData(result.data);
    // } else if (result.success) {
    //   setResponseMessage({ type: "success", message: result.success });
    //   setData(result.data);
    // }

    await refetch();

    setLoading(false);
  }

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Validate Australian Postcode</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="suburb"
              render={({ field }) => (
                <FormItem>
                  <Label>Suburb</Label>
                  <Input {...field} placeholder="Enter suburb" />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <Label>State (Optional)</Label>
                  <Input
                    {...field}
                    placeholder="Enter state"
                    onChange={(e) =>
                      field.onChange(e.target.value.toUpperCase())
                    }
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="postcode"
              render={({ field }) => (
                <FormItem>
                  <Label>Postcode</Label>
                  <Input {...field} placeholder="Enter postcode" />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Validating..." : "Submit"}
            </Button>
          </form>
        </Form>

        {/* Response Messages */}
        {responseMessage && (
          <div
            className={`mt-4 p-3 text-sm rounded ${
              responseMessage.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {responseMessage.message}
          </div>
        )}

        {data && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
