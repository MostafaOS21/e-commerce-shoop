import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { LogInForm } from "@/components/forms/LogInForm";

const AuthPageLayout = () => {
  return (
    <div className="bg-gray-100 dark:bg-slate-900 section-h-full w-full">
      <div className="container grid grid-cols-1 xl:grid-cols-2 gap-8 h-full py-5">
        <div className="flex xl:block flex-col justify-between h-full">
          <div>
            <p className="text-lg text-center">Welcome Back!</p>

            <h2>
              At Shoop!, we turn shopping into a journey of{" "}
              <span className="underline-primary">discovery and delight.</span>
            </h2>
          </div>

          <div className="flex flex-col items-center">
            <p>Don't have an account?</p>
            <Button
              variant={"ghost"}
              asChild
              className="text-black dark:text-white w-fit py-1 border-b border-black rounded-none"
            >
              <Link href="/auth/sign-up" className="btn-icon-container">
                Create an account <ArrowRightIcon />
              </Link>
            </Button>
          </div>

          <div className="relative h-64 grid place-content-center overflow-hidden rounded-md">
            <span className="overlay"></span>
            <Image
              src="/assets/images/log-in-2.jpg"
              width={1000}
              height={1000}
              alt="about us"
              className="object-cover absolute w-full h-full  bg-blend-normal"
            />

            <div className="flex gap-10 justify-between relative z-10 p-10 text-white mx-auto">
              <h3>About</h3>
              <p>
                Shoop! is dedicated to providing a seamless shopping experience
                with a diverse range of products, exceptional customer service,
                and unbeatable prices. Shop with us and experience the joy of
                easy shopping.
              </p>
            </div>
          </div>
        </div>

        <div className="h-full relative rounded-md overflow-hidden grid place-content-center">
          <span className="overlay"></span>

          <Image
            src="/assets/images/log-in-1.jpg"
            width={1000}
            height={1000}
            alt="log in 2"
            className="object-cover absolute w-full h-full"
          />

          <LogInForm />
        </div>
      </div>
    </div>
  );
};
export default AuthPageLayout;
