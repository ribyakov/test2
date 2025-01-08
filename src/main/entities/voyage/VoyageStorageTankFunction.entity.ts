import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tank } from "../masterdata/Tank/Tank.entity";
import { TankFunction } from "../masterdata/Tank/TankFunction";
import { Voyage } from "./Voyage.entity";

@Entity()
export class VoyageStorageTankFunction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tank)
  @JoinColumn({ name: "storage_tank_id" })
  storageTank: Tank;

  @Column()
  function: TankFunction;

  @ManyToOne(() => Voyage, (task) => task.storageTankFunctions, {
    onDelete: "CASCADE",
  })
  voyage: Voyage;
}
