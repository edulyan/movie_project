import {MigrationInterface, QueryRunner} from "typeorm";

export class movieDescYear1662028330980 implements MigrationInterface {
    name = 'movieDescYear1662028330980'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "year" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "year"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "description"`);
    }

}
