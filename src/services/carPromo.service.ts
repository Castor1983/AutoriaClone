import { ApiError } from "../errors/api.error";
import { carPromoRepository } from "../repositories/carPromo.repository";
import { ICarPromo } from "../types/carPromo.type";

class CarPromoService {
  public async getAll(): Promise<ICarPromo[]> {
    return await carPromoRepository.getAll();
  }

  public async createCar(dto: ICarPromo, userId: string): Promise<ICarPromo> {
    return await carPromoRepository.createCar(dto, userId);
  }

  public async updateCar(
    carId: string,
    dto: Partial<ICarPromo>,
    userId: string,
  ): Promise<ICarPromo> {
    await this.checkAbilityToManage(userId, carId);
    return await carPromoRepository.updateCar(carId, dto);
  }

  public async deleteCar(carId: string, userId: string): Promise<void> {
    await this.checkAbilityToManage(userId, carId);
    await carPromoRepository.deleteCar(carId);
  }

  private async checkAbilityToManage(
    userId: string,
    manageCarId: string,
  ): Promise<ICarPromo> {
    const car = await carPromoRepository.getOneByParams({
      _userId: userId,
      _id: manageCarId,
    });
    if (!car) {
      throw new ApiError("U can not manage this car", 403);
    }
    return car;
  }
}

export const carPromoService = new CarPromoService();
