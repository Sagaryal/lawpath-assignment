"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddressSchema, AddressType } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import useAddressSearch from "@/hooks/useAddressSearch";

export default function AddressForm() {
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

  const { searchAddresses, isLoading } = useAddressSearch();

  async function onSubmit(formData: AddressType) {
    setResponseMessage(null);

    const suburb = formData.suburb;
    const state = formData.state.toUpperCase();
    const postcode = formData.postcode;

    try {
      const data = await searchAddresses({ suburb, state });

      // If no data is returned it means no record.
      if (!data || data.length === 0) {
        setResponseMessage({
          type: "error",
          message: `The suburb ${suburb} does not exist in the state ${state}.`,
        });
        return;
      }

      const matchedEntry = data.find((each) => each.postcode === Number(postcode));

      if (!matchedEntry) {
        setResponseMessage({
          type: "error",
          message: `The postcode ${postcode} does not match the suburb ${suburb}.`,
        });
        return;
      }

      // Finally if there is matchedEntry then inputs are valid.
      setResponseMessage({
        type: "success",
        message: "The postcode, suburb, and state input are valid.",
      });
    } catch (error) {
      setResponseMessage({
        type: "error",
        message: (error as Error).message,
      });
    }
  }

  return (
    <Card className="max-w-md w-full mx-auto mt-8">
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
                    onChange={(e) => field.onChange(e.target.value.toUpperCase())}
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
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Validating..." : "Submit"}
            </Button>
          </form>
        </Form>

        {/* Response Messages */}
        {responseMessage && (
          <div
            className={`mt-4 p-3 text-sm rounded max-w-full ${
              responseMessage.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
            }`}
          >
            {responseMessage.message}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
