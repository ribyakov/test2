import { AppDataSource } from "../typeorm.config";
import {
  CheckPoint,
  GeographicCoordinate,
  OilType,
  Ship,
  Tank,
  Unit,
  Oil,
  Voyage,
  VoyageOilRemaining,
  VoyageStorageTankFunction,
} from "../entities";
import { VoyageTaskRepository } from "../repositories/VoyageTaskRepository";
import { TankFunction } from "../entities/masterdata/Tank/TankFunction";

AppDataSource.initialize().then(async () => {
  await AppDataSource.manager.clear(Voyage);
  await AppDataSource.manager.clear(CheckPoint);
  await AppDataSource.manager.clear(Unit);
  await AppDataSource.manager.clear(Ship);
  await AppDataSource.manager.clear(Oil);
  await AppDataSource.manager.clear(GeographicCoordinate);
  await AppDataSource.manager.clear(Tank);

  let unit1 = new Unit();
  unit1.name = "Unit1";
  unit1 = await AppDataSource.manager.save(unit1);

  let ship = new Ship();
  ship.name = "Unit2";
  ship = await AppDataSource.manager.save(ship);

  let geo = new GeographicCoordinate();
  geo.latDegrees = 90;
  geo.latMinutes = 90;
  geo.latSeconds = 90;
  geo.lonDegrees = 90;
  geo.lonMinutes = 90;
  geo.lonSeconds = 90;
  geo.hash = "test hash";

  geo = await AppDataSource.manager.save(geo);

  const oilType = new OilType();
  oilType.name = "Oil";

  let oil = new Oil();
  oil.name = "Oil";
  oil.type = oilType;

  let checkpoint = new CheckPoint();
  checkpoint.name = "Checkpoint";
  checkpoint.geoPoint = geo;

  checkpoint = await AppDataSource.manager.save(checkpoint);

  let voyage = new Voyage();
  voyage.charter = true;
  voyage.ship = ship;
  voyage.charterer = "test";
  voyage.startPoint = checkpoint;
  voyage.finishPoint = checkpoint;
  voyage.number = "test";
  voyage.scheduledStartDate = new Date();
  voyage.scheduledFinishDate = new Date();
  voyage.comments = "test";

  // voyage.checkPoints = [checkpoint];

  let storageTank = new Tank();
  storageTank.name = "StorageTank";
  storageTank.capacity = 9999;

  storageTank = await AppDataSource.manager.save(storageTank);

  let stf1 = new VoyageStorageTankFunction();
  stf1.storageTank = storageTank;
  stf1.function = TankFunction.OIL;

  let stf2 = new VoyageStorageTankFunction();
  stf2.storageTank = storageTank;
  stf2.function = TankFunction.OIL;

  voyage.storageTankFunctions = [stf1, stf2];

  let oR1 = new VoyageOilRemaining();
  oR1.storageTank = storageTank;
  oR1.remain = 10;

  voyage.oilRemaining = [oR1];

  voyage = await VoyageTaskRepository.save(voyage);

  await AppDataSource.manager.delete(VoyageStorageTankFunction, {
    id: voyage.storageTankFunctions[0].id,
  });

  const t = await VoyageTaskRepository.findOne({ where: { id: voyage.id } });

  console.log(JSON.stringify(t));
});
