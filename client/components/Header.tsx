import Image from "next/image";
import Link from "next/link";
import React from "react";
import SearchBar from "./SearchBar";
import { ShoppingCart, User } from "lucide-react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ToggleMode";

const Header = () => {
  return (
    <header className="border-b">
      <div className="container flex items-center justify-between gap-5">
        <Link href="/">
          <Image
            src="/assets/images/logo-light.png"
            width={220}
            height={220}
            alt="logo"
            className="size-[75px] dark:invert"
          />
        </Link>

        <SearchBar />

        <div className="flex items-center gap-2">
          <Button variant={"ghost"} asChild className="btn-icon-container">
            <Link href="/auth/log-in" className="flex ite">
              <User /> Log In
            </Link>
          </Button>

          <Button variant={"ghost"} asChild className="btn-icon-container">
            <Link href="/cart">
              <ShoppingCart /> Cart
            </Link>
          </Button>

          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
