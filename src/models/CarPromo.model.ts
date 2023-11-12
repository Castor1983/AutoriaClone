import { model, Schema, Types } from "mongoose";

import { EBrand } from "../enums/brand.enum";
import { ECarPromoStatus } from "../enums/carPromo_status.enum";
import { ECurrency } from "../enums/currency.enum";
import { EUkrainianRegion } from "../enums/UkrainianRegion.enum";
import { ICarPromo } from "../types/carPromo.type";
import { User } from "./User.model";

const carPromoSchema = new Schema(
  {
    year: {
      type: Number,
    },
    model: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      enum: EBrand,
      required: true,
    },
    specification: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    region: {
      type: String,
      enum: EUkrainianRegion,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      enum: ECurrency,
      required: true,
    },
    _userId: {
      type: Types.ObjectId,
      required: true,
      ref: User,
    },
    status: {
      type: String,
      enum: ECarPromoStatus,
      required: true,
      default: ECarPromoStatus.inactive,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const CarPromo = model<ICarPromo>("carPromo", carPromoSchema);
