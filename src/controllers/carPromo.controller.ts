import { NextFunction, Request, Response } from "express";

import { carPromoService } from "../services/carPromo.service";
import { ICarPromo } from "../types/carPromo.type";
import { IQuery } from "../types/pagination.type";
import { ITokenPayload } from "../types/token.types";

class CarPromoController {
  public async getAllWithPagination(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ICarPromo[]>> {
    try {
      const cars = await carPromoService.getAllWithPagination(
        req.query as IQuery,
      );

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
      const { userId, account } = req.res.locals.tokenPayload as ITokenPayload;

      const car = await carPromoService.createCar(req.body, userId, account);

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
      const { userId, role } = req.res.locals.tokenPayload as ITokenPayload;

      await carPromoService.deleteCar(req.params.carId, userId, role);

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
      const { userId, role } = req.res.locals.tokenPayload as ITokenPayload;

      const car = await carPromoService.updateCar(
        req.params.carId,
        req.body,
        userId,
        role,
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
  /*public async getStatistics(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IStat[]>> {
    try {
      const { userId } = req.res.locals.tokenPayload as ITokenPayload;

      const statistics = await carPromoService.getStatistics(userId);

      return res.json(statistics);
    } catch (e) {
      next(e);
    }
  }*/
}

export const carPromoController = new CarPromoController();
