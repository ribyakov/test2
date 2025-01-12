import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Index,
} from "typeorm";
import { DispatchDataLogbook } from "./DispatchDataLogbook.entity";

@Entity()
export class DispatchDataLogbookRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column()
  uuid: string;

  @ManyToOne(() => DispatchDataLogbook, (logbook) => logbook.entries, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
  })
  logbook: DispatchDataLogbook;
}
