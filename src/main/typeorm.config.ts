import { DataSource } from "typeorm";
import { entities } from "./entities";
import { join } from "path";
import { TimeJournalRecordSubscriber } from "./subscribers/TimeJournalRecordSubscriber";
import { ConditionJournalGeoRecordSubscriber } from "./subscribers/ConditionJournalGeoRecordSubscriber";

export const AppDataSource = new DataSource({
  type: "sqlite",
  //database: join(process.resourcesPath, "/database/database.db"),
  database: "src/database/database.db",
  logging: ["error"],
  entities,
  migrations:
    process.env.npm_lifecycle_event == "typeorm" ? ["**/migrations/*.ts"] : [],
  subscribers: [
    TimeJournalRecordSubscriber,
    ConditionJournalGeoRecordSubscriber,
  ],
});
