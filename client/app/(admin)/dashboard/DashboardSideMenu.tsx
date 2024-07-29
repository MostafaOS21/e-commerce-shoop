"use client";
import SideMenuItems from "@/components/SideMenuItems";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const DashboardSideMenu = () => {
  useEffect(() => {
    const mainHeader = document.getElementById("mainHeader");

    if (mainHeader) {
      mainHeader.style.display = "none";
    }

    return () => {
      if (mainHeader) {
        mainHeader.style.display = "block";
      }
    };
  }, []);

  return (
    <div className="relative">
      <aside className="sticky h-screen left-0 top-0 flex flex-col gap-2">
        <div className="h-[60px] overflow-hidden">
          <Link href={"/"} className="flex items-center gap-3">
            <Image
              src="/assets/images/logo-light.png"
              width={250}
              height={250}
              alt="logo"
              className="size-[75px] logo"
            />

            <Separator className="h-[30px] w-[1px]" />

            <h3 className="text-lg">Go to shop</h3>
          </Link>
        </div>

        <Separator className="w-full h-[1px] bg-gray-200 my-4" />

        <SideMenuItems />
      </aside>
    </div>
  );
};

export default DashboardSideMenu;
