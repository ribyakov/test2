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
  await dataSource.manager.clear(TimeJournal);
  await dataSource.manager.clear(Voyage);
  await dataSource.manager.clear(CheckPoint);
  await dataSource.manager.clear(Unit);
  await dataSource.manager.clear(Ship);
  await dataSource.manager.clear(Oil);
  await dataSource.manager.clear(GeographicCoordinate);
  await dataSource.manager.clear(Tank);
  await dataSource.manager.clear(Operation);
  await dataSource.manager.clear(OperationType);
}
