import {
  CargoOperationJournal,
  CargoOperationJournalRecord,
} from "../entities";
import { CargoOperationJournalRepository } from "../repositories/CargoOperationJournalRepository";
import { AppDataSource } from "../typeorm.config";

export class CargoOperationJournalController {
  getBySegmentId(segmentId: number): Promise<CargoOperationJournal | null> {
    return CargoOperationJournalRepository.findOne({
      where: { segment: { id: segmentId } },
    });
  }

  async save(journal: CargoOperationJournal): Promise<void> {
    await CargoOperationJournalRepository.save(journal);
  }

  async deleteEntry(entry: CargoOperationJournalRecord): Promise<void> {
    await AppDataSource.manager.remove(CargoOperationJournalRecord, entry);
  }
}
