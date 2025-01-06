import { DataSource } from "typeorm";
import { entities } from "./entities";
import { join } from "path";

export const AppDataSource = new DataSource({
  type: "sqlite",
  //database: join(process.resourcesPath, "/database/database.db"),
  database: "src/database/database.db",
  logging: true,
  entities,
  migrations:
    process.env.npm_lifecycle_event == "typeorm" ? ["**/migrations/*.ts"] : [],
});
