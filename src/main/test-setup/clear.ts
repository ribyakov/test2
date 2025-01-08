import {
  CheckPoint,
  ConditionJournal,
  GeographicCoordinate,
  Oil,
  Operation,
  OperationType,
  Ship,
  ShipConditionIndicator,
  Tank,
  TimeJournal,
  Unit,
  Voyage,
} from "../entities";
import { DataSource } from "typeorm";

export async function clear(dataSource: DataSource) {
  await dataSource.manager.clear(ConditionJournal);
  await dataSource.manager.clear(TimeJournal);
  await dataSource.manager.clear(Voyage);
  await dataSource.manager.clear(CheckPoint);
  await dataSource.manager.clear(Ship);
  await dataSource.manager.clear(ShipConditionIndicator);
  await dataSource.manager.clear(Oil);
  await dataSource.manager.clear(GeographicCoordinate);
  await dataSource.manager.clear(Tank);
  await dataSource.manager.clear(Operation);
  await dataSource.manager.clear(OperationType);
  await dataSource.manager.clear(Unit);
}
