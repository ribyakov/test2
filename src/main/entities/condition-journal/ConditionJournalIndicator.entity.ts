import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ShipConditionIndicator } from "../masterdata/ShipConditionIndicator.entity";
import { ConditionJournalGeo } from "./ConditionJournalGeo.entity";

@Entity()
export class ConditionJournalIndicator {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ShipConditionIndicator, { nullable: false, eager: true })
  @JoinColumn()
  indicator: ShipConditionIndicator;

  @Column()
  value: number;

  @ManyToOne(() => ConditionJournalGeo, (point) => point.indicators, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
  })
  point: ConditionJournalGeo;
}
