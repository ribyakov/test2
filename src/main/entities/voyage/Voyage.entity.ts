import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ship } from "../masterdata/Ship.entity";
import { CheckPoint } from "../masterdata/CheckPoint.entity";
import { VoyageCheckPoint } from "./VoyageCheckPoint.entity";
import { VoyageStorageTankFunction } from "./VoyageStorageTankFunction.entity";
import { VoyageOilRemaining } from "./VoyageOilRemaining.entity";
import { VoyageFuelRemaining } from "./VoyageFuelRemaining.entity";
import { VoyageWaterRemaining } from "./VoyageWaterRemaining.entity";

@Entity()
export class Voyage {
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

  @OneToMany(() => VoyageCheckPoint, (point) => point.voyage, {
    eager: true,
    cascade: true,
  })
  checkPoints: VoyageCheckPoint[];

  @OneToMany(
    () => VoyageStorageTankFunction,
    (tankFunction) => tankFunction.voyage,
    { eager: true, cascade: true },
  )
  storageTankFunctions: VoyageStorageTankFunction[];

  @OneToMany(() => VoyageOilRemaining, (remain) => remain.voyage, {
    eager: true,
    cascade: true,
  })
  oilRemaining: VoyageOilRemaining[];

  @OneToMany(() => VoyageFuelRemaining, (remain) => remain.voyage, {
    eager: true,
    cascade: true,
  })
  fuelRemaining: VoyageFuelRemaining[];

  @OneToMany(() => VoyageWaterRemaining, (remain) => remain.voyage, {
    eager: true,
    cascade: true,
  })
  waterRemaining: VoyageWaterRemaining[];
}
