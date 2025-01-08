import { ConditionJournal } from "../entities";
import { ConditionJournalRepository } from "../repositories/ConditionJournalRepository";

export class ConditionJournalController {
  getBySegmentId(segmentId: number): Promise<ConditionJournal | null> {
    return ConditionJournalRepository.findOne({
      where: { segment: { id: segmentId } },
    });
  }

  async save(journal: ConditionJournal): Promise<void> {
    await ConditionJournalRepository.save(journal);
  }
}
