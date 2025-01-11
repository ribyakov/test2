import {
  EventSubscriber,
  EntitySubscriberInterface,
  UpdateEvent,
  RemoveEvent,
} from "typeorm";
import { ConditionJournalGeo } from "./condition-journal/ConditionJournalGeo.entity";
import { isLocked } from "../repositories/LockableRepository";
import { TimeJournalEntry } from "./time-journal/TimeJournalEntry.entity";

@EventSubscriber()
export class ConditionJournalGeoSubscriber
  implements EntitySubscriberInterface
{
  listenTo() {
    return ConditionJournalGeo;
  }

  /**
   * Called after entity is loaded.
   */
  async afterLoad(entity: ConditionJournalGeo) {
    const locked = await isLocked(entity);
    entity.locked = locked;
  }

  async beforeUpdate(event: UpdateEvent<ConditionJournalGeo>) {
    const entity = event.entity as ConditionJournalGeo;
    const locked = await isLocked(entity);
    if (locked) {
      throw new Error("UPDATE LOCKED");
    }
  }

  /**
   * Called before entity removal.
   */
  async beforeRemove(event: RemoveEvent<ConditionJournalGeo>) {
    const entity = event.entity as ConditionJournalGeo;
    console.log(event);
    const locked = await isLocked(entity);
    if (locked) {
      throw new Error("DELETE LOCKED");
    }
  }
}
