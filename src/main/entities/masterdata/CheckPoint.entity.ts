import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { GeographicCoordinate } from "../GeographicCoordinate.entity";

@Entity()
export class CheckPoint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => GeographicCoordinate)
  @JoinColumn()
  geoPoint: GeographicCoordinate;
}
