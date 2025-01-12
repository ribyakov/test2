import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Operation } from "../masterdata/Operation/Operation.entity";
import { TimeJournal } from "./TimeJournal.entity";
import { Lockable } from "../Lockable";

@Entity()
export class TimeJournalRecord extends Lockable {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Operation, { eager: true, nullable: false })
  @JoinColumn()
  operation: Operation;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column({ nullable: true })
  comments: string;

  @ManyToOne(() => TimeJournal, (journal) => journal.entries, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
  })
  journal: TimeJournal;

  locked?: boolean;
}
