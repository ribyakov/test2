import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Voyage } from "./Voyage.entity";
import { CheckPoint } from "../masterdata/CheckPoint.entity";

@Entity()
export class VoyageCheckPoint {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CheckPoint)
  @JoinColumn()
  checkPoint: CheckPoint;

  @ManyToOne(() => Voyage, (task) => task.checkPoints, {
    onDelete: "CASCADE",
  })
  voyage: Voyage;
}
