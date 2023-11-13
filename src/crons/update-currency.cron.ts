import axios from "axios";
import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { ApiError } from "../errors/api.error";
import { coursRepository } from "../repositories/cours.repository";

dayjs.extend(utc);

const updateCurrency = async function () {
  try {
    const cours = await axios.get(
      "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5",
    );
    const rates: any = {};
    cours.data.forEach((currency: any) => {
      rates[currency.ccy] = parseFloat(currency.sale);
    });
    await coursRepository.createCours(rates);
  } catch (e) {
    throw new ApiError(e.message, e.status);
  }
};
export const currencyUpdate = new CronJob("0 0 0 * * *", updateCurrency);
