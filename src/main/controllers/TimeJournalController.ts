import { TimeJournal, TimeJournalEntry } from "../entities";
import { TimeJournalRepository } from "../repositories/TimeJournalRepository";
import { AppDataSource } from "../typeorm.config";

export class TimeJournalController {
  getBySegmentId(segmentId: number): Promise<TimeJournal | null> {
    return TimeJournalRepository.findOne({
      where: { segment: { id: segmentId } },
    });
  }

  async save(journal: TimeJournal): Promise<void> {
    await TimeJournalRepository.save(journal);
  }

  async deleteEntry(entry: TimeJournalEntry): Promise<void> {
    await AppDataSource.manager.remove(TimeJournalEntry, entry);
  }
}
