import {
  EntitySubscriberInterface,
  EventSubscriber,
  RemoveEvent,
  UpdateEvent,
} from "typeorm";
import { TimeJournalRecord } from "../entities/time-journal/TimeJournalRecord.entity";
import { LockableRepository } from "../repositories/LockableRepository";

@EventSubscriber()
export class TimeJournalRecordSubscriber implements EntitySubscriberInterface {
  listenTo() {
    return TimeJournalRecord;
  }

  /**
   * Called after entity is loaded.
   */
  async afterLoad(entity: TimeJournalRecord) {
    entity.locked = await LockableRepository.isLocked(entity);
  }

  /**
   * Called before entity update.
   */
  async beforeUpdate(event: UpdateEvent<TimeJournalRecord>) {
    const entity = event.entity as TimeJournalRecord;
    if (entity) {
      const locked = await LockableRepository.isLocked(
        entity as TimeJournalRecord,
      );
      if (locked) {
        throw new Error("UPDATE LOCKED");
      }
    }
  }

  /**
   * Called before entity removal.
   */
  async beforeRemove(event: RemoveEvent<TimeJournalRecord>) {
    const entity = event.entity as TimeJournalRecord;
    if (entity) {
      const locked = await LockableRepository.isLocked(entity);
      if (locked) {
        throw new Error("DELETE LOCKED");
      }
    }
  }
}
