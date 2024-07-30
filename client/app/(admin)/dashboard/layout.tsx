import { Metadata } from "next";
import React from "react";
import { Separator } from "@/components/ui/separator";
import DashboardSideMenu from "./DashboardSideMenu";

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
  return (
    <div className="px-3 grid grid-cols-[250px_5px_1fr]">
      <DashboardSideMenu />
      <Separator className="w-[1px] h-full" />
      <div className="sub-container">{children}</div>
    </div>
  );
}
