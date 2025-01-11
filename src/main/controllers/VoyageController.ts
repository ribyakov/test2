import { VoyageSegment } from "../entities";
import { AppDataSource } from "../typeorm.config";

export class VoyageController {
  segments(id: number): Promise<VoyageSegment[]> {
    return AppDataSource.manager.findBy(VoyageSegment, {
      voyage: { id: id },
    });
  }
}
