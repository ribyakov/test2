import { OilType } from "../entities";
import { AppDataSource } from "../typeorm.config";

export default class OilTypeRepository {
  public static async getAll(): Promise<OilType[]> {
    const result = await AppDataSource.manager.find(OilType);
    return result;
  }

  public static async add(oilType: Partial<OilType>) {
    const studentToUpdate = AppDataSource.manager.create(OilType, oilType);
    await AppDataSource.manager.save(studentToUpdate);
  }
}
