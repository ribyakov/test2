import { CargoType } from "./masterdata/CargoType.entity";
import { GeographicCoordinate } from "./GeographicCoordinate.entity";
import { Ship } from "./masterdata/Ship.entity";
import { Unit } from "./masterdata/Unit.entity";
import { OilType } from "./masterdata/Oil/OilType.entity";
import { OperationType } from "./masterdata/Operation/OperationType.entity";
import { FuelType } from "./masterdata/Fuel/FuelType.entity";
import { Oil } from "./masterdata/Oil/Oil.entity";
import { Operation } from "./masterdata/Operation/Operation.entity";
import { ShipConditionIndicator } from "./masterdata/ShipConditionIndicator.entity";
import { CheckPoint } from "./masterdata/CheckPoint.entity";
import { Tank } from "./masterdata/Tank/Tank.entity";
import { Fuel } from "./masterdata/Fuel/Fuel.entity";
import { VoyageTask } from "./Voyage/VoyageTask.entity";
import { VoyageTaskStorageTankFunction } from "./Voyage/VoyageTaskStorageTankFunction.entity";
import { VoyageTaskOilRemaining } from "./Voyage/VoyageTaskOilRemaining.entity";
import { VoyageTaskFuelRemaining } from "./Voyage/VoyageTaskFuelRemaining.entity";
import { VoyageTaskWaterRemaining } from "./Voyage/VoyageTaskWaterRemaining.entity";
import { VoyageTaskSegment } from "./Voyage/VoyageTaskSegment.entity";
import { VoyageTaskCheckPoint } from "./Voyage/VoyageTaskCheckPoint.entity";
import { TimeJournal } from "./TimeJournal/TimeJournal.entity";
import { TimeJournalEntry } from "./TimeJournal/TimeJournalEntry.entity";
import { TimeZone } from "./masterdata/TimeZone.entity";

export * from "./masterdata/CargoType.entity";
export * from "./GeographicCoordinate.entity";
export * from "./masterdata/Ship.entity";
export * from "./masterdata/TimeZone.entity";
export * from "./masterdata/Unit.entity";
export * from "./masterdata/Oil/OilType.entity";
export * from "./masterdata/Operation/OperationType.entity";
export * from "./masterdata/Fuel/FuelType.entity";
export * from "./masterdata/Oil/Oil.entity";
export * from "./masterdata/Operation/Operation.entity";
export * from "./masterdata/ShipConditionIndicator.entity";
export * from "./masterdata/CheckPoint.entity";
export * from "./masterdata/Tank/Tank.entity";
export * from "./masterdata/Fuel/Fuel.entity";
export * from "./Voyage/VoyageTask.entity";
export * from "./Voyage/VoyageTaskStorageTankFunction.entity";
export * from "./Voyage/VoyageTaskOilRemaining.entity";
export * from "./Voyage/VoyageTaskFuelRemaining.entity";
export * from "./Voyage/VoyageTaskWaterRemaining.entity";
export * from "./Voyage/VoyageTaskSegment.entity";
export * from "./Voyage/VoyageTaskCheckPoint.entity";
export * from "./TimeJournal/TimeJournal.entity";
export * from "./TimeJournal/TimeJournalEntry.entity";

export const entities = [
  TimeJournal,
  TimeJournalEntry,
  VoyageTaskCheckPoint,
  VoyageTaskSegment,
  VoyageTaskWaterRemaining,
  VoyageTaskOilRemaining,
  VoyageTaskFuelRemaining,
  VoyageTaskStorageTankFunction,
  VoyageTask,
  Fuel,
  Tank,
  CheckPoint,
  ShipConditionIndicator,
  Operation,
  Oil,
  FuelType,
  OperationType,
  CargoType,
  GeographicCoordinate,
  Ship,
  Unit,
  OilType,
  TimeZone,
];
