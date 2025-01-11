import {
  EventSubscriber,
  EntitySubscriberInterface,
  UpdateEvent,
  RemoveEvent,
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
    const locked = await isLocked(entity);
    entity.locked = locked;
  }

  /**
   * Called before entity update.
   */
  async beforeUpdate(event: UpdateEvent<TimeJournalEntry>) {
    const entity = event.entity as TimeJournalEntry;
    const locked = await isLocked(entity);
    if (locked) {
      throw new Error("UPDATE LOCKED");
    }
  }

  /**
   * Called before entity removal.
   */
  async beforeRemove(event: RemoveEvent<TimeJournalEntry>) {
    const entity = event.entity as TimeJournalEntry;
    const locked = await isLocked(entity);
    if (locked) {
      throw new Error("DELETE LOCKED");
    }
  }
}
