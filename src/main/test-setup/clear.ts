import { AppDataSource } from "../typeorm.config";
import {
  CheckPoint,
  GeographicCoordinate,
  Oil,
  Operation,
  OperationType,
  Ship,
  Tank,
  TimeJournal,
  Unit,
  Voyage,
} from "../entities";
import { DataSource } from "typeorm";

export async function clear(dataSource: DataSource) {
  await AppDataSource.manager.clear(TimeJournal);
  await AppDataSource.manager.clear(Voyage);
  await AppDataSource.manager.clear(CheckPoint);
  await AppDataSource.manager.clear(Unit);
  await AppDataSource.manager.clear(Ship);
  await AppDataSource.manager.clear(Oil);
  await AppDataSource.manager.clear(GeographicCoordinate);
  await AppDataSource.manager.clear(Tank);
  await AppDataSource.manager.clear(Operation);
  await AppDataSource.manager.clear(OperationType);
}
