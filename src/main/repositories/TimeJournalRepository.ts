import { AppDataSource } from "../typeorm.config";
import {
  DispatchDataLogbookRecord,
  TimeJournal,
  TimeJournalRecord,
} from "../entities";
import { v4 as uuidv4 } from "uuid";

export const TimeJournalRepository = AppDataSource.getRepository(
  TimeJournal,
).extend({
  async isLocked(entity: TimeJournalRecord) {
    return AppDataSource.manager.findOne(DispatchDataLogbookRecord, {
      where: { id: entity.id },
    });
  },
  async save(journal: TimeJournal) {
    console.log(journal);
    const queryRunner = AppDataSource.createQueryRunner();

    // let's now open a new transaction:
    await queryRunner.startTransaction();

    try {
      // generate uuid for new entries
      for (const entry of journal.entries ?? []) {
        entry.uuid ??= uuidv4();
      }
      // execute some operations on this transaction:
      const result = await queryRunner.manager.save(TimeJournal, journal);
      console.log("journal saved successfully");

      // commit transaction now:
      await queryRunner.commitTransaction();
      return result;
    } catch (err) {
      // since we have errors lets rollback changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release();
    }
  },
});
