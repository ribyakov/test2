import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { VoyageSegment } from "../voyage/VoyageSegment.entity";
import { CargoOperationJournalRecord } from "./CargoOperationJournalRecord.entity";

@Entity()
export class CargoOperationJournal {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => VoyageSegment)
  @JoinColumn()
  segment: VoyageSegment;

  @Column({ nullable: true })
  comments: string;

  @OneToMany(() => CargoOperationJournalRecord, (entry) => entry.journal, {
    eager: true,
    cascade: true,
  })
  entries: CargoOperationJournalRecord[];
}
