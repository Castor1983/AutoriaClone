import { model, Schema, Types } from "mongoose";

import { IStat } from "../types/stat.type";
import { CarPromo } from "./CarPromo.model";

const statSchema = new Schema(
  {
    views: {
      type: Number,
      required: true,
      default: 0,
    },
    views_per_day: {
      type: Number,
      required: true,
      default: 0,
    },
    views_per_week: {
      type: Number,
      required: true,
      default: 0,
    },
    views_per_month: {
      type: Number,
      required: true,
      default: 0,
    },
    avg_region_price: {
      type: Number,
      required: true,
      default: 0,
    },
    avg_price: {
      type: Number,
      required: true,
      default: 0,
    },
    _carPromoId: {
      type: Types.ObjectId,
      required: true,
      ref: CarPromo,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Stat = model<IStat>("stat", statSchema);
