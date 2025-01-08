import { clear } from "./clear";
import { createVoyage } from "./create-voyage";
import { AppDataSource } from "../typeorm.config";
import { createMasterdata } from "./create-masterdata";

async function setup() {
  const source = await AppDataSource.initialize();
  await clear(source);
  await createMasterdata(source);
  await createVoyage(source);
}

void setup();
