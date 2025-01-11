import { AppDataSource } from "../typeorm.config";
import { DispatchDataLogbookEntry } from "../entities";
import { Lockable } from "../entities/Lockable";

export class LockableRepository {
  static async isLocked(item: Lockable): Promise<boolean> {
    const locked = await AppDataSource.manager.findOne(
      DispatchDataLogbookEntry,
      {
        where: { uuid: item.uuid },
      },
    );
    return !!locked;
  }

  static async unlock(item: Lockable): Promise<void> {
    await AppDataSource.manager.delete(DispatchDataLogbookEntry, {
      where: { uuid: item.uuid },
    });
  }
}

export async function isLocked<T extends { uuid: string }>(
  item: T,
): Promise<boolean> {
  const locked = await AppDataSource.manager.findOne(DispatchDataLogbookEntry, {
    where: { uuid: item.uuid },
  });
  return !!locked;
}
