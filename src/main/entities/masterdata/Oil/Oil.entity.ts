import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OilType } from "./OilType.entity";

@Entity()
export class Oil {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => OilType)
  @JoinColumn()
  type: OilType;

  @Column()
  features: string;
}
