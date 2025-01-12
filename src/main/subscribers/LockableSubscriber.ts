import {
  EntitySubscriberInterface,
  EventSubscriber,
  RemoveEvent,
  UpdateEvent,
} from "typeorm";
import { LockableRepository } from "../repositories/LockableRepository";
import { Lockable } from "../entities/Lockable";

@EventSubscriber()
export class LockableSubscriber implements EntitySubscriberInterface {
  listenTo() {
    return Lockable;
  }

  /**
   * Called after entity is loaded.
   */
  async afterLoad(entity: Lockable) {
    entity.locked = await LockableRepository.isLocked(entity);
  }

  /**
   * Called before entity update.
   */
  async beforeUpdate(event: UpdateEvent<Lockable>) {
    const entity = event.entity as Lockable;
    if (entity) {
      if (await LockableRepository.isLocked(entity)) {
        throw new Error("UPDATE LOCKED");
      }
    }
  }

  /**
   * Called before entity removal.
   */
  async beforeRemove(event: RemoveEvent<Lockable>) {
    const entity = event.entity as Lockable;
    if (entity) {
      if (await LockableRepository.isLocked(entity)) {
        throw new Error("DELETE LOCKED");
      }
    }
  }
}
