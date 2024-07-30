"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SubmitButton from "../SubmitButton";
import { baseApi } from "@/lib/baseApi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { ApiError } from "@/lib/api-error";
import { ToastAction } from "../ui/toast";
import { ApiResponse } from "@/types/api";
import { IApiUser } from "@/types/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { logIn } from "@/lib/actions/auth.actions";
import Link from "next/link";
import {
  beautyAndPersonalCareTypes,
  categories,
  electronicsTypes,
  fashionAndApparelTypes,
  healthAndWellnessTypes,
  homeAndKitchenTypes,
} from "@/lib/constants/products_types";

const formSchema = z.object({
  category: z.string({
    required_error: "Category is required",
  }),
  subCategory: z.string({
    required_error: "Sub category is required",
  }),
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(80, "Title must be at max 80 characters"),
});

export function AddProductForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const toLogIn = () => router.push("/auth/log-in");

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      subCategory: "",
      title: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
    } catch (error) {
      let err: any = ApiError.generate(error);

      if (err.status === 404) {
        err.action = (
          <ToastAction altText="Log in" onClick={toLogIn}>
            Log in
          </ToastAction>
        );
      }

      toast(err);
      setIsLoading(false);
    }
  }

  console.log();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 relative z-20 bg-background p-5 rounded-md w-full"
      >
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={(val) => field.onChange(val)}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category " />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <CategorySubType category={form.watch("category")} form={form} />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <SubmitButton
          isLoading={isLoading}
          text="Add product"
          className="w-fit"
        />
      </form>
    </Form>
  );
}

const CategorySubType = ({
  category,
  form,
}: {
  category: string;
  form: any;
}) => {
  let subTypes: string[] = [];

  switch (category) {
    case "Electronics":
      subTypes = electronicsTypes;
      break;
    case "Beauty and Personal Care":
      subTypes = beautyAndPersonalCareTypes;
      break;
    case "Fashion and Apparel":
      subTypes = fashionAndApparelTypes;
      break;
    case "Home and Kitchen":
      subTypes = homeAndKitchenTypes;
      break;
    case "Health and Wellness":
      subTypes = healthAndWellnessTypes;
      break;
  }

  return (
    <FormField
      control={form.control}
      name="subCategory"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Sub Category</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={subTypes.length === 0}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a sub-category " />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {subTypes.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
