import joi from "joi";

import { EBrand } from "../enums/brand.enum";
import {regexConstant} from "../constants/regex.constant";
import {ECurrency} from "../enums/currency.enum";
import {EUkrainianRegion} from "../enums/UkrainianRegion.enum";

export class CarPromoValidator {
  static year = joi.number().min(1990).max(2023);
  static model = joi.string().min(2).max(30).trim();
  static brand = joi.valid(...Object.values(EBrand));
  static currency = joi.valid(...Object.values(ECurrency));
  static region = joi.valid(...Object.values(EUkrainianRegion));
  static specification = joi.string().min(30).max(1000);
  static price = joi.number().min(1).max(1000000);



  static create = joi.object({
    year: this.year.required(),
    model: this.model.required(),
    brand: this.brand.required(),
    specification: this.specification.required(),
    price: this.price.required(),
    currency: this.currency.required(),
    region: this.region.required(),
  });

  static update = joi.object({
    year: this.year,
    model: this.model,
    specification: this.specification,
    price: this.price,
  });
}
