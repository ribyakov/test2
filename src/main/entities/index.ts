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
import { Voyage } from "./voyage/Voyage.entity";
import { VoyageStorageTankFunction } from "./voyage/VoyageStorageTankFunction.entity";
import { VoyageOilRemaining } from "./voyage/VoyageOilRemaining.entity";
import { VoyageFuelRemaining } from "./voyage/VoyageFuelRemaining.entity";
import { VoyageWaterRemaining } from "./voyage/VoyageWaterRemaining.entity";
import { VoyageSegment } from "./voyage/VoyageSegment.entity";
import { VoyageCheckPoint } from "./voyage/VoyageCheckPoint.entity";
import { TimeJournal } from "./time-journal/TimeJournal.entity";
import { TimeJournalRecord } from "./time-journal/TimeJournalRecord.entity";
import { TimeZone } from "./masterdata/TimeZone.entity";
import { ConditionJournal } from "./condition-journal/ConditionJournal.entity";
import { ConditionJournalGeoRecord } from "./condition-journal/ConditionJournalGeoRecord.entity";
import { ConditionJournalRecord } from "./condition-journal/ConditionJournalRecord.entity";
import { CargoOperationJournal } from "./cargo-operation-journal/CargoOperationJournal.entity";
import { CargoOperationJournalRecord } from "./cargo-operation-journal/CargoOperationJournalRecord.entity";
import { DispatchDataLogbook } from "./dispatch-data-logbook/DispatchDataLogbook.entity";
import { DispatchDataLogbookRecord } from "./dispatch-data-logbook/DispatchDataLogbookRecord.entity";

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
export * from "./voyage/Voyage.entity";
export * from "./voyage/VoyageStorageTankFunction.entity";
export * from "./voyage/VoyageOilRemaining.entity";
export * from "./voyage/VoyageFuelRemaining.entity";
export * from "./voyage/VoyageWaterRemaining.entity";
export * from "./voyage/VoyageSegment.entity";
export * from "./voyage/VoyageCheckPoint.entity";
export * from "./time-journal/TimeJournal.entity";
export * from "./time-journal/TimeJournalRecord.entity";
export * from "./condition-journal/ConditionJournal.entity";
export * from "./condition-journal/ConditionJournalGeoRecord.entity";
export * from "./condition-journal/ConditionJournalRecord.entity";
export * from "./cargo-operation-journal/CargoOperationJournal.entity";
export * from "./cargo-operation-journal/CargoOperationJournalRecord.entity";
export * from "./dispatch-data-logbook/DispatchDataLogbook.entity";
export * from "./dispatch-data-logbook/DispatchDataLogbookRecord.entity";

export const entities = [
  DispatchDataLogbook,
  DispatchDataLogbookRecord,
  CargoOperationJournal,
  CargoOperationJournalRecord,
  ConditionJournal,
  ConditionJournalGeoRecord,
  ConditionJournalRecord,
  TimeJournal,
  TimeJournalRecord,
  VoyageCheckPoint,
  VoyageSegment,
  VoyageWaterRemaining,
  VoyageOilRemaining,
  VoyageFuelRemaining,
  VoyageStorageTankFunction,
  Voyage,
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
