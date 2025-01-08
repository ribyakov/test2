import { AppDataSource } from "../typeorm.config";
import { OilType, Unit } from "../entities";

AppDataSource.initialize().then(async () => {
  await AppDataSource.manager.clear(Unit);
  await AppDataSource.manager.clear(OilType);

  let unit1 = new Unit();
  unit1.name = "Unit1";
  unit1 = await AppDataSource.manager.save(unit1);

  let unit2 = new Unit();
  unit2.name = "Unit2";
  unit2 = await AppDataSource.manager.save(unit2);

  const oilType = new OilType();
  oilType.name = "OilType1";
  oilType.units = [unit1, unit2];

  let ot = await AppDataSource.manager.save(oilType);

  console.log(JSON.stringify(ot));

  ot.units = [{ id: unit1.id } as Unit, { id: unit2.id } as Unit];

  ot = await AppDataSource.manager.save(oilType);

  console.log(JSON.stringify(ot));
});
