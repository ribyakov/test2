import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Unit } from "./Unit.entity";

@Entity()
export class ShipConditionIndicator {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Unit)
  @JoinColumn()
  unit: Unit;

  @Column()
  features: string;
}
