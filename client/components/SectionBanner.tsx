import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const SectionBanner = ({
  paragraph,
  href,
}: {
  paragraph: string;
  href: string;
}) => {
  return (
    <section className="flex items-center justify-between py-5 border px-3 rounded-lg bg-gradient-to-r from-green-200 to-blue-200">
      <p>{paragraph}</p>

      <Button asChild className="rounded-full p-3 h-fit">
        <Link href={href}>
          <ArrowRight />
        </Link>
      </Button>
    </section>
  );
};

export default SectionBanner;
