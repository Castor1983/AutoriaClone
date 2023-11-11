import { model, Schema, Types } from "mongoose";

import { EProducer } from "../enums/producer.enum";
import { ICarPromo } from "../types/carPromo.type";
import { User } from "./User.model";
import {ECarPromoStatus} from "../enums/carPromo_status.enum";

const carPromoSchema = new Schema(
  {
    year: {
      type: Number,
    },
    model: {
      type: String,
      required: true,
    },
    producer: {
      type: String,
      enum: EProducer,
      required: true,
    },
      specification: {
        type: String,
          required: true,
      },
      photo: {
        type: String,
      },
      price: {
          type: Number,
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
          default: ECarPromoStatus.inactive, }
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const CarPromo = model<ICarPromo>("carPromo", carPromoSchema);
