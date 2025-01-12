import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CargoOperationJournal } from "./CargoOperationJournal.entity";
import { CargoType } from "../masterdata/CargoType.entity";
import { CargoOperationType } from "./CargoOperationType";
import { Lockable } from "../Lockable";

@Entity()
export class CargoOperationJournalRecord extends Lockable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: CargoOperationType;

  @ManyToOne(() => CargoType, { nullable: false, eager: true })
  cargoType: CargoType;

  @Column({ nullable: true })
  description: string;

  @Column()
  value: number;

  @ManyToOne(() => CargoOperationJournal, (journal) => journal.entries, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
  })
  journal: CargoOperationJournal;
}
