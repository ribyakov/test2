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
import { WaterType } from "../WaterType";

@Entity()
@Index(["voyage", "storageTank", "water"], { unique: true })
export class VoyageTaskWaterRemaining {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => StorageTank)
  @JoinColumn({ name: "storage_tank_id" })
  storageTank: StorageTank;

  @Column()
  water: WaterType;

  @Column()
  remain: number;

  @ManyToOne(() => VoyageTask, (task) => task.fuelRemaining, {
    onDelete: "CASCADE",
  })
  voyage: VoyageTask;
}
