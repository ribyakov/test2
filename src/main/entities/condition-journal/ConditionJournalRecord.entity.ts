import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ShipConditionIndicator } from "../masterdata/ShipConditionIndicator.entity";
import { ConditionJournalGeoRecord } from "./ConditionJournalGeoRecord.entity";

@Entity()
export class ConditionJournalRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ShipConditionIndicator, { nullable: false, eager: true })
  @JoinColumn()
  indicator: ShipConditionIndicator;

  @Column()
  value: number;

  @ManyToOne(() => ConditionJournalGeoRecord, (point) => point.indicators, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
  })
  point: ConditionJournalGeoRecord;
}
