import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Index,
} from "typeorm";
import { StorageTank } from "../StorageTank.entity";
import { VoyageTask } from "./VoyageTask.entity";
import { Oil } from "../Oil.entity";

@Entity()
@Index(["voyage", "storageTank", "oil"], { unique: true })
export class VoyageTaskOilRemaining {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => StorageTank)
  @JoinColumn({ name: "storage_tank_id" })
  storageTank: StorageTank;

  @ManyToOne(() => Oil)
  @JoinColumn()
  oil: Oil;

  @Column()
  remain: number;

  @ManyToOne(() => VoyageTask, (task) => task.oilRemaining, {
    onDelete: "CASCADE",
  })
  voyage: VoyageTask;
}
