import { ConditionJournal, ConditionJournalGeoRecord } from "../entities";
import { ConditionJournalRepository } from "../repositories/ConditionJournalRepository";
import { AppDataSource } from "../typeorm.config";

export class ConditionJournalController {
  getBySegmentId(segmentId: number): Promise<ConditionJournal | null> {
    return ConditionJournalRepository.findOne({
      where: { segment: { id: segmentId } },
    });
  }

  async save(journal: ConditionJournal): Promise<void> {
    await ConditionJournalRepository.save(journal);
  }

  async deleteEntry(entry: ConditionJournalGeoRecord): Promise<void> {
    await AppDataSource.manager.remove(ConditionJournalGeoRecord, entry);
  }
}
