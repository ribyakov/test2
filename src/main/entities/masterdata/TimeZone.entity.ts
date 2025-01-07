import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TimeZone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
