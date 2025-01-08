import { Operation } from "./Operation/Operation.entity";
import { OperationType } from "./Operation/OperationType.entity";

export type AllMasterdata = {
  operations: Operation[];
  operationTypes: OperationType[];
};
