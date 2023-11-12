import { regexConstant } from "../constants/regex.constant";
import { ECarPromoStatus } from "../enums/carPromo_status.enum";
import { EEmailAction } from "../enums/email.action.enum";
import { EUserRoles } from "../enums/user-roles.enum";
import { ApiError } from "../errors/api.error";
import { carPromoRepository } from "../repositories/carPromo.repository";
import { userRepository } from "../repositories/user.repository";
import { ICarPromo } from "../types/carPromo.type";
import { IPaginationResponse, IQuery } from "../types/pagination.type";
import { emailService } from "./email.service";

class CarPromoService {
  public async getAllWithPagination(
    query: IQuery,
  ): Promise<IPaginationResponse<ICarPromo>> {
    try {
      const [carsPromo, itemsFound] = await carPromoRepository.getMany(query);

      return {
        page: +query.page,
        limit: +query.limit,
        itemsFound,
        data: carsPromo,
      };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async createCar(dto: ICarPromo, userId: string): Promise<ICarPromo> {
    const checkForProfanity = dto.specification.match(regexConstant.PROFANITY);

    if (!checkForProfanity) {
      dto.status = ECarPromoStatus.active;
    } else {
      const user = await userRepository.getOneByParams({
        role: "manager",
      });

      await emailService.sendMail(
        user.email,
        EEmailAction.MODERATE_SPECIFICATION,
        {
          name: user.name,
          id: dto._id,
        },
      );
    }
    return await carPromoRepository.createCar(dto, userId);
  }

  public async updateCar(
    carId: string,
    dto: Partial<ICarPromo>,
    userId: string,
    role: string,
  ): Promise<ICarPromo> {
    await this.checkAbilityToManage(userId, carId, role);
    return await carPromoRepository.updateCar(carId, dto);
  }

  public async deleteCar(
    carId: string,
    userId: string,
    role: string,
  ): Promise<void> {
    await this.checkAbilityToManage(userId, carId, role);
    await carPromoRepository.deleteCar(carId);
  }

  private async checkAbilityToManage(
    userId: string,
    manageCarId: string,
    role: string,
  ): Promise<ICarPromo> {
    const car = await carPromoRepository.getOneByParams({
      _userId: userId,
      _id: manageCarId,
    });
    if (!car && role !== (EUserRoles.admin || EUserRoles.manager)) {
      throw new ApiError("You can not manage this car", 403);
    }
    return car;
  }
}

export const carPromoService = new CarPromoService();
