import { FilterQuery } from "mongoose";

import { CarPromo } from "../models/CarPromo.model";
import { ICarPromo } from "../types/carPromo.type";

class CarPromoRepository {
  public async getAll(): Promise<ICarPromo[]> {
    return await CarPromo.find().populate("_userId");
  }
  public async getOneByParams(params: FilterQuery<ICarPromo>): Promise<ICarPromo> {
    return await CarPromo.findOne(params);
  }

  public async findById(id: string): Promise<ICarPromo> {
    return await CarPromo.findById(id);
  }

  public async createCar(dto: ICarPromo, userId: string): Promise<ICarPromo> {
    return await CarPromo.create({ ...dto, _userId: userId });
  }

  public async updateCar(carId: string, dto: Partial<ICarPromo>): Promise<ICarPromo> {
    return await CarPromo.findByIdAndUpdate(carId, dto, {
      returnDocument: "after",
    });
  }

  public async deleteCar(carId: string): Promise<void> {
    await CarPromo.deleteOne({ _id: carId });
  }
}

export const carPromoRepository = new CarPromoRepository();
