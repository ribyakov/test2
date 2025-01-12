import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { VoyageSegment } from "../voyage/VoyageSegment.entity";
import { ConditionJournalGeoRecord } from "./ConditionJournalGeoRecord.entity";

@Entity()
export class ConditionJournal {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => VoyageSegment)
  @JoinColumn()
  segment: VoyageSegment;

  @Column({ nullable: true })
  comments: string;

  @OneToMany(() => ConditionJournalGeoRecord, (entry) => entry.journal, {
    eager: true,
    cascade: true,
  })
  points: ConditionJournalGeoRecord[];
}
