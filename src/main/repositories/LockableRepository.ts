import { AppDataSource } from "../typeorm.config";
import { v4 as uuidv4 } from "uuid";
import { CargoOperationJournal, DispatchDataLogbookEntry } from "../entities";

export async function isLocked<T extends { uuid: string }>(
  item: T,
): Promise<boolean> {
  const locked = await AppDataSource.manager.findOne(DispatchDataLogbookEntry, {
    where: { uuid: item.uuid },
  });
  return !!locked;
}
