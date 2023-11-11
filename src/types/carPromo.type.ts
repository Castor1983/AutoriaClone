import { Document } from "mongoose";

import { EProducer } from "../enums/producer.enum";
import {ECarPromoStatus} from "../enums/carPromo_status.enum";

export interface ICarPromo extends Document {
  year?: number;
  model?: string;
  producer?: EProducer;
  specification?: string;
  price?: number;
  status?: ECarPromoStatus;
}
