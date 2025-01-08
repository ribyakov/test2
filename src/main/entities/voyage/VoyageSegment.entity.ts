import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Voyage } from "./Voyage.entity";
import { CheckPoint } from "../masterdata/CheckPoint.entity";
import { RouteSegmentType } from "./RouteSegmentType";

@Entity()
export class VoyageSegment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  order: number;

  @ManyToOne(() => Voyage, { onDelete: "CASCADE" })
  @JoinColumn()
  voyage: Voyage;

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
