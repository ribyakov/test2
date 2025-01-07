import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OperationType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
