import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ConditionJournal } from "./ConditionJournal.entity";
import { GeographicCoordinate } from "../GeographicCoordinate.entity";
import { ConditionJournalRecord } from "./ConditionJournalRecord.entity";
import { Lockable } from "../Lockable";

@Entity()
export class ConditionJournalGeoRecord implements Lockable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  coordinate: string;

  @Column()
  masked: string;

  @Index({ unique: true })
  @Column()
  uuid: string;

  @ManyToOne(() => GeographicCoordinate, { nullable: false })
  @JoinColumn()
  geolocation: GeographicCoordinate;

  @OneToMany(() => ConditionJournalRecord, (entry) => entry.point, {
    eager: true,
    cascade: true,
  })
  indicators: ConditionJournalRecord[];

  @ManyToOne(() => ConditionJournal, (journal) => journal.points, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
  })
  journal: ConditionJournal;

  locked?: boolean;
}
