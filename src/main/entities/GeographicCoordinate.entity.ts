import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class GeographicCoordinate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  latDegrees: number;

  @Column()
  latMinutes: number;

  @Column()
  latSeconds: number;

  @Column()
  lonDegrees: number;

  @Column()
  lonMinutes: number;

  @Column()
  lonSeconds: number;

  @Column()
  hash: string;
}
// Latitude and Longitude in DMS. Lat (Широта) и Lon (Долгота).
// Coordinates in Degrees, Minutes, and Seconds
