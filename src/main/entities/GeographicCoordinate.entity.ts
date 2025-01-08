import { Column, Entity, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity()
export class GeographicCoordinate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  masked: string;

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

  @Index({ unique: true })
  @Column()
  hash: string;
}
// Latitude and Longitude in DMS. Lat (Широта) и Lon (Долгота).
// Coordinates in Degrees, Minutes, and Seconds
