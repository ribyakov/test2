import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CargoOperationJournal } from "./CargoOperationJournal.entity";
import { CargoType } from "../masterdata/CargoType.entity";

@Entity()
export class CargoOperationJournalEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CargoType, { nullable: false, eager: true })
  type: CargoType;

  @Column({ nullable: true })
  description: string;

  @Column()
  value: number;

  @Column()
  uuid: string;

  @ManyToOne(() => CargoOperationJournal, (journal) => journal.entries, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
  })
  journal: CargoOperationJournal;
}
