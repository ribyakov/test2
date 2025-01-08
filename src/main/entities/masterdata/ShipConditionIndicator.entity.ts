import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Unit } from "./Unit.entity";

@Entity()
export class ShipConditionIndicator {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Unit)
  @JoinColumn()
  unit: Unit;

  @Column({ nullable: true })
  features: string;
}
