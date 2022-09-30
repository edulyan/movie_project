import {MigrationInterface, QueryRunner} from "typeorm";

export class trailer1664298823929 implements MigrationInterface {
    name = 'trailer1664298823929'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ADD "trailer" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "trailer"`);
    }

}
