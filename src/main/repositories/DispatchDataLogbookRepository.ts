import { AppDataSource } from "../typeorm.config";
import { DispatchDataLogbook } from "../entities";

export const DispatchDataLogbookRepository = AppDataSource.getRepository(
  DispatchDataLogbook,
).extend({
  async save(journal: DispatchDataLogbook) {
    const queryRunner = AppDataSource.createQueryRunner();

    // let's now open a new transaction:
    await queryRunner.startTransaction();

    try {
      // generate uuid for new entries
      for (const entry of journal.entries ?? []) {
        if (entry.item) {
          entry.breed = entry.item.constructor.name;
          entry.uuid = entry.item.uuid;
        }
      }

      // execute some operations on this transaction:
      const result = await queryRunner.manager.save(
        DispatchDataLogbook,
        journal,
      );
      console.log("journal saved successfully");

      // commit transaction now:
      await queryRunner.commitTransaction();
      return result;
    } catch (err) {
      console.log(err);
      // since we have errors lets rollback changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release();
    }
  },
});
