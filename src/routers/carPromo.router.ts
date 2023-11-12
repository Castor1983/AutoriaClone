import { Router } from "express";

import { carPromoController } from "../controllers/carPromo.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { carMiddleware } from "../middlewares/carPromo.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { CarPromoValidator } from "../validators/carPromo.validator";

const router = Router();

router.get("/", carPromoController.getAllWithPagination);

router.post(
  "/",
  authMiddleware.checkAccessToken,
  commonMiddleware.isBodyValid(CarPromoValidator.create),
  carPromoController.createCar,
);

router.get(
  "/:carId",
  commonMiddleware.isIdValid("carId"),
  carMiddleware.getByIdOrThrow,
  carPromoController.getById,
);
router.put(
  "/:carId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("carId"),
  commonMiddleware.isBodyValid(CarPromoValidator.update),
  carPromoController.updateCar,
);
router.delete(
  "/:carId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("carId"),
  carPromoController.deleteCar,
);
router.get(
  "/stat/:carId",
  commonMiddleware.isIdValid("carId"),
  carMiddleware.getByIdOrThrow,
  carPromoController.getById,
);

export const carPromoRouter = router;
