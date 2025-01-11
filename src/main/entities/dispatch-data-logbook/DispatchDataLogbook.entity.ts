import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DispatchDataLogbookEntry } from "./DispatchDataLogbookEntry.entity";

@Entity()
export class DispatchDataLogbook {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => DispatchDataLogbookEntry, (entry) => entry.logbook, {
    eager: true,
    cascade: true,
  })
  entries: DispatchDataLogbookEntry[];
}
