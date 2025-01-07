import { TimeJournal } from "../entities";
import { TimeJournalRepository } from "../repositories/TimeJournalRepository";

export class TimeJournalController {
  getBySegmentId(segmentId: number): Promise<TimeJournal | null> {
    return TimeJournalRepository.findOne({
      where: { segment: { id: segmentId } },
    });
  }

  async save(journal: TimeJournal): Promise<void> {
    await TimeJournalRepository.save(journal);
  }
}
