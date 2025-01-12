import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Index,
} from "typeorm";
import { DispatchDataLogbook } from "./DispatchDataLogbook.entity";
import { Lockable } from "../Lockable";

@Entity()
export class DispatchDataLogbookRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column()
  uuid: string;

  @Column()
  breed: string;

  item: Lockable;

  @ManyToOne(() => DispatchDataLogbook, (logbook) => logbook.entries, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
  })
  logbook: DispatchDataLogbook;
}
