import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Index,
} from "typeorm";
import { Tank } from "../masterdata/Tank/Tank.entity";
import { Voyage } from "./Voyage.entity";
import { WaterType } from "./WaterType";

@Entity()
@Index(["voyage", "storageTank", "water"], { unique: true })
export class VoyageWaterRemaining {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tank)
  @JoinColumn({ name: "storage_tank_id" })
  storageTank: Tank;

  @Column()
  water: WaterType;

  @Column()
  remain: number;

  @ManyToOne(() => Voyage, (task) => task.fuelRemaining, {
    onDelete: "CASCADE",
  })
  voyage: Voyage;
}
