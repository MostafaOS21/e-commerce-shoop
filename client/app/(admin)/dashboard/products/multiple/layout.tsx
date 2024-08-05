import { Metadata } from "next";
import React from "react";

export const metadata = (): Metadata => {
  return {
    title: "Add Multiple Products",
    description: "Upload CSV file to add multiple products",
  };
};

export default function MultipleProducts({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
