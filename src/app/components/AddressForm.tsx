"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyAddress } from "@/app/actions/address";
import { AddressSchema, AddressType } from "@/app/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";

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

  async function onSubmit(formData: AddressType) {
    setLoading(true);
    setResponseMessage(null);
    // setData(null);

    const result = await verifyAddress(
      formData.suburb,
      formData.state.toUpperCase(),
      formData.postcode
    );
    if (result.error) {
      setResponseMessage({ type: "error", message: result.error });
      setData(result.data);
    } else if (result.success) {
      setResponseMessage({ type: "success", message: result.success });
      setData(result.data);
    }

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
