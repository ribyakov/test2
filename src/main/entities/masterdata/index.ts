import {
  Operation,
  OperationType,
  Unit,
  ShipConditionIndicator,
  CargoType,
} from "./../../entities";

export type AllMasterdata = {
  operations: Operation[];
  operationTypes: OperationType[];
  units: Unit[];
  shipConditionIndicators: ShipConditionIndicator[];
  cargoTypes: CargoType[];
};
