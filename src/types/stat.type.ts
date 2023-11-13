import { Document } from "mongoose";

import { EBrand } from "../enums/brand.enum";
import { ECarPromoStatus } from "../enums/carPromo_status.enum";
import { EUkrainianRegion } from "../enums/UkrainianRegion.enum";

export interface IStat extends Document {
  year?: number;
  model?: string;
  brand?: EBrand;
  specification?: string;
  price?: number;
  status?: ECarPromoStatus;
  region?: EUkrainianRegion;
}
