import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { VoyageTask } from "./VoyageTask.entity";
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
