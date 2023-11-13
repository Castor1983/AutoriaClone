import { Document, Types } from "mongoose";

import { EActionTokenType } from "../enums/actionTokenType.enum";
import { EUserTypeAccount } from "../enums/user-account.enum";
import { EUserRoles } from "../enums/user-roles.enum";
import { IUser } from "./user.type";

export interface ITokenPayload {
  userId?: string;
  name?: string;
  role?: EUserRoles;
  account?: EUserTypeAccount;
}

export interface ITokensPair {
  accessToken: string;
  refreshToken: string;
}

export interface IToken extends Document {
  accessToken: string;
  refreshToken: string;
  _userId: Types.ObjectId | IUser;
}

export interface IActionTokenDocument extends Document {
  token: string;
  type: EActionTokenType;
  _userId: Types.ObjectId | IUser;
}

export interface IActionToken
  extends Pick<IActionTokenDocument, "token" | "type" | "_userId"> {}
