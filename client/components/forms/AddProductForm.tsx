"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { ApiError } from "@/lib/api-error";
import { ToastAction } from "../ui/toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  beautyAndPersonalCareTypes,
  categories,
  electronicsTypes,
  fashionAndApparelTypes,
  healthAndWellnessTypes,
  homeAndKitchenTypes,
} from "@/lib/constants/products_types";
import AddImageUploadDialog from "../AddImageUploadDialog";

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
  price: z.string().min(1, "Price must be at least 1$"),
  quantity: z.string().min(1, "Quantity must be at least 1"),
});

export function AddProductForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const toLogIn = () => router.push("/auth/log-in");
  const [images, setImages] = useState<File[]>([]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      subCategory: "",
      title: "",
      price: "",
      quantity: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (images.length < 4) {
      return toast({
        description: "You need to upload at least 4 images",
      });
    }

    try {
      // setIsLoading(true);
      const formData = new FormData();

      formData.append("category", values.category);
      formData.append("subCategory", values.subCategory);
      formData.append("title", values.title);
      formData.append("price", values.price.toString());
      formData.append("quantity", values.quantity.toString());

      console.log(formData.get("images"));
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

        <div className="grid-2">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="At least 1$" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input placeholder="At least 5" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <AddImageUploadDialog setImages={setImages} images={images} />

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
