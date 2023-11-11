import { ApiError } from "../errors/api.error";
import { carPromoRepository } from "../repositories/carPromo.repository";
import { ICarPromo } from "../types/carPromo.type";
import {EUserRoles} from "../enums/user-roles.enum";

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
    role: string
  ): Promise<ICarPromo> {
    await this.checkAbilityToManage(userId, carId, role);
    return await carPromoRepository.updateCar(carId, dto, role );
  }

  public async deleteCar(carId: string, userId: string, role: string): Promise<void> {
    await this.checkAbilityToManage(userId, carId, role);
    await carPromoRepository.deleteCar(carId);
  }

  private async checkAbilityToManage(
    userId: string,
    manageCarId: string,
    role: string
  ): Promise<ICarPromo> {
    const car = await carPromoRepository.getOneByParams({
      _userId: userId,
      _id: manageCarId,
    });
    if (!car && role !== EUserRoles.admin) {
      throw new ApiError("You can not manage this car", 403);
    }
    return car;
  }
}

export const carPromoService = new CarPromoService();
