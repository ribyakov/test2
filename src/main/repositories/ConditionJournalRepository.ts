import { AppDataSource } from "../typeorm.config";
import { v4 as uuidv4 } from "uuid";
import { ConditionJournal } from "../entities";

export const ConditionJournalRepository = AppDataSource.getRepository(
  ConditionJournal,
).extend({
  async save(journal: ConditionJournal) {
    const queryRunner = AppDataSource.createQueryRunner();

    // let's now open a new transaction:
    await queryRunner.startTransaction();

    try {
      // generate uuid for new entries
      for (const entry of journal.points ?? []) {
        entry.uuid ??= uuidv4();
      }
      // execute some operations on this transaction:
      const result = await queryRunner.manager.save(ConditionJournal, journal);
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
