import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Unit } from "./Unit.entity";

@Entity()
export class CargoType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Unit)
  @JoinTable()
  units: Unit[];
}
