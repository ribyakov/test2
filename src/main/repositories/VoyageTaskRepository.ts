// user.repository.ts
import { AppDataSource } from "../typeorm.config";
import { VoyageTask } from "../entities";

export const VoyageTaskRepository = AppDataSource.getRepository(
  VoyageTask,
).extend({
  async save(voyage: VoyageTask) {
    const queryRunner = AppDataSource.createQueryRunner();

    // let's now open a new transaction:
    await queryRunner.startTransaction();

    try {
      // execute some operations on this transaction:
      const v = await queryRunner.manager.save(voyage);
      console.log("voyage saved successfully");
      console.log(JSON.stringify(voyage));

      // commit transaction now:
      await queryRunner.commitTransaction();
      return v;
    } catch (err) {
      // since we have errors lets rollback changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release();
    }
  },
});
