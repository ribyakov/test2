import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1701446413321 implements MigrationInterface {
    name = 'Auto1701446413321'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "student" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "fio" varchar NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "student"`);
    }

}
