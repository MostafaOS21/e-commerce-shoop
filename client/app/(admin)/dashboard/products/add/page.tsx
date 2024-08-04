import { AddProductForm } from "@/components/forms/AddProductForm";
import SectionBanner from "@/components/SectionBanner";
import { Metadata } from "next";

export const metadata = (): Metadata => {
  return {
    title: "Add Product",
    description:
      "Add a new product to your store. You can add multiple products at once.",
  };
};

export default function AddProduct() {
  return (
    <div>
      <SectionBanner
        paragraph="Want to add multiple products using (CSV)."
        href="/dashboard/products/multiple"
      />

      <AddProductForm />
    </div>
  );
}
