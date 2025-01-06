import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { VoyageTask } from "./VoyageTask.entity";
import { CheckPoint } from "../CheckPoint.entity";
import { RouteSegment } from "../RouteSegment";

@Entity()
export class VoyageTaskSegment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  order: number;

  @OneToOne(() => VoyageTask)
  @JoinColumn()
  voyage: VoyageTask;

  @OneToOne(() => CheckPoint)
  @JoinColumn()
  startPoint: CheckPoint;

  @OneToOne(() => CheckPoint)
  @JoinColumn()
  currentPoint: CheckPoint;

  @OneToOne(() => CheckPoint)
  @JoinColumn()
  finishPoint: CheckPoint;

  @Column()
  segment: RouteSegment;
}
