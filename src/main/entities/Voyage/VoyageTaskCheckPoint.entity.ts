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
import { CheckPoint } from "../CheckPoint.entity";

@Entity()
export class VoyageTaskCheckPoint {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CheckPoint)
  @JoinColumn()
  checkPoint: CheckPoint;

  @ManyToOne(() => VoyageTask, (task) => task.checkPoints, {
    onDelete: "CASCADE",
  })
  voyage: VoyageTask;
}
