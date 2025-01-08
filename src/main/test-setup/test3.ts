import { AppDataSource } from "../typeorm.config";
import {
  CheckPoint,
  GeographicCoordinate,
  Oil,
  OilType,
  Operation,
  OperationType,
  Ship,
  Tank,
  TimeJournal,
  TimeJournalEntry,
  Unit,
  Voyage,
  VoyageCheckPoint,
  VoyageSegment,
} from "../entities";
import { VoyageTaskRepository } from "../repositories/VoyageTaskRepository";
import { RouteSegmentType } from "../entities/voyage/RouteSegmentType";
import { TimeJournalRepository } from "../repositories/TimeJournalRepository";

AppDataSource.initialize().then(async () => {
  await AppDataSource.manager.clear(TimeJournal);
  await AppDataSource.manager.clear(Voyage);
  await AppDataSource.manager.clear(CheckPoint);
  await AppDataSource.manager.clear(Unit);
  await AppDataSource.manager.clear(Ship);
  await AppDataSource.manager.clear(Oil);
  await AppDataSource.manager.clear(GeographicCoordinate);
  await AppDataSource.manager.clear(Tank);
  await AppDataSource.manager.clear(Operation);
  await AppDataSource.manager.clear(OperationType);

  let unit1 = new Unit();
  unit1.name = "Unit1";
  unit1 = await AppDataSource.manager.save(unit1);

  let ship = new Ship();
  ship.name = "ПОЗЫВНОЙ СУДНА";
  ship = await AppDataSource.manager.save(ship);

  let geo = new GeographicCoordinate(); //  47°  3'  1.35";  142°  2' 40.85"
  geo.latDegrees = 47;
  geo.latMinutes = 3;
  geo.latSeconds = 1.35;
  geo.lonDegrees = 142;
  geo.lonMinutes = 2;
  geo.lonSeconds = 40.85;
  geo.hash = "4BC807A40B5CAB5F81DF8EC17A6BDFFD";

  geo = await AppDataSource.manager.save(geo);

  const oilType = new OilType();
  oilType.name = "Oil";

  let oil = new Oil();
  oil.name = "Oil";
  oil.type = oilType;

  let point1 = new CheckPoint();
  point1.name = "Холмский морской торговый порт";
  point1.geoPoint = geo;

  let point2 = new CheckPoint();
  point2.name = "Пункт-порт 2";
  point2.geoPoint = geo;

  point1 = await AppDataSource.manager.save(point1);
  point2 = await AppDataSource.manager.save(point2);

  let voyage = new Voyage();
  voyage.charter = true;
  voyage.ship = ship;
  voyage.charterer = "test";
  voyage.startPoint = point1;
  voyage.finishPoint = point1;
  voyage.number = "test";
  voyage.scheduledStartDate = new Date();
  voyage.scheduledFinishDate = new Date();
  voyage.comments = "Рейсовое задания - демонстрационный пример";

  const voyagePoint1 = new VoyageCheckPoint();
  voyagePoint1.checkPoint = point1;

  const voyagePoint2 = new VoyageCheckPoint();
  voyagePoint2.checkPoint = point2;

  const voyagePoint3 = new VoyageCheckPoint();
  voyagePoint3.checkPoint = point1;

  voyage.checkPoints = [voyagePoint1, voyagePoint2, voyagePoint3];

  voyage = await VoyageTaskRepository.save(voyage);

  // create operations
  let operationType1 = new OperationType();
  operationType1.name = "ПРР";
  await AppDataSource.manager.save(operationType1);

  let operation1 = new Operation();
  operation1.name = "Погрузка";
  operation1.type = operationType1;
  await AppDataSource.manager.save(operation1);

  let operation2 = new Operation();
  operation2.name = "Разгрузка";
  operation2.type = operationType1;
  await AppDataSource.manager.save(operation2);

  // create voyage segments
  let vs1 = new VoyageSegment();
  vs1.voyage = voyage;
  vs1.name = 'Нахождение в порту "Холмский морской торговый порт"';
  vs1.startPoint = point1;
  vs1.finishPoint = point2;
  vs1.currentPoint = point1;
  vs1.order = 1;
  vs1.segmentType = RouteSegmentType.PORT;

  await AppDataSource.manager.save(vs1);

  let vs2 = new VoyageSegment();
  vs2.voyage = voyage;
  vs2.name = 'Отход от порта "Холмский морской торговый порт"';
  vs2.startPoint = point1;
  vs2.finishPoint = point2;
  vs2.order = 2;
  vs2.segmentType = RouteSegmentType.DEPARTURE;

  await AppDataSource.manager.save(vs2);

  let vs3 = new VoyageSegment();
  vs3.voyage = voyage;
  vs3.name = 'Морской переход "Холмский морской торговый порт"->"Пункт-порт 2"';
  vs3.startPoint = point1;
  vs3.finishPoint = point2;
  vs3.order = 3;
  vs3.segmentType = RouteSegmentType.SEA;

  await AppDataSource.manager.save(vs3);

  let vs4 = new VoyageSegment();
  vs4.voyage = voyage;
  vs4.name = 'Подход к порту "Пункт-порт 2"';
  vs4.startPoint = point1;
  vs4.finishPoint = point2;
  vs4.order = 4;
  vs4.segmentType = RouteSegmentType.ARRIVAL;

  await AppDataSource.manager.save(vs4);

  let vs5 = new VoyageSegment();
  vs5.voyage = voyage;
  vs5.name = 'Нахождение в порту "Пункт-порт 2"';
  vs5.startPoint = point2;
  vs5.finishPoint = point1;
  vs5.currentPoint = point2;
  vs5.order = 5;
  vs5.segmentType = RouteSegmentType.PORT;

  await AppDataSource.manager.save(vs5);

  let vs6 = new VoyageSegment();
  vs6.voyage = voyage;
  vs6.name = 'Отход от порта "Пункт-порт 2"';
  vs6.startPoint = point2;
  vs6.finishPoint = point1;
  vs6.order = 6;
  vs6.segmentType = RouteSegmentType.DEPARTURE;

  await AppDataSource.manager.save(vs6);

  let vs7 = new VoyageSegment();
  vs7.voyage = voyage;
  vs7.name = 'Морской переход "Пункт-порт 2"->"Холмский морской торговый порт"';
  vs7.startPoint = point2;
  vs7.finishPoint = point1;
  vs7.order = 7;
  vs7.segmentType = RouteSegmentType.SEA;

  await AppDataSource.manager.save(vs7);

  let vs8 = new VoyageSegment();
  vs8.voyage = voyage;
  vs8.name = 'Подход к порту "Холмский морской торговый порт"';
  vs8.startPoint = point2;
  vs8.finishPoint = point1;
  vs8.order = 8;
  vs8.segmentType = RouteSegmentType.ARRIVAL;

  await AppDataSource.manager.save(vs8);

  let vs9 = new VoyageSegment();
  vs9.voyage = voyage;
  vs9.name = 'Нахождение в порту "Холмский морской торговый порт"';
  vs9.startPoint = point2;
  vs9.currentPoint = point1;
  vs9.order = 9;
  vs9.segmentType = RouteSegmentType.PORT;

  await AppDataSource.manager.save(vs9);

  let timeJournal = new TimeJournal();
  timeJournal.segment = vs1;

  const tje1 = new TimeJournalEntry();
  tje1.startTime = new Date();
  tje1.endTime = new Date();
  tje1.operation = operation1;

  timeJournal.entries = [tje1];

  await TimeJournalRepository.save(timeJournal);
});
