import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  VirtualColumn,
} from "typeorm";
import { VoyageSegment } from "../voyage/VoyageSegment.entity";
import { TimeZone } from "../masterdata/TimeZone.entity";
import { TimeJournalRecord } from "./TimeJournalRecord.entity";

@Entity()
export class TimeJournal {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => VoyageSegment)
  @JoinColumn()
  segment: VoyageSegment;

  @ManyToOne(() => TimeZone)
  @JoinColumn()
  timezone: TimeZone;

  @Column({ nullable: true })
  startTime: Date;

  @Column({ nullable: true })
  endTime: Date;

  @Column({ nullable: true })
  comments: string;

  @OneToMany(() => TimeJournalRecord, (entry) => entry.journal, {
    eager: true,
    cascade: true,
  })
  entries: TimeJournalRecord[];
}
