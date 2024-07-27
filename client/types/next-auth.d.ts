import { DefaultSession } from "next-auth";
import { IUser } from "./user";

declare module "next-auth" {
  interface Session {
    user: IUser & DefaultSession["user"];
  }

  interface User extends IUser {}
}
