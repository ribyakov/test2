import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Unit } from "./Unit.entity";

@Entity()
export class OilType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Unit, {
    eager: true,
  })
  @JoinTable()
  units: Unit[];
}
