import { Cours } from "../models/Cours.model";
import { ICours } from "../types/cours.type";

class CoursRepository {
  public async createCours(dto: ICours): Promise<ICours> {
    Cours.deleteMany();
    return await Cours.create(dto);
  }
}
export const coursRepository = new CoursRepository();
