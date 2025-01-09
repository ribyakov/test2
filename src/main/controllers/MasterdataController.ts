import { AppDataSource } from "../typeorm.config";
import {
  Operation,
  OperationType,
  Unit,
  ShipConditionIndicator,
  CargoType,
} from "../entities";
import { AllMasterdata } from "../entities/masterdata";

export class MasterdataController {
  async get(): Promise<AllMasterdata> {
    const operations = await AppDataSource.manager.find(Operation);
    const operationTypes = await AppDataSource.manager.find(OperationType);
    const units = await AppDataSource.manager.find(Unit);
    const shipConditionIndicators = await AppDataSource.manager.find(
      ShipConditionIndicator,
    );
    const cargoTypes = await AppDataSource.manager.find(CargoType);

    return {
      operations,
      operationTypes,
      units,
      shipConditionIndicators,
      cargoTypes,
    };
  }
}
