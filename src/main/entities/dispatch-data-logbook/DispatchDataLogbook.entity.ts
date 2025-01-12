import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DispatchDataLogbookRecord } from "./DispatchDataLogbookRecord.entity";

@Entity()
export class DispatchDataLogbook {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => DispatchDataLogbookRecord, (entry) => entry.logbook, {
    eager: true,
    cascade: true,
  })
  entries: DispatchDataLogbookRecord[];
}
