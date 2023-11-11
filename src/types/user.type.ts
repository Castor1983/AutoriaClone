import { Document } from "mongoose";

import { EUserStatus } from "../enums/user-status.enum";
import { EUserRoles } from "../enums/user-roles.enum";
import {EUserTypeAccount} from "../enums/user-account.enum";

export interface IUser extends Document {
  name?: string;
  email: string;
  password: string;
  status: EUserStatus;
  roles: EUserRoles;
  account: EUserTypeAccount;
  phone: string;
}

export type IUserCredentials = Pick<IUser, "email" | "password">;
export interface ISetNewPassword extends Pick<IUser, "password"> {
  newPassword: string;
}