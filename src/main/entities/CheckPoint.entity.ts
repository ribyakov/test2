import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { GeographicCoordinate } from "./GeographicCoordinate.entity";

@Entity()
export class CheckPoint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => GeographicCoordinate)
  @JoinColumn()
  geoPoint: GeographicCoordinate;
}
