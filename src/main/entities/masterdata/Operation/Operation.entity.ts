import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OperationType } from "./OperationType.entity";

@Entity()
export class Operation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => OperationType, { eager: true })
  @JoinColumn()
  type: OperationType;

  @Column({ nullable: true })
  features: string;
}
