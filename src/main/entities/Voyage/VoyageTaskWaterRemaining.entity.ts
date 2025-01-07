import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Index,
} from "typeorm";
import { Tank } from "../masterdata/Tank/Tank.entity";
import { VoyageTask } from "./VoyageTask.entity";
import { Oil } from "../masterdata/Oil/Oil.entity";
import { Fuel } from "../masterdata/Fuel/Fuel.entity";
import { WaterType } from "./WaterType";

@Entity()
@Index(["voyage", "storageTank", "water"], { unique: true })
export class VoyageTaskWaterRemaining {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tank)
  @JoinColumn({ name: "storage_tank_id" })
  storageTank: Tank;

  @Column()
  water: WaterType;

  @Column()
  remain: number;

  @ManyToOne(() => VoyageTask, (task) => task.fuelRemaining, {
    onDelete: "CASCADE",
  })
  voyage: VoyageTask;
}
