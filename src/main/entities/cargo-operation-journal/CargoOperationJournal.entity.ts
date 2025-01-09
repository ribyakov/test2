import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { VoyageSegment } from "../voyage/VoyageSegment.entity";
import { CargoOperationJournalEntry } from "./CargoOperationJournalEntry.entity";

@Entity()
export class CargoOperationJournal {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => VoyageSegment)
  @JoinColumn()
  segment: VoyageSegment;

  @Column({ nullable: true })
  comments: string;

  @OneToMany(() => CargoOperationJournalEntry, (entry) => entry.journal, {
    eager: true,
    cascade: true,
  })
  entries: CargoOperationJournalEntry[];
}
