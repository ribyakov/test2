import {
  Operation,
  OperationType,
  Unit,
  ShipConditionIndicator,
} from "./../../entities";

export type AllMasterdata = {
  operations: Operation[];
  operationTypes: OperationType[];
  units: Unit[];
  shipConditionIndicators: ShipConditionIndicator[];
};
