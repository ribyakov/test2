import { CargoType } from "./CargoType.entity";
import { GeographicCoordinate } from "./GeographicCoordinate.entity";
import { Ship } from "./Ship.entity";
import { Unit } from "./Unit.entity";
import { OilType } from "./OilType.entity";
import { OperationType } from "./OperationType.entity";
import { FuelType } from "./FuelType.entity";
import { Oil } from "./Oil.entity";
import { Operation } from "./Operation.entity";
import { ShipConditionIndicator } from "./ShipConditionIndicator.entity";
import { CheckPoint } from "./CheckPoint.entity";
import { StorageTank } from "./StorageTank.entity";
import { Fuel } from "./Fuel.entity";
import { VoyageTask } from "./Voyage/VoyageTask.entity";
import { VoyageTaskStorageTankFunction } from "./Voyage/VoyageTaskStorageTankFunction.entity";
import { VoyageTaskOilRemaining } from "./Voyage/VoyageTaskOilRemaining.entity";
import { VoyageTaskFuelRemaining } from "./Voyage/VoyageTaskFuelRemaining.entity";
import { VoyageTaskWaterRemaining } from "./Voyage/VoyageTaskWaterRemaining.entity";
import { VoyageTaskSegment } from "./Voyage/VoyageTaskSegment.entity";
import { VoyageTaskCheckPoint } from "./Voyage/VoyageTaskCheckPoint.entity";

export * from "./CargoType.entity";
export * from "./GeographicCoordinate.entity";
export * from "./Ship.entity";
export * from "./Unit.entity";
export * from "./OilType.entity";
export * from "./OperationType.entity";
export * from "./FuelType.entity";
export * from "./Oil.entity";
export * from "./Operation.entity";
export * from "./ShipConditionIndicator.entity";
export * from "./CheckPoint.entity";
export * from "./StorageTank.entity";
export * from "./Fuel.entity";
export * from "./Voyage/VoyageTask.entity";
export * from "./Voyage/VoyageTaskStorageTankFunction.entity";
export * from "./Voyage/VoyageTaskOilRemaining.entity";
export * from "./Voyage/VoyageTaskFuelRemaining.entity";
export * from "./Voyage/VoyageTaskWaterRemaining.entity";
export * from "./Voyage/VoyageTaskSegment.entity";
export * from "./Voyage/VoyageTaskCheckPoint.entity";

export const entities = [
  VoyageTaskCheckPoint,
  VoyageTaskSegment,
  VoyageTaskWaterRemaining,
  VoyageTaskOilRemaining,
  VoyageTaskFuelRemaining,
  VoyageTaskStorageTankFunction,
  VoyageTask,
  Fuel,
  StorageTank,
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
];
