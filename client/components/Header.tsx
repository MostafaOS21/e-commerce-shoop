import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import SearchBar from "./SearchBar";
import { ShoppingCart, User } from "lucide-react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ToggleMode";
import LoaderButton from "./ui/loader-btn";
import { auth } from "@/auth";
import DropdownProfile from "./DropdownProfile";

const Header = () => {
  return (
    <header className="border-b" id="mainHeader">
      <div className="container flex items-center justify-between gap-5 py-0">
        <Link href="/">
          <Image
            src="/assets/images/logo-light.png"
            width={220}
            height={220}
            alt="logo"
            className="size-[75px] logo"
          />
        </Link>

        <SearchBar />

        <div className="flex items-center gap-2">
          <Suspense fallback={<LoaderButton />}>
            <AuthButtons />
          </Suspense>

          <Button asChild className="btn-icon-container">
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

const AuthButtons = async () => {
  const session = await auth();

  const logInButton = (
    <Button variant={"ghost"} asChild className="btn-icon-container">
      <Link href="/auth/log-in" className="flex ite">
        <User /> Log In
      </Link>
    </Button>
  );

  return session?.user ? (
    <DropdownProfile isAdmin={session?.user?.role === "admin"} />
  ) : (
    logInButton
  );
};

export default Header;
