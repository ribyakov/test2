import { DataSource } from "typeorm";
import { Student } from "./entities/student.entity";
import {join} from "path";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: join(process.resourcesPath, "/database/database.db"),
    logging: true,
    entities: [
        Student
    ],
    migrations: process.env.npm_lifecycle_event =="typeorm" ? ["**/migrations/*.ts"] : [],
})