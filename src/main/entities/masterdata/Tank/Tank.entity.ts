import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tank {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  capacity: number;
}
