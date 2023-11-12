import { FilterQuery } from "mongoose";

import { ECarPromoStatus } from "../enums/carPromo_status.enum";
import { CarPromo } from "../models/CarPromo.model";
import { ICarPromo } from "../types/carPromo.type";
import { IQuery } from "../types/pagination.type";

class CarPromoRepository {
  public async getMany(query: IQuery): Promise<[ICarPromo[], number]> {
    const queryStr = JSON.stringify(query);
    const queryObj = JSON.parse(
      queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`),
    );
    const { page, limit, sortedBy, ...searchObject } = queryObj;
    searchObject.status = ECarPromoStatus.active;
    const skip = +limit * (+page - 1);

    return await Promise.all([
      CarPromo.find(searchObject)
        .limit(+limit)
        .skip(skip)
        .sort(sortedBy)
        .populate("_userId", ["name", "phone"]),
      CarPromo.count(searchObject),
    ]);
  }
  public async getOneByParams(
    params: FilterQuery<ICarPromo>,
  ): Promise<ICarPromo> {
    return await CarPromo.findOne(params);
  }

  public async findById(id: string): Promise<ICarPromo> {
    return await CarPromo.findById(id);
  }

  public async createCar(dto: ICarPromo, userId: string): Promise<ICarPromo> {
    return await CarPromo.create({ ...dto, _userId: userId });
  }

  public async updateCar(
    carId: string,
    dto: Partial<ICarPromo>,
  ): Promise<ICarPromo> {
    return await CarPromo.findByIdAndUpdate(carId, dto, {
      returnDocument: "after",
    });
  }

  public async deleteCar(carId: string): Promise<void> {
    await CarPromo.deleteOne({ _id: carId });
  }
}

export const carPromoRepository = new CarPromoRepository();
