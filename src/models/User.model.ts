import { Model, model, Schema } from "mongoose";
import { EUserStatus } from "../enums/user-status.enum";
import { EUserRoles } from "../enums/user-roles.enum";
import { IUser } from "../types/user.type";
import {EUserTypeAccount} from "../enums/user-account.enum";

export interface IUserModel
  extends Model<IUser, object, IUserMethods, IUserVirtuals> {
  findByEmail(email: string): Promise<IUser>;
}

interface IUserMethods {
  nameWithAge(): string;
}

interface IUserVirtuals {
  birthYear: number;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
      phone: {
          type: Number,
          required: true,
          unique: true,
      },
      password: {
      type: String,
      select: false,
      required: true,
    },
      status: {
          type: String,
          enum: EUserStatus,
          required: true,
          default: EUserStatus.inactive,
      },
      role: {
          type: String,
          enum: EUserRoles,
          required: true,
          default: EUserRoles.seller,
      },
      account: {
        type: String,
          enum: EUserTypeAccount,
          required: true,
          default: EUserTypeAccount.basic
      }
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

/*userSchema.methods = {
  nameWithAge(): string {
    return `${this.name} is ${this.age} years old`;
  },
};*/

userSchema.statics = {
  async findByEmail(email): Promise<IUser> {
    return this.findOne({ email });
  },
};

/*userSchema.virtual("birthYear").get(function () {
  if (this.age) {
    const currentYear = new Date().getFullYear();
    return currentYear - this.age;
  }
  return null;
});*/

export const User = model<IUser, IUserModel>("user", userSchema);
