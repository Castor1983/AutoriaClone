import { model, Schema } from "mongoose";

import { ICours } from "../types/cours.type";

const coursSchema = new Schema(
  {
    EUR: {
      type: Number,
      required: true,
    },
    USD: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const Cours = model<ICours>("cours", coursSchema);
