import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OilType } from "./OilType.entity";

@Entity()
export class Oil {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => OilType)
  @JoinColumn()
  type: OilType;

  @Column({ nullable: true })
  features: string;
}
