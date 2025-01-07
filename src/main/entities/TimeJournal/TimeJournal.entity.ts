import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { VoyageTaskSegment } from "../Voyage/VoyageTaskSegment.entity";
import { TimeZone } from "../masterdata/TimeZone.entity";
import { TimeJournalEntry } from "./TimeJournalEntry.entity";

@Entity()
export class TimeJournal {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => VoyageTaskSegment)
  @JoinColumn()
  segment: VoyageTaskSegment;

  @ManyToOne(() => TimeZone)
  @JoinColumn()
  timezone: TimeZone;

  @Column({ nullable: true })
  startTime: Date;

  @Column({ nullable: true })
  endTime: Date;

  @Column({ nullable: true })
  comments: string;

  @OneToMany(() => TimeJournalEntry, (entry) => entry.journal, {
    eager: true,
    cascade: true,
  })
  entries: TimeJournalEntry[];
}
