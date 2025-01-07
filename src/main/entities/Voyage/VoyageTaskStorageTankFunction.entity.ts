import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tank } from "../masterdata/Tank/Tank.entity";
import { TankFunction } from "../masterdata/Tank/TankFunction";
import { VoyageTask } from "./VoyageTask.entity";

@Entity()
export class VoyageTaskStorageTankFunction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tank)
  @JoinColumn({ name: "storage_tank_id" })
  storageTank: Tank;

  @Column()
  function: TankFunction;

  @ManyToOne(() => VoyageTask, (task) => task.storageTankFunctions, {
    onDelete: "CASCADE",
  })
  voyage: VoyageTask;
}
