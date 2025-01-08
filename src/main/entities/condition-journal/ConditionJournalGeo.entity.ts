import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ConditionJournal } from "./ConditionJournal.entity";

@Entity()
export class ConditionJournalGeo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  uuid: string;

  @ManyToOne(() => ConditionJournal, (journal) => journal.points, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
  })
  journal: ConditionJournal;
}
