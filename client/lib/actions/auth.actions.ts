"use server";

import { signIn, signOut } from "@/auth";
import { IApiUser } from "@/types/user";

export const logIn = async (props: IApiUser) => {
  await signIn("credentials", props);
};

export const logOut = async () => {
  await signOut();
};
