import { TimeJournal } from "../entities";
import { AppDataSource } from "../typeorm.config";

export class TimeJournalController {
  getBySegmentId(segmentId: number): Promise<TimeJournal | null> {
    return AppDataSource.manager.findOne(TimeJournal, {
      where: { segment: { id: segmentId } },
    });
  }
}
