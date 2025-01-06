import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OperationType } from "./OperationType.entity";

@Entity()
export class Operation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => OperationType)
  @JoinColumn()
  type: OperationType;

  @Column()
  features: string;
}
