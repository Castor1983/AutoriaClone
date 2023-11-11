import joi from "joi";

import { EProducer } from "../enums/producer.enum";

export class CarPromoValidator {
  static year = joi.number().min(1990).max(2023);
  static model = joi.string().min(2).max(30).trim();
  static producer = joi.valid(...Object.values(EProducer));
  static specification = joi.string().min(30).max(1000)
  static price = joi.number().min(1).max(1000000)

  static create = joi.object({
    year: this.year.required(),
    model: this.model.required(),
    producer: this.producer.required(),
    specification: this.specification.required(),
    price: this.price.required(),
  });

  static update = joi.object({
    year: this.year,
    model: this.model,
    specification: this.specification,
    price: this.price,
  });
}
