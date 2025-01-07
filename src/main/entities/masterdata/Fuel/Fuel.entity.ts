import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { FuelType } from "./FuelType.entity";

@Entity()
export class Fuel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => FuelType)
  @JoinColumn()
  type: FuelType;
}
