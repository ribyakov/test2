import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Unit } from "./masterdata/Unit.entity";

@Entity()
export class Oil {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Unit)
  @JoinColumn()
  unit: Unit;
}
