import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Operation } from "../masterdata/Operation/Operation.entity";
import { TimeJournal } from "./TimeJournal.entity";

@Entity()
export class TimeJournalEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Operation, { eager: true })
  @JoinColumn()
  operation: Operation;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column({ nullable: true })
  comments: string;

  @Column()
  uuid: string;

  @ManyToOne(() => TimeJournal, (journal) => journal.entries, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
  })
  journal: TimeJournal;
}