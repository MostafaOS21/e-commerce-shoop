import { Button } from "@/components/ui/button";
import React from "react";

export default function LogIn() {
  return (
    <div className="bg-gray-100 section-h-full w-full">
      <div className="container flex flex-col xl:flex-row gap-5">
        <div>
          <div>
            <p>Welcome!</p>

            <h2>
              At Shoop!, we turn shopping into a journey of discovery and
              delight.
            </h2>

            <Button>Sign Up</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
