export interface IUser {
  _id: string;
  email: string;
  username: string;
  name: string;
  avatar: string;
  createdAt: Date;
  lastLogin: Date;
  isDeleted: boolean;
  totalPurchase: number;
}

export interface IApiUser
  extends Pick<IUser, "_id" | "email" | "name" | "username"> {}
