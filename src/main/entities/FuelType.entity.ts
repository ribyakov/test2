import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Unit } from "./Unit.entity";

@Entity()
export class FuelType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
