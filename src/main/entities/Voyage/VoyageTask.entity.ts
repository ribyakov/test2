import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ship } from "../Ship.entity";
import { CheckPoint } from "../CheckPoint.entity";
import { VoyageTaskStorageTankFunction } from "./VoyageTaskStorageTankFunction.entity";
import { VoyageTaskOilRemaining } from "./VoyageTaskOilRemaining.entity";
import { VoyageTaskFuelRemaining } from "./VoyageTaskFuelRemaining.entity";
import { VoyageTaskWaterRemaining } from "./VoyageTaskWaterRemaining.entity";
import { VoyageTaskCheckPoint } from "./VoyageTaskCheckPoint.entity";

@Entity()
export class VoyageTask {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Ship)
  @JoinColumn()
  ship: Ship;

  @Column()
  number: string;

  @Column()
  scheduledStartDate: Date;

  @Column()
  scheduledFinishDate: Date;

  @Column()
  charter: boolean;

  @Column()
  charterer: string;

  @OneToOne(() => CheckPoint)
  @JoinColumn()
  startPoint: CheckPoint;

  @OneToOne(() => CheckPoint)
  @JoinColumn()
  finishPoint: CheckPoint;

  @Column()
  comments: string;

  @OneToMany(() => VoyageTaskCheckPoint, (point) => point.voyage, {
    eager: true,
    cascade: true,
  })
  checkPoints: VoyageTaskCheckPoint[];

  @OneToMany(
    () => VoyageTaskStorageTankFunction,
    (tankFunction) => tankFunction.voyage,
    { eager: true, cascade: true },
  )
  storageTankFunctions: VoyageTaskStorageTankFunction[];

  @OneToMany(() => VoyageTaskOilRemaining, (remain) => remain.voyage, {
    eager: true,
    cascade: true,
  })
  oilRemaining: VoyageTaskOilRemaining[];

  @OneToMany(() => VoyageTaskFuelRemaining, (remain) => remain.voyage, {
    eager: true,
    cascade: true,
  })
  fuelRemaining: VoyageTaskFuelRemaining[];

  @OneToMany(() => VoyageTaskWaterRemaining, (remain) => remain.voyage, {
    eager: true,
    cascade: true,
  })
  waterRemaining: VoyageTaskWaterRemaining[];
}
