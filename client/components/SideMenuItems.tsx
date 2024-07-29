"use client";

import { dashboard_main_routes, dashboard_tools_routes } from "@/lib/constants";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Separator } from "./ui/separator";

const unorderedList = "flex flex-col gap-2";

const SideMenuItems = () => {
  const path = usePathname();

  return (
    <div className="flex flex-col justify-between h-full pb-4 px-2">
      <div>
        <h4 className="text-base font-medium">Navigate</h4>

        <Separator className="my-2 w-[65px]" />

        <ul className={unorderedList}>
          {dashboard_main_routes.map((route, index) => (
            <Button
              asChild
              variant={path === route.href ? "default" : "ghost"}
              key={index}
            >
              <li>
                <Link
                  href={route.href}
                  className="btn-icon-container block w-full h-full"
                >
                  <route.icon /> {route.title}
                </Link>
              </li>
            </Button>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-base font-medium">Tools</h4>

        <Separator className="my-2 w-[65px]" />

        <ul className={unorderedList}>
          {dashboard_tools_routes.map((route, index) => (
            <Button
              asChild
              variant={path === route.href ? "default" : "ghost"}
              key={index}
            >
              <li>
                <Link
                  href={route.href}
                  className="btn-icon-container block w-full h-full"
                >
                  <route.icon /> {route.title}
                </Link>
              </li>
            </Button>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideMenuItems;
