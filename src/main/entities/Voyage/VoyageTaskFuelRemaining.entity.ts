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
import { Fuel } from "../Fuel.entity";

@Entity()
@Index(["voyage", "storageTank", "fuel"], { unique: true })
export class VoyageTaskFuelRemaining {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => StorageTank)
  @JoinColumn({ name: "storage_tank_id" })
  storageTank: StorageTank;

  @ManyToOne(() => Oil)
  @JoinColumn()
  fuel: Fuel;

  @Column()
  remain: number;

  @ManyToOne(() => VoyageTask, (task) => task.fuelRemaining, {
    onDelete: "CASCADE",
  })
  voyage: VoyageTask;
}
