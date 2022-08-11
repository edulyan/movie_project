import {MigrationInterface, QueryRunner} from "typeorm";

export class PurseAndUpdUser1660217254889 implements MigrationInterface {
    name = 'PurseAndUpdUser1660217254889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "purse" ("id" SERIAL NOT NULL, "balance" integer NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_64d0b0e71c1213684fe6e99d877" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "defaultPurseId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_8cc9faec34c5d4c21903b1b02ac" UNIQUE ("defaultPurseId")`);
        await queryRunner.query(`ALTER TABLE "purse" ADD CONSTRAINT "FK_bd39d6b41508d60fe38380839f6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_8cc9faec34c5d4c21903b1b02ac" FOREIGN KEY ("defaultPurseId") REFERENCES "purse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_8cc9faec34c5d4c21903b1b02ac"`);
        await queryRunner.query(`ALTER TABLE "purse" DROP CONSTRAINT "FK_bd39d6b41508d60fe38380839f6"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_8cc9faec34c5d4c21903b1b02ac"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "defaultPurseId"`);
        await queryRunner.query(`DROP TABLE "purse"`);
    }

}
