import { AppDataSource } from "../typeorm.config";
import { DispatchDataLogbook, DispatchDataLogbookEntry } from "../entities";
import { Lockable } from "../entities/Lockable";

export class LockableRepository {
  static async isLocked(item: Lockable): Promise<boolean> {
    const locked = await AppDataSource.manager.findOne(
      DispatchDataLogbookEntry,
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
    const lockItem = new DispatchDataLogbookEntry();
    lockItem.logbook = logbook;
    lockItem.uuid = item.uuid;
    await AppDataSource.manager.save(lockItem);
  }

  static async unlock(item: Lockable): Promise<void> {
    await AppDataSource.manager.delete(DispatchDataLogbookEntry, {
      where: { uuid: item.uuid },
    });
  }
}
