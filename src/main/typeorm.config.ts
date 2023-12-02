import { DataSource } from "typeorm";
import { Student } from "./entities/student.entity";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "test.db",
    logging: true,
    entities: [
        Student
    ],
    migrations: process.env.npm_lifecycle_event =="typeorm" ? ["**/migrations/*.ts"] : [],
})