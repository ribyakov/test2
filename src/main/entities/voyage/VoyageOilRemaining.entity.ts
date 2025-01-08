import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Index,
} from "typeorm";
import { Tank } from "../masterdata/Tank/Tank.entity";
import { Voyage } from "./Voyage.entity";
import { Oil } from "../masterdata/Oil/Oil.entity";

@Entity()
@Index(["voyage", "storageTank", "oil"], { unique: true })
export class VoyageOilRemaining {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tank)
  @JoinColumn({ name: "storage_tank_id" })
  storageTank: Tank;

  @ManyToOne(() => Oil)
  @JoinColumn()
  oil: Oil;

  @Column()
  remain: number;

  @ManyToOne(() => Voyage, (task) => task.oilRemaining, {
    onDelete: "CASCADE",
  })
  voyage: Voyage;
}
