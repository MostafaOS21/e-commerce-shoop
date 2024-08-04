import React from "react";
import ProductsBentoGrid from "./ProductsBentoGrid";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import SectionBanner from "@/components/SectionBanner";

export default function Products() {
  return (
    <div>
      <SectionBanner
        paragraph="Add a new product to your store. You can add multiple products at once."
        href="/dashboard/products/add"
      />

      <ProductsBentoGrid />
    </div>
  );
}
