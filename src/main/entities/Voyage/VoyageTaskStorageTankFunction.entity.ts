import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { StorageTank } from "../StorageTank.entity";
import { StorageTankFunction } from "../StorageTankFunction";
import { VoyageTask } from "./VoyageTask.entity";

@Entity()
export class VoyageTaskStorageTankFunction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => StorageTank)
  @JoinColumn({ name: "storage_tank_id" })
  storageTank: StorageTank;

  @Column()
  function: StorageTankFunction;

  @ManyToOne(() => VoyageTask, (task) => task.storageTankFunctions, {
    onDelete: "CASCADE",
  })
  voyage: VoyageTask;
}
