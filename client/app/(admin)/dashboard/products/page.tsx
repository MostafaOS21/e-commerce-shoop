import React from "react";
import ProductsBentoGrid from "./ProductsBentoGrid";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function Products() {
  return (
    <div>
      <section className="flex items-center justify-between py-5 border px-3 rounded-lg bg-gradient-to-r from-green-200 to-blue-200">
        <p>
          Add a new product to your store. You can add multiple products at
          once.
        </p>

        <Button asChild className="rounded-full p-3 h-fit">
          <Link href={"/dashboard/products/add"}>
            <Plus />
          </Link>
        </Button>
      </section>

      <ProductsBentoGrid />
    </div>
  );
}
