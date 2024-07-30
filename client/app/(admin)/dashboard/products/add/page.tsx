import { AddProductForm } from "@/components/forms/AddProductForm";
import { Metadata } from "next";

export const metadata = (): Metadata => {
  return {
    title: "Add Product",
    description:
      "Add a new product to your store. You can add multiple products at once.",
  };
};

export default function AddProduct() {
  return <AddProductForm />;
}
