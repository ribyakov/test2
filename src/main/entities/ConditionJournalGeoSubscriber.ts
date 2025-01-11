import {
  EntitySubscriberInterface,
  EventSubscriber,
  RemoveEvent,
  UpdateEvent,
} from "typeorm";
import { ConditionJournalGeo } from "./condition-journal/ConditionJournalGeo.entity";
import { LockableRepository } from "../repositories/LockableRepository";

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
    entity.locked = await LockableRepository.isLocked(entity);
  }

  async beforeUpdate(event: UpdateEvent<ConditionJournalGeo>) {
    const entity = event.entity;
    if (entity) {
      const locked = await LockableRepository.isLocked(
        entity as ConditionJournalGeo,
      );
      if (locked) {
        throw new Error("UPDATE LOCKED");
      }
    }
  }

  /**
   * Called before entity removal.
   */
  async beforeRemove(event: RemoveEvent<ConditionJournalGeo>) {
    const entity = event.entity;
    if (entity) {
      const locked = await LockableRepository.isLocked(entity);
      if (locked) {
        throw new Error("DELETE LOCKED");
      }
    }
  }
}
