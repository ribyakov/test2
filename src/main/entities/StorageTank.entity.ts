import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StorageTank {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  capacity: number;
}
