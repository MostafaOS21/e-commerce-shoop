import { Metadata } from "next";
import React from "react";

export const metadata = (): Metadata => {
  return {
    title: "Dashboard",
    description: "Shoop! Admin dashboard",
  };
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
