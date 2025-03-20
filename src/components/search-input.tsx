"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const formSchema = z.object({
  owner: z.string().min(1, {
    message: "Fill in the repository owner",
  }),
  repo: z.string().min(1, {
    message: "Fill in the repository name",
  }),
});

export default function SearchInput() {
  const router = useRouter();
  const params = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      owner: params.get("owner") ?? "",
      repo: params.get("repo") ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    router.push("/?" + new URLSearchParams(values).toString());
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="owner"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repository owner</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. vercel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="repo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repository name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. next.js" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">View issues</Button>
      </form>
    </Form>
  );
}
