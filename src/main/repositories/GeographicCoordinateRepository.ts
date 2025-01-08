import { AppDataSource } from "../typeorm.config";
import { GeographicCoordinate } from "../entities";
import { hash } from "node:crypto";
import { parseDMS } from "../utils/coordinate/utils";

const generateHash = (coordinate: string) => hash("md5", coordinate, "hex");

export const GeographicCoordinateRepository = AppDataSource.getRepository(
  GeographicCoordinate,
).extend({
  async getOrCreate(coordinate: string): Promise<GeographicCoordinate> {
    const hash = generateHash(coordinate);

    let point = await AppDataSource.manager.findOneBy(GeographicCoordinate, {
      hash,
    });

    if (point) return point;

    const dms = parseDMS(coordinate);
    const lat = dms[0];
    const lon = dms[1];

    point = new GeographicCoordinate();
    point.name = coordinate;

    point.latDegrees = (lat[0] as number) * (lat[3] === "N" ? 1 : -1);
    point.latMinutes = lat[1] as number;
    point.latSeconds = lat[2] as number;

    point.lonDegrees = (lon[0] as number) * (lon[3] === "W" ? 1 : -1);
    point.lonMinutes = lon[1] as number;
    point.lonSeconds = lon[2] as number;

    point.masked = `${lat[0]}° ${lat[1]}′ ${lat[2]}″ ${lat[3]} ${lon[0]}° ${lon[1]}′ ${lon[2]}″ ${lon[3]}`;

    point.hash = hash;

    return await AppDataSource.manager.save(point);
  },
});
