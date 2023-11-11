import joi from "joi";
import { regexConstant } from "../constants/regex.constant";

export class UserValidator {
  static firstName = joi.string().min(2).max(50).trim();
  static email = joi.string().regex(regexConstant.EMAIL).trim();
  static password = joi.string().regex(regexConstant.PASSWORD).trim();
  static phone = joi.string().regex(regexConstant.PHONENUMBER).trim();


  static update = joi.object({
    name: this.firstName,

  });

  static register = joi.object({
    name: this.firstName.required(),
    email: this.email.required(),
    password: this.password.required(),
    phone: this.phone.required(),
  });

  static login = joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });

  static forgotPassword = joi.object({
    email: this.email.required(),
  });

  static setForgotPassword = joi.object({
    newPassword: this.password.required(),
  });

  static setNewPassword = joi.object({
    password: this.password.required(),
    newPassword: this.password.required(),
  });
}
