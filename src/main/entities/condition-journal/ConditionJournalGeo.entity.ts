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
import { ConditionJournalIndicator } from "./ConditionJournalIndicator.entity";
import { Lockable } from "../Lockable";

@Entity()
export class ConditionJournalGeo implements Lockable {
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

  @OneToMany(() => ConditionJournalIndicator, (entry) => entry.point, {
    eager: true,
    cascade: true,
  })
  indicators: ConditionJournalIndicator[];

  @ManyToOne(() => ConditionJournal, (journal) => journal.points, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
  })
  journal: ConditionJournal;

  locked: boolean;
}
