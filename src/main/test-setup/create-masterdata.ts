import { Oil, OilType, Operation, OperationType } from "../entities";
import { DataSource } from "typeorm";

export async function createMasterdata(dataSource: DataSource) {
  await createOils(dataSource);
  await createOperations(dataSource);
}

async function createOperations(dataSource: DataSource) {
  // create operations
  let operationType1 = new OperationType();
  operationType1.name = "ПРР";
  await dataSource.manager.save(operationType1);

  let operationType2 = new OperationType();
  operationType2.name = "Взвешивание";
  await dataSource.manager.save(operationType2);

  let operation1 = new Operation();
  operation1.name = "Погрузка";
  operation1.type = operationType1;
  await dataSource.manager.save(operation1);

  let operation2 = new Operation();
  operation2.name = "Разгрузка";
  operation2.type = operationType1;
  await dataSource.manager.save(operation2);

  let operation3 = new Operation();
  operation3.name = "Взвешивание";
  operation3.type = operationType2;
  await dataSource.manager.save(operation3);
}

async function createOils(dataSource: DataSource) {
  // oils
  const oilType = new OilType();
  oilType.name = "Oil Type 1";

  const oilType2 = new OilType();
  oilType2.name = "Oil Type 2";

  let oil1 = new Oil();
  oil1.name = "Oil 1";
  oil1.type = oilType;

  let oil2 = new Oil();
  oil2.name = "Oil 2";
  oil2.type = oilType;

  let oil3 = new Oil();
  oil3.name = "Oil 2";
  oil3.type = oilType2;

  await dataSource.manager.save(oilType);
  await dataSource.manager.save(oilType2);
  await dataSource.manager.save(oil1);
  await dataSource.manager.save(oil2);
  await dataSource.manager.save(oil3);
}
