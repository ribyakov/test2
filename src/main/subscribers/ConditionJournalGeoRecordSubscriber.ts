import {
  EntitySubscriberInterface,
  EventSubscriber,
  RemoveEvent,
  UpdateEvent,
} from "typeorm";
import { ConditionJournalGeoRecord } from "../entities/condition-journal/ConditionJournalGeoRecord.entity";
import { LockableRepository } from "../repositories/LockableRepository";

@EventSubscriber()
export class ConditionJournalGeoRecordSubscriber
  implements EntitySubscriberInterface
{
  listenTo() {
    return ConditionJournalGeoRecord;
  }

  /**
   * Called after entity is loaded.
   */
  async afterLoad(entity: ConditionJournalGeoRecord) {
    entity.locked = await LockableRepository.isLocked(entity);
  }

  async beforeUpdate(event: UpdateEvent<ConditionJournalGeoRecord>) {
    const entity = event.entity;
    if (entity) {
      const locked = await LockableRepository.isLocked(
        entity as ConditionJournalGeoRecord,
      );
      if (locked) {
        throw new Error("UPDATE LOCKED");
      }
    }
  }

  /**
   * Called before entity removal.
   */
  async beforeRemove(event: RemoveEvent<ConditionJournalGeoRecord>) {
    const entity = event.entity;
    if (entity) {
      const locked = await LockableRepository.isLocked(entity);
      if (locked) {
        throw new Error("DELETE LOCKED");
      }
    }
  }
}
