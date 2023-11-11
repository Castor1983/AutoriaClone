import { NextFunction, Request, Response } from "express";

import { carPromoService } from "../services/carPromo.service";
import { ICarPromo } from "../types/carPromo.type";
import { ITokenPayload } from "../types/token.types";

class CarPromoController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ICarPromo[]>> {
    try {
      const cars = await carPromoService.getAll();

      return res.json(cars);
    } catch (e) {
      next(e);
    }
  }
  public async createCar(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { userId } = req.res.locals.tokenPayload as ITokenPayload;

      const car = await carPromoService.createCar(req.body, userId);

      res.status(201).json(car);
    } catch (e) {
      next(e);
    }
  }
  public async deleteCar(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { userId } = req.res.locals.tokenPayload as ITokenPayload;

      await carPromoService.deleteCar(req.params.carId, userId);

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async updateCar(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { userId } = req.res.locals.tokenPayload as ITokenPayload;

      const car = await carPromoService.updateCar(
        req.params.carId,
        req.body,
        userId,
      );

      res.status(201).json(car);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const car = req.res.locals;

      res.json(car);
    } catch (e) {
      next(e);
    }
  }
}

export const carPromoController = new CarPromoController();
