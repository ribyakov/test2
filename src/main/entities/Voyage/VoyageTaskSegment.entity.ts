import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { VoyageTask } from "./VoyageTask.entity";
import { CheckPoint } from "../CheckPoint.entity";
import { RouteSegmentType } from "../RouteSegmentType";

@Entity()
export class VoyageTaskSegment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  order: number;

  @ManyToOne(() => VoyageTask, { onDelete: "CASCADE" })
  @JoinColumn()
  voyage: VoyageTask;

  @ManyToOne(() => CheckPoint)
  @JoinColumn()
  startPoint: CheckPoint;

  @ManyToOne(() => CheckPoint)
  @JoinColumn()
  currentPoint: CheckPoint;

  @ManyToOne(() => CheckPoint)
  @JoinColumn()
  finishPoint: CheckPoint;

  @Column()
  segmentType: RouteSegmentType;
}
