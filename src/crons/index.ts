import { removeOldTokens } from "./remove-old-tokens.cron";
import { sendNotificationToOldVisitors } from "./send-notification-to-old-visitors.cron";
import { currencyUpdate } from "./update-currency.cron";

export const cronRunner = () => {
  removeOldTokens.start();
  sendNotificationToOldVisitors.start();
  currencyUpdate.start();
};
