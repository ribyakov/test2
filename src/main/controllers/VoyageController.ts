import { VoyageTaskSegment } from "../entities";
import { AppDataSource } from "../typeorm.config";

export class VoyageController {
  segments(id: number): Promise<VoyageTaskSegment[]> {
    console.log("here");
    return AppDataSource.manager.findBy(VoyageTaskSegment, {
      voyage: { id: id },
    });
  }
}
