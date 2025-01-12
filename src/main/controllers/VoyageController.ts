import { Voyage, VoyageSegment } from "../entities";
import { AppDataSource } from "../typeorm.config";

export class VoyageController {
  async getAll(): Promise<Voyage[]> {
    return await AppDataSource.manager.find(Voyage);
  }
  async segments(id: number): Promise<VoyageSegment[]> {
    return await AppDataSource.manager.findBy(VoyageSegment, {
      voyage: { id: id },
    });
  }
}
