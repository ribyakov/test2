import { AppDataSource } from "../typeorm.config";
import { DispatchDataLogbook, DispatchDataLogbookRecord } from "../entities";
import { Lockable } from "../entities/Lockable";

export class LockableRepository {
  static async isLocked(item: Lockable): Promise<boolean> {
    const locked = await AppDataSource.manager.findOne(
      DispatchDataLogbookRecord,
      {
        where: { uuid: item.uuid },
        cache: true,
      },
    );
    return !!locked;
  }

  static async lock(
    logbook: DispatchDataLogbook,
    item: Lockable,
  ): Promise<void> {
    const lockItem = new DispatchDataLogbookRecord();
    lockItem.logbook = logbook;
    lockItem.uuid = item.uuid;
    lockItem.breed = item.constructor.name;
    await AppDataSource.manager.save(lockItem);
  }

  static async unlock(item: Lockable): Promise<void> {
    await AppDataSource.manager.delete(DispatchDataLogbookRecord, {
      where: { uuid: item.uuid },
    });
  }
}
