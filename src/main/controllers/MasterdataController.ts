import { AppDataSource } from "../typeorm.config";
import { Operation, OperationType } from "../entities";
import { AllMasterdata } from "../entities/masterdata";

export class MasterdataController {
  async get(): Promise<AllMasterdata> {
    const operations = await AppDataSource.manager.find(Operation);
    const operationTypes = await AppDataSource.manager.find(OperationType);

    return {
      operations,
      operationTypes,
    };
  }
}
