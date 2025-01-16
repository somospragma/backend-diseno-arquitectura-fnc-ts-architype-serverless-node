import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1737000816177 implements MigrationInterface {
    name = 'CreateUsersTable1737000816177'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "first_name" character varying(100) NOT NULL, "last_name" character varying(100) NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
