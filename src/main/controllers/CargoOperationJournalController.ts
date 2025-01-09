import { CargoOperationJournal } from "../entities";
import { CargoOperationJournalRepository } from "../repositories/CargoOperationJournalRepository";

export class CargoOperationJournalController {
  getBySegmentId(segmentId: number): Promise<CargoOperationJournal | null> {
    return CargoOperationJournalRepository.findOne({
      where: { segment: { id: segmentId } },
    });
  }

  async save(journal: CargoOperationJournal): Promise<void> {
    await CargoOperationJournalRepository.save(journal);
  }
}
