import {
  EntitySubscriberInterface,
  EventSubscriber,
  RemoveEvent,
  UpdateEvent,
} from "typeorm";
import { TimeJournalEntry } from "./time-journal/TimeJournalEntry.entity";
import { isLocked } from "../repositories/LockableRepository";

@EventSubscriber()
export class TimeJournalEntrySubscriber implements EntitySubscriberInterface {
  listenTo() {
    return TimeJournalEntry;
  }

  /**
   * Called after entity is loaded.
   */
  async afterLoad(entity: TimeJournalEntry) {
    entity.locked = await isLocked(entity);
  }

  /**
   * Called before entity update.
   */
  async beforeUpdate(event: UpdateEvent<TimeJournalEntry>) {
    const entity = event.entity as TimeJournalEntry;
    if (entity) {
      const locked = await isLocked(entity as TimeJournalEntry);
      if (locked) {
        throw new Error("UPDATE LOCKED");
      }
    }
  }

  /**
   * Called before entity removal.
   */
  async beforeRemove(event: RemoveEvent<TimeJournalEntry>) {
    const entity = event.entity as TimeJournalEntry;
    if (entity) {
      const locked = await isLocked(entity);
      if (locked) {
        throw new Error("DELETE LOCKED");
      }
    }
  }
}
