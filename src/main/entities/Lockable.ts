import { Column, Index } from "typeorm";

export abstract class Lockable {
  @Index({ unique: true })
  @Column()
  uuid: string;

  locked?: boolean;
}
