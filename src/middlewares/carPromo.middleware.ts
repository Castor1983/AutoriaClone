import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { carPromoRepository } from "../repositories/carPromo.repository";

class CarPromoMiddleware {
  public async getByIdOrThrow(req: Request, res: Response, next: NextFunction) {
    try {
      const { carId } = req.params;

      const car = await carPromoRepository.findById(carId);
      if (!car) {
        throw new ApiError("Car not found", 404);
      }

      req.res.locals = car;

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const carMiddleware = new CarPromoMiddleware();
